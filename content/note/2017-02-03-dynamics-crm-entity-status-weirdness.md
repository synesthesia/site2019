---
title: Dynamics CRM entity status weirdness
authors: ["synesthesia"]
type: note
date: 2017-02-03T11:46:33+00:00
slug: dynamics-crm-entity-status-weirdness 
aliases: ["/worknotes/dynamics-crm-entity-status-weirdness"]
tags: ["Dynamics365"]

---
## Background

Since upgrade of CRM Online to 8.2, we have noticed some strange issues around workflow triggers that are supposed to be fired by the change of a record status.

We have a workflow associated with the Invoice entity that is set to trigger on change of record status:<figure id="attachment_96811" aria-describedby="caption-attachment-96811" style="width: 269px" class="wp-caption alignnone">

<img class="size-full wp-image-96811" src="https://www.synesthesia.co.uk/wp/wp-content/uploads/2017/02/wf-status-trigger.png" alt="" width="269" height="134" /><figcaption id="caption-attachment-96811" class="wp-caption-text">Workflow trigger settings</figcaption></figure> 

The workflow is responsible for setting up various bits of data when we issue an invoice, then flagging to an external integration that the invoice is ready to send to Finance.

We trigger the workflow in a couple of places &#8211; in C# code that runs during various automated operations, and in Javascript in response to a manual button click.

## Updating the invoice status &#8211; the old way

Traditionally we would fire this using a SetStateRequest (C#, Javascript):



## Updating the invoice status &#8211; the new way

However as that call has been [deprecated][1], we took the opportunity of some other refactorings to migrate to using Update requests.

### Using C# and IOrganizationService.Update

First attempt in C# was:



However we found that the workflow was being triggered twice!

The only way we found to stop this happening was to adjust the code so we only update the statuscode attribute:



### Using Javascript and REST API PUT

Our first attempt in Javascript mirrored what we had found in C#:
  


However we found that although this appears to change the entity fields correctly:<figure id="attachment_96812" aria-describedby="caption-attachment-96812" style="width: 300px" class="wp-caption alignnone">

<img class="size-medium wp-image-96812" src="https://www.synesthesia.co.uk/wp/wp-content/uploads/2017/02/invoice-status-after-REST-PUT-status-only-300x35.png" alt="" width="300" height="35" srcset="https://www.synesthesia.co.uk/wp-content/uploads/2017/02/invoice-status-after-REST-PUT-status-only-300x35.png 300w, https://www.synesthesia.co.uk/wp-content/uploads/2017/02/invoice-status-after-REST-PUT-status-only.png 542w" sizes="(max-width: 300px) 100vw, 300px" /><figcaption id="caption-attachment-96812" class="wp-caption-text">Invoice status set correctly after REST PUT call just with status code</figcaption></figure> 

&#8230; the workflow is just not being triggered

So then we tried in javascript settiing the statecode as well, and the workflow triggers twice again! We restored the javascript to only update status (as per the gist above), and moved on to look at other settings for the process trigger.

### Changing the process trigger

We changed the process trigger for the workflow to be &#8220;When record fields change&#8221; (i.e. update), and filtered only on statuscode<figure id="attachment_96813" aria-describedby="caption-attachment-96813" style="width: 300px" class="wp-caption alignnone">

<img class="size-medium wp-image-96813" src="https://www.synesthesia.co.uk/wp/wp-content/uploads/2017/02/wf-update-trigger-300x104.png" alt="" width="300" height="104" srcset="https://www.synesthesia.co.uk/wp-content/uploads/2017/02/wf-update-trigger-300x104.png 300w, https://www.synesthesia.co.uk/wp-content/uploads/2017/02/wf-update-trigger.png 369w" sizes="(max-width: 300px) 100vw, 300px" /><figcaption id="caption-attachment-96813" class="wp-caption-text">Worflow update trigger</figcaption></figure> <figure id="attachment_96814" aria-describedby="caption-attachment-96814" style="width: 300px" class="wp-caption alignnone"><img class="size-medium wp-image-96814" src="https://www.synesthesia.co.uk/wp/wp-content/uploads/2017/02/wf_update_trigger_filter-300x241.png" alt="" width="300" height="241" srcset="https://www.synesthesia.co.uk/wp-content/uploads/2017/02/wf_update_trigger_filter-300x241.png 300w, https://www.synesthesia.co.uk/wp-content/uploads/2017/02/wf_update_trigger_filter.png 537w" sizes="(max-width: 300px) 100vw, 300px" /><figcaption id="caption-attachment-96814" class="wp-caption-text">Worflow update trigger filter attribute</figcaption></figure> 

I half expected that this might fire initially but that later steps where the workflow calls itself recursively by changing status of the invoice would fail.

First experiment was triggered by using the Javascript button(sending a PUT with only the statuscode). This ran correctly all the way through.

<del>Second experiment was triggered from C# code based on other system actions. That too ran correctly all the way through, with the process only triggered once.</del>

UPDATE &#8211; later in testing we started seeing random double triggers on this when the invoice status was changed using Update. Reverting to legacy SetStateRequest (but with the process still triggered on Update) corrected this behaviour. As none of this fits with documentation we assume it is an obscure bug in the platform

## Conclusion

Microsoft have made changes to the way entity status interacts with processes.

The Microsoft recommendation is that all code which changes record status should do using updates, not the deprecated SetStateRequest

UPDATE: however from our later tests we consider SetStateREquest to be the safer option on the IOrganizationService

For workflows which are set to trigger on &#8220;Record status changes&#8221; there appears to be inconsistent behaviour depending on the source of the update (SOAP via the IOrganizationService, or directly to the newer REST API )

From our tests, any workflows which are triggered from &#8220;Record status changes&#8221; should be modified to fire on &#8220;Record fields change&#8221;, filtered down to just the status field.

Worflow steps created in the Workflow Designer which call &#8220;Set record status&#8221; still work, and will still fire triggers that have been modifed as above

 [1]: https://msdn.microsoft.com/en-gb/library/microsoft.crm.sdk.messages.setstaterequest.aspx
