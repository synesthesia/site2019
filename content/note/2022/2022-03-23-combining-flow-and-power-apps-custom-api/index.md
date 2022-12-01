---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "An issue combining Flow and Power Apps Custom API"
subtitle: "Unexpected side effect from changing a custom API that was being called from a flow"
summary: "Unexpected side effect from changing a custom API that was being called from a flow"
authors: ["synesthesia"]
categories: []
tags: ["Power Automate", "Power Platform", ]
lastmod: 2022-03-23T06:26:57Z
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
## Scenario

Solution contained:

- custom API
- a solution-based PowerAutomate flow that called the custom API

Solution was being created as unmanaged in one environment, then deployed as managed into production.

## What changed?

- Made a change to the custom API (added additonal optional parameters)
- redeployed the solution

## What was the impact?

- on deployment of the change, the flow stopped working in the target environment where the solution was deployed as managed, and all attempts to turn it on failed
- it became impossible to edit the flow in the unmanaged development environment (screen timeouts)

## Solution

- remove the additional API parameters
- redeploy the solution as an upgrade in order to remove ther copy of the parameters ina lower layer in the target environment
- turn on the  impacted flow in the target environment (which now worked again)

