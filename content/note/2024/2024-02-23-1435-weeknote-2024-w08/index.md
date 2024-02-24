---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "WeekNote 2024 W08"
subtitle: ""
summary: "Revisiting a familiar format to reboot writing, mostly this week about technical debt"
authors: ["synesthesia"]
categories: ["weeknotes"]
tags: ["dotnet", "techdebt"]
lastmod: 2024-02-23T14:36:04Z
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
projects: []
---
This week started like they usually do after a few days off &mdash; definitely a need to catch up with where I had left off, workwise, and definite feeling of *grudging acceptance* at the 5am alarm clock :stuck_out_tongue:

Colleagues escalated a fault to me that related to our web site no longer pulling customer access rights through (ultimately from our CRM). A mundane enough expired Client Secret (yes, *"nul points"* for our ops routines), but to see how the intermediate API got it's credentials required opening up the project. This application was written, mostly by me, in ASP.Net about 10 years ago. **Ouch!** Yes the frameworks and tools have got so much better since then, but more to the point, so has my code engineering. This thing is a tangled, bloated pig of an application (no surprise that we don't like how much resource it uses relative to the traffic).

As our needs have changed and many of the endpoints are now irrelevant, obviously my mind turned to how much work it would take to pay off this chunk of technical debt. No time in the schedule right now to just start replacing it, but managed to squeeze out a couple of days to put together a single vertical slice from on endpoint all the way through to a dev instance of Dynamics, with authentication via Azure AD at both ends and a reasonable sprinkling of unit and integration tests. Just running locally so far, so no CI or deployment bits touched yet, but those are a fairly known art, my goal was to see how much easier (or not) it would be to put something together in ASP.Net Core v8 and using modern dependencies like AutoMapper.

So far the answer is "very much easier", to the point where I'm now looking for how to drop this into our longer term roadmap for this year. The other lesson I've learned from last time is bring the team along with me, so they don't have to bounce issues to me...

## Things that caught my eye



## Tool of the week

[danielmiessler/fabric](https://github.com/danielmiessler/fabric) is a toolset that combines a set of tested prompts (“Patterns”) and a CLI that lets you easily route text to. ChatGPT via one of the prompts.

I’ve only done some basic testing so far, enough to make it interesting, especially for the extension possibilities. I’ve written up how I got it [working on WSL2](https://garden.synesthesia.co.uk/fabric-ai-prompter/).







