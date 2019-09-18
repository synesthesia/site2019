---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Fixing Data With Flow"
subtitle: ""
summary: ""
authors: ["synesthesia"]
categories: ["Technology"]
tags: ["Microsoft Flow", "tools"]
lastmod: 2019-09-18T10:34:24+01:00
featured: false
draft: false
type: note

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: "Smart"
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---
If you work in any way with systems or data, you will know the situation, where some records have ended up with missing or wrong values. This is particularly irritating when to fix the problem means pulling data from more than one place in order to set things right.

As we have fully adopted Office 365 at work, Microsoft Flow is rapidly becoming my favourite tool for basic low-volume data manipulation. A case in point came up today...

{{% toc %}}

## Scenario
We run a federated identity system for our customer-facing sites to provide a single login (SSO) across all services. When a new user registers we fire some external logic that looks them up in our CRM (Dynamics 365), and then sends some key data back to the identity server where it is added as claims. These claims are then available to downstream systems that use the SSO, so (for example) can be used to retrieve further data from the CRM - a good example would be a website retrieving a list of content groups for a user in order to control what they can see.

Today we found that for approximately 100 users this process had failed because an authentication key had expired. We fixed the key in moments, but then needed to fix the data. With a little SQL manipulation a colleague was easily able to extract a CSV list of user Ids that were missing the claims, but to fix the records we would need to mimic the action of the integration code:

* iterate over the list of user Ids, and for each: 
  * lookup the user record in CRM
  * query two records to get the relevant data keys
  * write back the updated user record to a custom REST APi on the SSO service (secured by bearer token)

## Creating a tool

If the problem had been a couple of records the fastest solution would have been to look up the information manually and inject it in to the SSO database by hand. However with just over a 100 items to fix this wasn't practical.

Writing a console app in code to do the task would have been straightforward, but would take a developer off more productive work, so I decided to pick up the issue and try to fix it with Flow.

## Key points of the resulting Flow

I'm not going to replicate the entire Flow here - the screenshots rapidly become unwieldy, and it also contains proprietary information. Similarly, I'm not going into the basics of how to use Flow, nor the details of how you protect APIs with Azure AD and register client applications: those topics are beyond the scope of a short note (and Microsoft provide a ton of documentation). 

Here though is how I solved the key problems:

### Reading source data

For this I made use of a Manual Trigger (aka "Manually trigger a flow")  and the [Excel Online (Business) connector](https://docs.microsoft.com/en-us/connectors/excelonlinebusiness/) connector [List Rows present in a Table](https://docs.microsoft.com/en-us/connectors/excelonlinebusiness/#list-rows-present-in-a-table) action.

I converted the source CSV into an Excel sheet with a data table, and saved it in OneDrive.

A limitation that later emerged was that this connector will only read the first 256 rows - if your data set is larger than this you will need to split into multiple sheets and edit the source between runs.

### Getting an authentication token

The SSO API is secured with Azure AD, so our flow needs an access token in order to write back the updated record. Getting a token is straightforward if you know what data values you need:

* `SUBSCRIPTIONID` - this is the Office 365 / Azure tenant Id within which your Azure AD lives.
* `ClientId` - this is the Id of an app registered in Azure AD that has the permission to access the protected API. In our case as we already had a registration for the service that normally carries out this operation we re-used that registration.
* `ClientSecret` - a secret key for the application represented by `ClientId`
* `Token Endpoint` - https://login.microsoftonline.com/SUBSCRIPTIONID/oauth2/token
* `Audience` - this is found in the app registration for the protected API, also known as "Application ID URL" 

As part of the flow you need to Url Encode the secret - this is best done in a compose block using the built-in [`uriComponent()`](https://docs.microsoft.com/en-us/azure/logic-apps/workflow-definition-language-functions-reference#uriComponent) function.

To get a token you need to post an HTTP request to the `Token Endpoint` with a correctly formed body:

```
grant_type=client_credentials&
client_id=CLIENTID&
resource=AUDIENCE&
client_secret=CLIENTSECRET
```
The HTTP action then looks like:

{{< figure src="gettoken.png" title="Example HTTP action to retrieve access token from Azure AD" numbered="true" lightbox="true" width="400">}}

For convenience I then composed the token result with the "Bearer" label to make up content I would need to include in a requst header later:

{{< figure src="token.png" title="Compose token value into required header value" numbered="true" lightbox="true" width="400">}}

### Iterating over the data

After the [List Rows present in a Table](https://docs.microsoft.com/en-us/connectors/excelonlinebusiness/#list-rows-present-in-a-table) action place an "Apply to Each" action from the `New Step` dialog:

{{< figure src="foreach.png" title="Add 'Apply to Each' action" numbered="true" lightbox="true" width="400">}}

All the subsequent actions are placed within the Apply To Each block.

### Reading data from Dynamics

In our example we had to query two records to collect the data we needed.

#### Querying a list of records

The first one holds the remote SSO Id (our source data) in a text field, so although there is a 1:1 match between the two systems we needed to use a query to find the relevant record. This is done using a ["List records"](https://docs.microsoft.com/en-us/connectors/dynamicscrmonline/#list-records) action with a suitable filter expression.

{{< figure src="listrecords.png" title="Query list of records in Dynamics" numbered="true" lightbox="true" width="400">}}


Because this action returns an array of records, in subsequent processing remember to select the first record, e.g. 

```
outputs('list_step')?['body']?['value'][0]
```

#### Retrieving a specific record

The record we obtained from the first step contains a lookup field to the second record we need. The  Dynamics REST API returns the foreign key Id of lookups with a special attribute name:

| Lookup field    | Attribute in response holding Id value |
| ----------------| ---------------------------------------|
| `mylookupfield` | `_mylookupfield_value`                 |

We can then use that value as the record Id in a standard [Get Record](https://docs.microsoft.com/en-us/connectors/dynamicscrmonline/#get-record) action:

{{< figure src="getrecord.png" title="Retrieve a single record from Dynamics" numbered="true" lightbox="true" width="400">}}

### Posting back to the SSO system

#### Composing response

The SSO API requires data in a format very loosely based on [SCIM](http://www.simplecloud.info/) so I used a [Compose](https://docs.microsoft.com/en-us/flow/data-operations#use-the-compose-action) action to build the request:

{{< figure src="compose-sso-request.png" title="compose body of update request" numbered="true" lightbox="true" width="400">}}

#### Sending updated data

The final step was to assemble the API endpoint, the request body and the authorization token into an HTTP request:

{{< figure src="sso-update.png" title="Send update request" numbered="true" lightbox="true" width="400">}}


## Conclusion

The flow took me approximately half an hour to build, then was left running while I got on with other work - a review of the SSO application log showed that the records had been updated successfully.

If you have questions, or your own examples to share, please do so in the comments, or you can reach me via the routes on the [Contact page]({{< ref "/#contact" >}})
