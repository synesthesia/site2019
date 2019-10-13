---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Rebooting a Dynamics implementation - Introduction"
subtitle: ""
summary: ""
authors: ["synesthesia"]
categories: ["Microsoft Power Platform"]
tags: ["Power Platform", "Dynamics 365", "Microsoft"]
lastmod: 2019-10-23T10:44:54+01:00
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
#   Otherwise, set `projects it`.

projects: ['dyn365ci']

---

When you are on a burning platform then sometimes you need to get creative.

That's the challenge we have been facing with our heavily customised version of Dynamics 365, based on the removal of the legacy Web UI in October 2020.

The obvious starting point was to think about adding one or two Model-Driven Apps to our existing customisations.

However the closer we looked the more difficult that looked.  It because of the Model-Driven App approach - it is deeply familiar to anyone who has customised Dynamics 365, and the new UI is a vast improvement.

The issue was more one of our own creating. With five years of customisations, starting from a place where we knew almost nothing about the platform we've ended up with a total mess of deployed solutions, including layers of entity customisation with deeply-twisted interdependencies.

It's one of the hardest calls for any CTO - faced  with a mountain of technical debt that seems beyond an iterative refactor when do you go for a complete rebuild and then port data  across? 

If we were going to do this there were three key areas we would need to spike out:

* a clean set of customisation solutions that balances the minimum number of moving parts with future flexibility, keeps within solution size limits and obeys clear rules about mutual interdependencies
* a CI / CD pipeline that enforces good delivery practices, and ensures that all deployment follows   deterministic processes
* a data integration approach and a  strategy for ensuring a complete new instance ahead of cutover


