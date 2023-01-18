---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Resilience tooling for Azure Functions calling Dataverse"
subtitle: ""
summary: "Using Polly to reduce impact of Dataverse API limits"
authors: ["synesthesia"]
categories: []
tags: ["Polly", "Dataverse", "AzureFunctions", "100DaysToOffload"]
lastmod: 2023-01-22T06:27:45Z
featured: false
draft: true
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
projects: ["dataverse-resilience"]
---

## Context

Where I work we make extensive use of Azure Functions to manipulate data in Dataverse or to integrate to/from Dataverse and other systems.

We have found that it's very easy to run into Dataverse API Service Protection limits when working with even quite small datasets, and have started to make use of tools from the [Polly](https://github.com/App-vNext/Polly) library to make these function apps more reliable.

Along the way we have started to adapt our approach to work even if the workload is fanning out to multiple cores in a Functions Consumption Plan.

## Dataverse Service Protection Limits

At the time of writing the [Dataverse API Service Protection]




[#100DaysToOffload](https://100daystooffload.com/) x/100
