---
# article
title: "A McLuhan Tetrad about GitHub CoPilot"
subtitle: ""
summary: "I experiment with analysing the potential effects of CoPilot using a McLuhan tetrad"
authors: ["synesthesia"]
tags: ["McLuhan", "PKM", "PKMastery", "100DaysToOffload"]
categories: []
date: 2023-02-23T07:12:03Z
lastmod: 2023-02-23T07:12:03Z
featured: false
draft: false
type: post


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

I am currently re-experiencing (after 9 years!) Harold Jarche's [Personal Knowledge Mastery](https://jarche.com/pkm/) course. One constant is Harold's focus on PKM as a discipline, with the application of thinking tools to the process of making sense of the world.

One of those tools that Harold [advocates](https://jarche.com/2017/04/tetrads-for-sense-making/) is the [McLuhan **Tetrad**](https://en.wikipedia.org/wiki/Tetrad_of_media_effects) as a way of applying McLuhan's Laws of Media to a given problem. Perhaps the best way to explain this approach is to quote McLuhan:


>“For example, a Medium may EXTEND a particular characteristic or enhance a specific capability. When that particular item is EXTENDED beyond reasonable limits, the over-extension REVERSES into a complementary, but opposite action or form that directly and thematically corresponds to the specific EXTENSION. Similarly, the EXTENDED offering would OBSOLESCE some attribute of an earlier Medium that relates to the aspect being extended, and RETRIEVE an earlier form of that aspect belonging to some previously OBSOLESCED Medium.” —[McLuhan for Managers](http://kairos.technorhetoric.net/9.1/reviews/brooks/managers.html)

As part of the course we have been set the challenge to select a technology or medium and analyse using this model.

## First experiment

For my first experiment I have selected AI-based code tools, such as [GitHub CoPilot](https://github.com/features/copilot/).

These (I'll keep it generic, although I only know of the one example at present) tools use a large language model that has been trained on large amounts of software code, and which are integrated with commonly-used code editors. As the developer types either code or comments, the AI model will (when prompted) offer suggestions for the next piece of code.

From my fairly short exposure to the tool on a new project, I would say that perhaps 50-60% of the time it produces something that goes a long way towards expressing what you needed to achieve with the next statement block or small function, perhaps 20% of the time it is in the right direction but needs a reasonable amount of changes, and then inevitably there will be some suggestions which are garbage.

Again, in my limited experience, the key benefits are:

- speed with which it places the typical "boilerplate" code that is needed with almost any coding framework, allowing you to  focus more time on business logic
- quickly expressing common language structures, again, allowing you to focus on *what* you are trying to achieve rather than  *how*

## Placing this in a Tetrad

Here is my first attempt at applying the McLuhan model to AI-assisted code suggestions:

{{< figure src="mcluhan-tetrad-github-copilot.drawio.png" caption="McLuhan Tetrad - AI assisted code editors" numbered="true" >}}


## Reflection

The hardest part of this model to apply is **RETRIEVE** - what is the earlier form that is re-invigorated by the medium or technology? 

In this case I think, tentatively, that the power of these tools brings back an earlier form of software development with simpler (or no) frameworks - although you lose the support of whatever framework you are using, you also lose the "boiler plate" code needed to "feed" the framework. Not sure this sticks yet, but in the spirit of "share your half-baked ideas" I put it out there.

*UPDATE - after I published this post, I found [this](https://newsletter.goodtechthings.com/p/when-programming-is-gone-will-we) by [Forrest Brazeal](https://hachyderm.io/@forrestbrazeal) that explores some of those factors more deeply.*

I suspect that the more general challenge with the **RETRIEVE** stage is having enough historical perspective and the ability to zoom out from the specific and everyday, to see the echos of the past.

As a thinking exercise I can see the power of the tool - although I have seen these examples on Harold's site for some time, I have never before tried to use the model to structure thought about some technology or medium, and it is definitely both a guide to, and provoker of, a deeper analysis.

Harold has asked us *"Does this allow you to see the technology with new eyes? Would this kind of perspective be helpful in making business decisions or where to invest your energy?"* - to which I would say that the focus on both the benefits and potential negative effects of a technology is a great place to start thinking about how it might affect the wider human / technical / management system it is operating within.

## Afterthought

Update - after I saw [Forrest Brazeal](https://hachyderm.io/@forrestbrazeal)'s blog post I also found this cartoon by him:

{{< figure src="brazeal-ai-code-sad.png" alt="A cartoon about sad engineers looking at the additional complexity from AI"  width="60%" >}}

[image source](https://www.goodtechthings.com/pile-of-complexity/), used with permission.

[#100DaysToOffload](https://100daystooffload.com/) 20/100
