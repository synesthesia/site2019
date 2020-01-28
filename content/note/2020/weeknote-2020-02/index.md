---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "WeekNote 2020-W02"
subtitle: ""
summary: "First week instrumenting work with PomoDoneApp"
authors: ["synesthesia"]
tags: []
categories: ["weeknotes"]
date: 2020-01-11T08:56:55Z
lastmod: 2020-01-11T08:56:55Z
featured: false
draft: false

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

## Kaizen

First full week of using Pomodoro again, and tracking focused work into PomoDoneApp.

One of the nice aspects of the tool are the charts it produces (I've cropped off  the parts of the display that tell you what project is represented by each colour):

{{< figure src="pomo-2020-W02.jpg" title="PomoDoneAnalysis week 2020-W02" lightbox="true" >}}

A few immediate reflections:
* on most days I managed to keep focused on just a couple of projects without too much context switching
* those ~42 hours of focused work were spread over approximately 53 hours of time either in the office or working from home (79%)
    * I was aware that sometimes I was forgetting to start the timer - what error % might this be?
    * where does the other 21% go? (or at least that part of it which isn't refreshment breaks)
    * is it worth trying to track the "noise" work inherent in any workplace - dealing with emails, ad-hoc conversations, general management meetings etc?
    * I know that after 4 days of 10-12 hours in the office I'm pretty tired - if I was "present" less could I deliver the focused work in less overall time?

## Other highlights

A couple of things where I spent quite a bit of time but which were team achievements:

**Cutting over to a new configuration of the [customer journey tooling](https://www.thunderhead.com/) we use at SSAT** - this allows us to amalgamate customer activity on the website, in emails, attending events etc. to generate a unified profile of what individuals seem to be interested in so we can offer them the most appropriate content or services

**Updating some custom widgets we use within Dynamics 365** to display customer information from multiple sources - these were dependent on a vendor SDK and written in AngularJS. JavaScript is not our main skillset, and we find React a much easier tool to use, so we have ported these widgets across. Key things we learned:
* Using React context providers to address multiple APIs
* Embedding D3 visualisation in React app




