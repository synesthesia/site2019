---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "WeekNote 2024 W08"
subtitle: ""
summary: "Revisiting a familiar format to reboot writing &mdash; technical debt, systems thinking and tool of the week"
authors: ["synesthesia"]
categories: ["weeknotes"]
tags: ["dotnet", "TechnicalDebt", "SystemsThinking"]
lastmod: 2024-02-23T14:36:04Z
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
This week started like they usually do after a few days off &mdash; definitely a need to catch up with where I had left off, workwise, and definite feeling of *grudging acceptance* at the 5am alarm clock :stuck_out_tongue:

Colleagues escalated a fault to me that related to our web site no longer pulling customer access rights through (ultimately from our CRM). A mundane enough expired Client Secret (yes, *"nul points"* for our ops routines), but to see how the intermediate API got its credentials required opening up the project. This application was written, mostly by me, in ASP.Net about 10 years ago. **Ouch!** Yes the frameworks and tools have got so much better since then, but more to the point, so has my code engineering. This thing is a tangled, bloated pig of an application (no surprise that we don't like how much resource it uses relative to the traffic).

As our needs have changed and many of the endpoints are now irrelevant, obviously my mind turned to how much work it would take to pay off this chunk of technical debt. No time in the schedule right now to just start replacing it, but managed to squeeze out a couple of days to put together a single vertical slice from on endpoint all the way through to a dev instance of Dynamics, with authentication via Azure AD at both ends and a reasonable sprinkling of unit and integration tests. Just running locally so far, so no CI or deployment bits touched yet, but those are a fairly known art, my goal was to see how much easier (or not) it would be to put something together in ASP.Net Core v8 and using modern dependencies like AutoMapper.

So far the answer is "very much easier", to the point where I'm now looking for how to drop this into our longer term roadmap for this year. The other lesson I've learned from last time is bring the team along with me, so they don't have to bounce issues to me...

## Things that caught my eye

Doug Belshaw continues to document his progress with an MSc in [Systems Thinking](https://dougbelshaw.com/blog/category/msc-systems-thinking/). Recent notes that look interesting are:

- [Vickers and appreciative systems](https://dougbelshaw.com/blog/2024/02/23/tb872-vickers-and-appreciative-systems/)

- [MCB and 'being what we are willing to learn'](https://dougbelshaw.com/blog/2024/02/23/tb872-mcb-and-being-what-we-are-willing-to-learn/)

- [Bawden and living as a constant process of learning](https://dougbelshaw.com/blog/2024/02/25/tb872-bawden-and-living-as-a-constant-process-of-learning/)

- [Four pervasive institutional settings inimical to the flourishing of systems practice](https://dougbelshaw.com/blog/2024/01/31/tb872-four-pervasive-institutional-settings-inimical-to-the-flourishing-of-systems-practice/)

From the many other bookmarks I collected this week, the one I want to highlight is [Unsafe at any level](https://www.workingoutloud.com/blog/unsafe-at-any-level) from [John Stepper](https://www.workingoutloud.com/about). Stepper relates the challenges when trying to encourage new graduates in a company training programme to share visibly their work.

>They had the same mental resistance almost all employees have. :

> - *I don’t have anything valuable to contribute...*
> - *What if I say something wrong or stupid?*
> - *What if I get in trouble?*
> - *Who am I to share my work?*

He further observes that their managers are even more reluctant, and the higher you go up the hierarchy, the greater the perceived risks of working differently.

His suggestion:

> A peer coaching approach that enables new joiners to 
> 
> 1. Observe role models.
> 2. Share their work.
> 3. Connect
> 
> Without an intervention like this, new employees won’t just be oriented into their new company, they’ll be assimilated. And our ways of working won’t get better.


## Tool of the week

[danielmiessler/fabric](https://github.com/danielmiessler/fabric) is a toolset that combines a set of tested prompts (“Patterns”) and a CLI that lets you easily route text to ChatGPT via one of the prompts.

I’ve only done some basic testing so far, enough to make it interesting, especially for the extension possibilities. I’ve written up how I got it [working on WSL2](https://garden.synesthesia.co.uk/fabric-ai-prompter/).

As a quick test of the included patterns I asked for a summary of [How do we comply with the cookie rules? ](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/guidance-on-the-use-of-cookies-and-similar-technologies/how-do-we-comply-with-the-cookie-rules/) from the Information Commissioner's Office.  I've posted the result in [this media note](https://garden.synesthesia.co.uk/references/how-do-we-comply-with-the-cookie-rules/) and on first inspection it's not a bad initial summary - I'd probably want to fine tune it though.







