---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Notes on CRM Audio 97 -  Microsoft Flow with Merwan Hade from Microsoft"
subtitle: ""
summary: ""
authors: ["synesthesia"]
categories: ["Microsoft Power Platform"]
tags: ["MSFlow", "Dynamics365"]
lastmod: 2019-09-19T10:02:47+01:00
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

Quick notes jotted down while listening to this [podcast](https://crm.audio/episode-97-microsoft-flow-with-merwan-hade-from-microsoft/) originally published 26/09/2018.

Podcast guest [Merwan Hade](https://www.linkedin.com/in/merwan-hade/), at that time Senior Program Manager for MS Flow (now Director of Product Management at Salesforce).

Q: Flows inside Dynamics 365 solutions - why?
: Solution as a way of packaging dependencies and moving between environments.
: Parameterised solutions - e.g. have a generic flow that can be parameterised in different environments


Q: How will connectors be handled when deploying solutions across environments?
: When deploying solution then connectors need to be configured for the new environment before solution can be published.  Might have to edit flow to make sure it works in new environment?
: Define parameters in flow that are the dependencies to tweak - not yet available??

Q: Development of connectors seem to have slowed down?
: Focus now is on ISVs building connectors
: You must own the underlying service
: MS certify that connector works, then published

Q: what about ISVs who do minimal? How can others extend, other than sharing private connectors?
: Still something MSFT are thinking about.
: Pushing ISVs to contract with the source vendor
: Legal constraints on MSFT

Q: Partner programmes?
: Still something MSFT are thinking about.

Q: Have MSFT added any restrictions to connectors
: Map to underlying provider restrictions

Q: How to determine which fields in Dynamics can be exposed in Flow connector?
: If you have issues post to [Flow Ideas portal](https://powerusers.microsoft.com/t5/Flow-Ideas/idb-p/FlowIdeas), or tweet at team members

Q: What is process for turning Flow into a template?
: MSFT review submitted templates for uniqueness and will publish
: Draw MSFT  attention via twitter or community forum 
: MSFT publish lots of patterns in [Flow of the week](https://flow.microsoft.com/en-us/blog/category/flow-of-the-week/)

Q: Dynamics developers  choosing Action, Business Process Flow, traditional Process (sync or async) - now Flows inside Dynamics - how to choose?
: Flow v Business Process - think of Flow as workflow management tool with minimal human intervention, whereas Business Process is a guide to human interaction.
: (as at 2018) choose Flow v Workflow based on familiarity and case-by-case _(this advice is changing now)_

Q: what about rogue flows that hog resources?
: currently case-by-case, if they spot circular dependencies etc MSFT will turn it off
: focused on Flow Checker to try and avid problems up front

Q: dividing line between Flow and Logic Apps? What are scale perspectives?
: if you have Azure sub, Logic apps is the way to go, if Office365 or Dynamics365 use Flow 
: Flow is built on top of Logic apps, so only differences may be polling intervals etc based on licence
: Logic apps faster polling options. 

Q: Security and governance - control who can use Flow in which environments? Control over connectors?
: Data Loss Prevention policies. Classify connectors into two groups - business-data-only and no-business-data-allowed. Can be applied per-environment.

Q: other services such as IFTTT are better for personal devices e.g Alexa, Cortana etc
: Do see some more consumer connectors

Q: e.g. approvals - will we see customisation of page etc
: yes - looking at more scope to brand approvals etc

Q: Flow tools for admins?
: flow admin centre - can see all flows in environment, DLP etc
: Power Platform admin - analytics
: Powershell cmdlets 

See also:

* [Flow product blog](https://flow.microsoft.com/en-us/blog/)
* [Flow Ideas portal](https://powerusers.microsoft.com/t5/Flow-Ideas/idb-p/FlowIdeas)
* [Solutions in Flow](https://flow.microsoft.com/en-us/blog/solutions-in-microsoft-flow/)
* [Flowception: Creating solution enabled Flow with Flow](https://dreamingincrm.com/2019/03/01/flowception-creating-solution-enabled-flow-with-flow/)
* [Dynamics 365 Workflow vs. Microsoft Flow](https://us.hitachi-solutions.com/blog/dynamics-365-workflow-vs-microsoft-flow/)
