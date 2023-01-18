---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Dataverse Resilience"
summary: "Announcing a forthcoming collection of notes exploring how to make applications that rely on Dataverse more resilient"
authors: ["synesthesia"]
tags: ["dataverse", "resilience", "100DaysToOffload"]
categories: []
date: 2023-01-18T06:15:56Z
draft: false

# Optional external URL for project (replaces project detail page).
external_link: ""

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: "Center"
  preview_only: false

# Custom links (optional).
#   Uncomment and edit lines below to show custom links.
# links:
# - name: Follow
#   url: https://twitter.com
#   icon_pack: fab
#   icon: twitter

url_code: ""
url_pdf: ""
url_slides: ""
url_video: ""

# Slides (optional).
#   Associate this project with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides = "example-slides"` references `content/slides/example-slides.md`.
#   Otherwise, set `slides = ""`.
slides: ""
---

{{% callout note %}}
I am publishing this header post before I complete any of the detailed content notes, firstly because it serves to pull together some useful information about working with the Dataverse API, and secondly by signalling my intention to write more I will give myself a motivation to do so!
{{% /callout %}}

## Introduction

Where I work we make extensive use of both Azure Functions and console apps, to manipulate data in Dataverse, or to integrate to/from Dataverse and other systems.

We have found that it's very easy to run into Dataverse API Service Protection limits when working with quite small datasets, so we've had to learn how to adopt various techniques to keep our applications working.

This "project" will pull together an occasional series of posts documenting the different approaches we have tried, based on our own experience and a trawl through Microsoft example code.

## Dataverse API Service Protection limits

These are enforced by Microsoft to ensure no one consumer impacts on the overall performance of the Dataverse platform for all consumers. At the time of writing the [Dataverse Service protection API limits](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/api-limits?tabs=sdk) are evaluated per-user and per web-server (see below), and are set at:

* A cumulative 600 requests in a 300 second sliding window
* A combined execution time of 1200 seconds aggregated across requests in a 300 second sliding window
* A maximum of 52 concurrent requests per-user


These limits are enforced per web server, however the number of web servers servicing a given Dataverse environment is opaque, so it is prudent to plan for only one server when considering limits.

## Impact of exceeding limits

Depending on which API you are using, the platform will signal that limits are exceeded in one of two different ways:

* with the [WebApi](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/get-started-dynamics-365-web-api-csharp), a [429 Too Many Requests](https://developer.mozilla.org/docs/Web/HTTP/Status/429) error, and on the response a [Retry-After](https://developer.mozilla.org/docs/Web/HTTP/Headers/Retry-After) header with a value in seconds indicating how long the caller should pause for.
* With the Dataverse SDK for .NET, an [OrganizationServiceFault](https://learn.microsoft.com/en-us/dotnet/api/microsoft.xrm.sdk.organizationservicefault) error with one of three specific error codes:
  
    |Error code (from SDK)|Hex code (from Web API)|Message|
    |----|----|----|
    |`-2147015902`|`0x80072322`|`Number of requests exceeded the limit of 6000 over time window of 300 seconds`|
    |`-2147015903`|`0x80072321`|`Combined execution time of incoming requests exceeded limit of 1,200,000 milliseconds over time window of 300 seconds. Decrease number of concurrent requests or reduce the duration of requests and try again later.`|
    |`-2147015898`|`0x80072326`|`Number of concurrent requests exceeded the limit of 52`|

    In the [OrganizationServiceFault](https://learn.microsoft.com/en-us/dotnet/api/microsoft.xrm.sdk.organizationservicefault).[ErrorDetails](https://learn.microsoft.com/en-us/dotnet/api/microsoft.xrm.sdk.baseservicefault.errordetails#microsoft-xrm-sdk-baseservicefault-errordetails) collection there will be an entry with key `Retry-After` containing a [TimeSpan](https://learn.microsoft.com/en-us/dotnet/api/system.timespan) value representing the necessary delay.

## Areas I aim to cover

Our experiences include: simple console apps, typically used for data manipulation or bulk import; simple low-volume Azure Functions; and a couple of more complex Azure Functions apps that can scale out significantly and create a significant parallel load on the Dataverse API.

In this series I aim to touch on all these scenarios and document the techniques we have found to work.

As I publish posts in this series they will be linked at the bottom of this post.

## See also

* [Dataverse Service protection API limits (MSFT Docs)](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/api-limits?tabs=sdk)

## Meta

Image credit: [Neil Cummings](https://www.flickr.com/photos/chanceprojects/) ([source](https://www.flickr.com/photos/23874985@N07/12883006984)) - licenced [CC-BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)


[#100DaysToOffload](https://100daystooffload.com/) 6/100
