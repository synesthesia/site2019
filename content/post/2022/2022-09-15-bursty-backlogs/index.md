---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Bursty Backlogs"
subtitle: ""
summary: "How many times do we hear 'When will this feature get built?' ?"
authors: ["synesthesia"]
tags: ["software engineering", "agile"]
categories: []
date: 2022-09-15T05:21:13+01:00
lastmod: 2022-09-15T05:21:13+01:00
featured: false
draft: false
type: post
math:
  enable: true


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
## Why hasn't feature X been done yet?

I think everyone who has any managerial responsiblity for developing software will have heard that question.

The conversations with colleagues about the fluid nature of backlogs, the impact of changing business priorities, and the basic concept that an idea one has posted into the ideas portal is not a purchase order for a piece of functionality.

Even at the level of basic observation most of us are also aware of the phenonemon of some features getting pulled through quickly, whilst others languish for weeks, months, years - sometimes surprising even to those of us making the prioritisation decisions.

It turns out that the very act of prioritising may in itself be one of the contributing factors.

## Backlogs

[Alan Kelly](https://www.allankelly.net/) has a reputation for constructively upsetting the conventional Agile applecart. Lately he has been writing about the [problems with backlogs](https://www.allankelly.net/archives/6541/backlogs-nobacklogs-and-comfort-blankets/).

{{% callout note %}}
In software engineering, the "backlog" is the list of tasks or features that are required or requested for a product.
{{% /callout %}}

Calling them "a comfort blanket", he identifies three key problems:

- Backlogs always grow, often faster than the work can be done. Some organisations perceive success as "doing" the backlog - an instant recipe for conflict and organisational politics.
- An emphasis on "doing the backlog" as opposed to delivering value in the form of benefits and outcomes
- A loss of strategy and purpose

With the result that:

>[...] a lot of stakeholder problems get created because people believe that an item in the backlog is in some way promised when it isn’t. Product Owners and Teams accept items into the backlog for an easy life even when they know it is unlikely to ever get done. This stores up future problems because stakeholders start complaining when they fail to get their items. That damages trust in the team and a vicious circle ensues. [...] This makes it increasingly difficult to follow the benefit and change course and act on product feedback.
>
> [Alan Kelly - Backlogs, #NoBacklog(s) and comfort blankets](https://www.allankelly.net/archives/6541/backlogs-nobacklogs-and-comfort-blankets/)

In a [followup post](https://www.allankelly.net/archives/6571/backlog-questions-and-answers/) Alan continues his argument, and puts forward some interesting ideas about how a "just in time backlog" will lead to a more reactive technical response to changing business need. Some of those I'll explore in a later post, but what caught my eye was a link via his post to an earlier comment, and thence to [Derek Jones'](https://shape-of-code.com/) post [Task backlog waiting times are power laws](https://shape-of-code.com/2022/08/28/task-backlog-waiting-times-are-power-laws/).

## Power laws in backlogs

Derek [examines](https://shape-of-code.com/2022/08/28/task-backlog-waiting-times-are-power-laws/) a published dataset about [software development tasks](https://arxiv.org/abs/1901.01621) which found that in a given backlog, the number of tasks {{< math >}}$n${{< /math >}} waiting for a time  {{< math >}}$\tau${{< /math >}} satisfies the power law  {{< math >}}$n \approx \tau^{-1}${{< /math >}}. 

This contrasts with the expected behaviour from [queueing theory](https://en.wikipedia.org/wiki/Queueing_theory) which would be an exponential {{< math >}}$n \approx a^{\tau}${{< /math >}} ( with {{< math >}}$a < 1${{< /math >}}) relationship, giving a far lower proportion of tasks at the longer wait times.

The writer then looks at data on [how quickly famous scientists responded to letters](https://arxiv.org/abs/physics/0510117) - a process involving choice and prioritisation - which found that this behaviour also followed a power law, albeit with an exponent of -1.5.

He then references Barabási 2005 [^1] ([my summary note](https://garden.synesthesia.co.uk/references/Barabasi2005)) which showed that if task selection was based on unique probability of selection for each task (roughly proportional to the priority) then the result was a power law with exponent -1, just as in the original [data](https://arxiv.org/abs/1901.01621).

The rest of the post is some open-ended speculation on how specific real-world selection behaviour might map to this model.

## Bursty dynamics

For me Derek Jones' post opened a new rabbit hole to dive down - the field of **Bursty Dynamics** in human behaviour - the phenonemon that an area of behaviour is subject to very high peaks of interaction interspersed with long periods of relative inactivity. 

We are perhaps all familiar with situations in everyday life where we see "nothing for ages then it all comes at once", but it turns out that when you use the data-collecting capabilities of everyday technology you can see bursty characteristics at both the level of individual activities and the level of interaction-driven collective activities, and that these behaviours, far from being random and following a Poisson distribution are instead best modelled with power-law curves. [^2]

There's a lot to read, so I've only just scratched the surface...

## Final reflection

Occasionally I read things which give me that "more questions than answers" tingle of curiousity, and it turns out that a couple of blog posts about the everday mundanity of task backlogs have done just that. Some new areas to read here.

Whilst reading the source papers I've referenced in this post it struck me, for far from the first time, just how much maths I have 
lost - the referenced papers contain a moderate amount of statistical maths, and whereas I would have once read through it with relative facility, now each equation requires a fair bit of scrutiny and looking things up. Use it or lose it, as the saying goes.

[^1]: Barabási, A.-L. (2005). The origin of bursts and heavy tails in human dynamics. https://doi.org/10.1038/nature03459

[^2]: Karsai, M., Jo, H.-H., & Kaski, K. (2018). Bursty Human Dynamics. https://doi.org/10.1007/978-3-319-68540-3
