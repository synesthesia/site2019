---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Notes on 'Eghbal: Working in Public'"
subtitle: ""
summary: "Nadia Eghbal's revoew of how open source really works in 2020"
authors: ["synesthesia"]
tags: ["opensource","nadia eghbal","books"]
categories: []
date: 2020-08-14T08:38:46+01:00
lastmod: 2020-08-14T08:38:46+01:00
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
#  Notes on "Eghbal: Working in Public"

Just finished [Working in Public: The Making and Maintenance of Open Source Software](https://amzn.eu/5MqboO9) by Nadia Eghbal.

## Introduction

Initially Eghbal focused her research on the lack of funding for Open Source, and started with a research question of ["what is not venture-backable in tech right now?"](https://medium.com/@nayafia/how-i-stumbled-upon-the-internet-s-biggest-blind-spot-b9aa23618c58), later amended by the addition of "_but that tech needs_".

As her work progressed she became aware that many open source maintainers were reporting feelings of overwhelm and burnout, so pivoted her investigations in that direction.

> I started to see the problem is not that there’s a dearth of people who want to contribute to an open source project, but rather that there are too many contributors--or they’re the wrong kind of contributors.

The main thesis of the book is that our mental models of how open source works are out of step with reality, and until we understand how things have changed there is a risk that a key part of the software industry will stall and regress.

##  Coase's Penguin revisited

Eghbal starts by revisiting the conclusions of Benkler's essay [Coase's Penguin](https://www.benkler.org/CoasesPenguin.PDF)  (see also [my 2003 note]({{< relref "/post/2003/2003-01-15-coases-penguin.md" >}}) )

Benkler identified a third form of information asset production (i.e. not via contract or a firm) that he labelled _Commons-based Peer Production_, and concluded  that the production of information goods where resources are applied through a commons model, without central ownership, is both possible and efficient given:

- intrinsic motivation
- modular / granular tasks
- low co-ordination costs

The last of these is perhaps the most important: as Eghbal notes, co-ordination tasks are less intrinsically motivating for most developers, and if the associated workload increases then it is more likely the project will lose momentum.

Drawing on earlier work on the Commons by Ostrom, within such communities social sanctions (and therefore reputation) become essential to the maintenance of a healthy project.

##  Forms of open source projects

Eghbal analyses open source projects against the axes of contributor growth and user growth to identify four broad types:

|| High user growth | Low user growth |
|====|====|====|
| High developer growth | Federations | Clubs |
| Low developer growth | Stadiums | Toys |

Of these, Clubs come close to an obvious peer community. Federations are large projects with complex governance but still show aspects of a peer commons within the developer community. 

By contrast, Stadiums in particular exhibit 1:N communication patterns between a small number of developers and a large number of users.

This in turn leads to a situation where developer attention becomes a scarce resource, and user interaction can become onerous for the core group. Eghbal makes the distinction between the _use_ of open source code and the _production_ of that code:

> Open source code, in static state, is a public good, meaning that it is both non-excludable and non-rivalrous. 
> ...
> The production of open source code, however functions more like a commons--meaning that it is non-excludable and rivalrous--where attention is the rivalrous resource. Maintainers can’t stop users from bidding for their attention, but their attention can be depleted.

These two economic models within any project lead to two distinct consequences from high participation:

> Open source code itself is not a common pool resource but a positive externality of its underlying contributor community. Users can consume, or "appropriate," code at zero marginal cost, because what the commons actually manages is not code but attention. When developers make contributions, they appropriate this attention from the commons
> 

##  The impact of platforms

Eghbal highlights the difference that has been made by the rise of platforms that support the process of open source, in particular GitHub. Ironically tools which facilitate open source working may eventually strangle many projects through the changes to demands on maintainers.

### Reduced friction in demands for attention

GitHub makes the mechanics of open source co-ordination simple, with support for project plans, issues and pull requests, and to this extent has made open source projects easier to run.

The downside of these same functions are the ease with which contributors can demand the attention of project maintainers through issues and pull requests. Eghbal distinguishes _extractive_ and _non-extractive_ contributions, where extractive contributions are those which require more effort from maintainers to evaluate than they potentially contribute.

### Death of community

A second aspect of GitHub is that projects appear to be more homogeneous, to the extent that mechanisms are common and the visual presentation is the same (I.e. a README). This makes it easier to navigate between projects.

Using Michael Welch's idea of _context collapse_ Eghbal posits that the result is a reduction in the sense of community within a specific project, and the growth of individual identity.

This shift reduces the power of the commons - if individuals feel they have little to lose if they break the norms of a given project then there is less incentive to behave in a non-extractive manner. 

As individual identity becomes more central, there are examples of people using association (however tenuous) with a high-profile project to increase their own profile regardless of what they contributed. The mechanistic way in which GitHub reports "contributions" adds to this.

An extreme example is reported anecdotally in this tweet from [@kartikchow](https://twitter.com/kartikchow/):

{{< tweet 1292499801100005377 >}}

Inevitably these sort of interventions reduce the available time and motivation from project maintainers.

More broadly Eghbal discusses a shift in the culture around open-source. Tied in with the platform effects and the change of identity drivers from "community" to "self" there is a growing conflation between the concepts of "open source" and "software developed by a community" - a sense of entitlement to contribute.

##  Managing the attention of creators

It's unsurprising that many project maintainers may feel as one tweeted recently: "[Open Source: coding for non-fun and non-profit](https://twitter.com/jevakallio/status/1291411616316248065?s=21)"

Eghbal surveys approaches that platforms and  projects have taken to protect the core maintainers from distraction, and summarises them as the _one way mirror_:

> The public stage increasingly reflects a one-way mirror pattern, where anybody can consume content but interactions with its creator are limited

Some patterns that emerge are:

- platform features to turn off or mute social signals such as likes or comments
- add lightweight signals such as emojis and likes that convey a reaction without requiring significant attention from the creator
- recruiting additional participants into moderation and curation roles - the gatekeepers
- using platform permissions to prevent users from creating issues and PRs _(as a corollary many larger projects move user support off to forums such as Stack Overflow, where there is often a wider community dynamic with super-users contributing answers)_

## Making money from open source

The content of open source (the code) behaves like a public good, so direct monetisation isn't sustainable, although some larger projects attract corporate sponsorship in order to ensure the continuing viability of tools which the corporates depend upon (often indirectly by employing the creators).

Eghbal looks at content-producing industries more broadly to consider other forms of monetisation such as:
- freemium - some free content and some only for pay
- subscription - not just monetising access to "the club" but further deterring spurious extractive interactions
- more generally still, finding niches and "optimising for fewer people laying more"

She further suggests that, like journalism, open-source is hampered by inherited models of how things work, but ends on an optimistic tone, seeing potential for continued change.

## Conclusion

The book is certainly enjoyable and well-annotated. Eghbal's [wider publications on open source](https://nadiaeghbal.com/oss/) enable drilling down into specific topics raised in the book and visibility into the development of her ideas.

There is no magic bullet within these pages about open source funding, but there are pointers to directions that platforms in particular might take.

There's wider coverage of the root causes of creator burnout, and on-depth discussions of both what is possible to motivate that now and what platforms might do to improve support for open source developers.

Lastly and on a personal level It's made me re-evaluate some of my own interactions with projects: I can perhaps hope that I will be less extractive in my interactions!