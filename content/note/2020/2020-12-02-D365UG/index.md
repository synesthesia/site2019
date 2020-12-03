---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "D365 User Group December 2020"
subtitle: "Notes from this virtual meeting"
summary: "D365 user group was held online, here are brief notes on my experience of the day"
authors: ["synesthesia"]
categories: ["D365 User Group"]
tags: ["powerplatform", "dyn365ug2020-12"]
lastmod: 2020-12-02T09:28:07Z
featured: false
draft: false
type: note

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---

## Introduction

[D365 User Group December Meeting](https://www.d365ug.com/events/event-description?CalendarEventKey=68eb6603-6dd8-4dfb-81df-80561dba6d63&CommunityKey=b62b1779-6dbe-4d1a-8625-745bbfab8716). I was originally planning to blog notes from each session as they went along, however that rapidly became impossible.

For me, one of the key learning points out of this virtual user group day is that live online presentations are a terribly inefficient way of presenting information. I don't think it is the fault of the presenters ([been there, done that]({{< relref "/post/2017/2017-11-17-d365ug.md">}}), and it's clear that time and effort has gone into planning each session). Rather, the medium perhaps focuses too much on the presentation aspect. The strength of an in-person user group day is to hear some interesting stuff and then do some networking.

Instead I shall wait for the session videos to be published on the [D365 UG channel](https://www.youtube.com/c/D365UGUK).

## Brief notes

### Microsoft Roadmap session

[Lucy Bourne](https://twitter.com/lucyalicebourne) / [Chris Huntingford](https://twitter.com/tattooedcrmguy) / [Kaila Bloomfield](https://twitter.com/dyn365princess)


Not a great session - a lot of reading of very dense slides.

In short:

* everything has a new name
* "Dataverse for Teams" adds some interesting (but carefully bounded) functionality into the Teams environment
* Lots of new features on Customer Insights, now renamed to Audience Insights (and soon, Engagement Insights).
* Project for the Web is a completely new product

### Websites and Power Virtual Agent

Danish Naglekar ([@Danzmaverick](https://twitter.com/DanzMaverick))

I missed most of Danish's demo because of a Teams glitch. Demoed using embedded javascript instead of iFrame to allow better visual integration with host site. I think this is as [documented here](https://docs.microsoft.com/en-us/power-virtual-agents/customize-default-canvas)

Unfortunately (and this is not the speaker's fault), Microsoft's [pricing](https://powervirtualagents.microsoft.com/en-us/pricing/) for the service will rule out a lot of potential users. Good question from another attendee about security and protection against brute force DDOS (which could get through your credits very fast) - no answer, but in fairness that's for Microsoft.

### Modern CI/CD Concepts for D365 Enterprise Projects

Robert Proll.

Mostly an explanation of why his company built their tooling to overcome issues with the standard open source CI tools for D365, [blog post](https://kuppsoft.com/resources/blogs/power-platform-build-tools-vs-third-party-tooling-technical-review-comparison/). Clearly lots of in-depth thought behind the problems that need to be solved, but the scope that Robert tried to cover could  easily fill a day, so 50 minutes online felt very rushed.

### Low-code automated UI testing for model-driven apps

[David Robertson](https://medium.com/@robertsondavid92) / [Max Ewing](https://medium.com/@max.ewing) / [Mark Cunningham](https://medium.com/@markcunningham_68121)

Pre-event blurb:

>This session is to give an overview of powerapps-specflow-bindings, an open-source automated UI testing framework for Power Apps. This framework is being used and maintained by Capgemini and is built on top of the popular open-source EasyRepro library from Microsoft.
>This framework drastically reduces the effort required to create automated UI tests that follow best practices. In addition, it handles many common problems, such as: test parallelisation, data setup and clean-up, and user identities.
>The repository can be found at https://github.com/Capgemini/powerapps-specflow-bindings

I've played a little bit with the pre-release of this tool, and it certainly makes it much quicker to write UI tests for the Microsoft Unified Interface that are described in Specflow than to directly use EasyRepro. However there are [only certain use cases where UI tests make sense](https://techbeacon.com/app-dev-testing/should-you-write-automated-ui-tests-4-questions-answer-first) - they tend to be brittle and are always slow.

 - [example of grabbing screenshots in CI](https://github.com/ewingjm/development-hub/blob/master/tests/DevelopmentHub.Tests.Ui/Hooks/AfterScenarioHooks.cs)

An excellent session - very hands on with the developers of a tool I am using - we even discussed a bugfix (to EasyRepro, not their code!)

### Implementing Azure Data Solutions using Dynamics 365 & the Common Data Service

[Joe Griffin](https://crmchap.co.uk/) / [Mark Carrington](https://markcarrington.dev/)

>Microsoft Azure is your go-to destination whenever you need to start putting your Common Data Service data to good use. Whether you want to perform batch processing activities, automated streaming of datasets or carry out big data analysis, Microsoft offers a multitude of services that are not only easy to set up but, in some cases, integrate straightforwardly alongside Dynamics 365 and Common Data Service. 
>
>Join us, Mark Carrington and Joe Griffin, as we take you on a whistle-stop tour of services such as Data Factory, Data Bricks, Data Lake, Stream Analytics and more. Throughout this, we'll aim to show you how to get the most mileage out of your data and do some pretty amazing things in the process.

Really useful session - I am in the middle of an architecture spike for a reporting infrastructure based on CDS (and other sources) / Data Lake Gen2 / PowerBI.

Lots of ideas, and interesting to see what could be done with Data Bricks around Machine Learning.
### Dataverse for Teams

[Matt Beard](https://www.linkedin.com/in/mattbeard7/?originalSubdomain=uk) / 
[Carl Cookson](https://linked365.blog/)

Pre-event blurb:

>This session is to demonstrate what Dataverse for Teams actually is, how easy it is to set up and give some examples of what it could be used for. 
>
>This is designed to be a demo type session where both presenters will be showing various components of Dataverse for Teams and how to use it.

* Security - only 1 business unit
* No API - only access is via Power Automate - so no SSRS or Xrmtoolbox
* no data export
* 2GB and 10^6 rows max per Team environment
* simple data types (no customer or currency)
* no rollup or caluclated fields
* Teams only
* no solutions
* UI is canvas only
* no video or mixed reality
  
Watch the video when it comes out for a walkthrough.

I must admit I struggle to see a use case for this service in the absence of data export. At least when workgroups keep their key data in spreadsheets the data is accessible for later manipulation.

## And finally...

Although I'm a little sceptical about how well some of these topics fit into the online meeting medium, that's the only option right now. The User Group (which is independent of Microsoft) has always taken the position that it values usefulness and community over perfection, and this day illustrated that. 

As always a number of the people presenting are well known "faces" in the PowerPlatform world, but as always there are people who you had not previously head of. Everyone there (either presenting or not) has in common that we make a chunk of our living from using these powerful tools to help organisations work more effectively. The spirit of mutual learning is very strong in every meeting, and for that reason I will continue to make the time to attend. 



