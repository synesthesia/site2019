---
# article
title: "Finding 'connectors' in Mastodon"
subtitle: ""
summary: "Exploring the behaviour of people who act as 'connectors', steered by @harold@mastodon.social, with some tools by @judell@mastodon.social"
authors: ["synesthesia"]
tags: ["PKMastery", "Mastodon", "Steampipe", "SocialNetworks","100DaysToOffload"]
categories: []
date: 2023-03-01T08:08:31Z
lastmod: 2023-03-01T08:08:31Z
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

This week as part of the [Personal Knowledge Mastery](https://jarche.com/pkm/) course Harold challenged us to identify some 'Connectors' on Mastodon and consider their posting habits.

Although connectors are defined by their behaviour, in that they join up those who seek knowledge with those who share it, it was suggested that we look at individuals who had a high ratio of follwers to followed as a starting point.

## Getting the data

As a quick experiment I wanted to look at the people I currently follow, and those who follow me, to see who might stand out based on the ratio **followers/following**

An excellent tool for analysing remote API data as if it were in a local database is [Steampipe](https://steampipe.io/), so for this test:

- I [installed Steampipe, the Steampipe Mastodon plugin and the Mastodon dashboard collection](https://garden.synesthesia.co.uk/Install%20steampipe%20for%20mastodon) (the latter two tools are by [@judell@mastodon.social](https://mastodon.social/@judell))
- ran the dashboards:
  ```
  cd steampipe-mod-mastodon-insights
  steampipe dashboard
  ```
- Added [this extra column](https://github.com/synesthesia/steampipe-mod-mastodon-insights/commit/6b5e5e8364c6ce1e1d5c1b8b3d5efb8873f8b887) to the dashboards for Followers and Following
- viewed each of the two dashboards, sorted by `followratio` (descending).

On first inspection a couple of the numbers looked a bit off, e.g. some followers who had a "following" count of 1. 

Naively I did this on the server,

`RAILS_ENV=production tootctl accounts refresh --all --verbose`

which fixed the problem, but took quite a while - it appears that even on my one-person instance Mastodon was tracking 86,253 users!

After that, the dashboards look like this (example):

{{< figure src="sample-follower-dashboard.jpg"  wifdth="60%" caption="Sample of Steampipe dashboard for followers" numbered="true"  >}}.

## Observations

### Followers

Looking first at Followers, when I pick the ones with `followratio` > 2, I get this list:


{{< table path="followers-highfollowratio-20230301.csv" header="true" caption="Table 1: Followers with follower:followed > 2" >}}

### Followed

The picture here needs some interpretation.

When you look at the top 11 in this list by `followratio` you see:

{{< table path="followed-top10-followerratio-20230301.csv" header="true" caption="Table 2: Top 11 followed by follower:followed ratio" >}}

**What is happening here, with these quite extreme ratios?**

I suggest that the accounts in this list fall into two main groups:

- "**broadcasters**" - these are accounts which fundamentally are used to push out notifications. This is typical for accounts representing applications or big organisations, or for individuals such as `@rbreich@masto.ai` or `@mariapopova@indieweb.social` who are promoting content from elsewhere
- "**just famous**" - for example `@profbriancox@universeodon.com` and `@mehdihasan@journa.host` have extremely low toot counts, which suggests these accounts are still "dipping their toes into the water" with Mastodon, the high follower numbers are reflective of the follower numbers they had on Twitter, and more general fame.

**Looking lower down the followed list**

You can start to see some numbers that make more sense, for example if I filter for the entirely arbitrary range of 2 < `followratio` < 700 and `toots` > 100 you get this somewhat longer list:

([*Jump over this long list*](#exploring-content))

{{< table path="followed-middle-followerratio-20230301.csv" header="true" caption="Table 3: Follwed with 2 < followratio , 700 and toots > 100" >}}

This, together with the earlier list of followers looks much more fruitful ground to explore for "Connectors"

## Exploring content

I don't have the time or tools to do an exhaustive examination of content from these potential Connectors, let alone any kind of semantic classification of their posts.

Sampling at random though, I noticed the following:

- a fair amount of boosting (re-posting someone's tweet into your timeline and to your followers)
- a fair amount of tagging other people
- a fair amount of linking to web content
- yet still a reasonable amount of their own content

In other words, it "just looks balanced".

## Reflection

At the risk of starting a discussion on [angels and pinheads](https://en.wikipedia.org/wiki/How_many_angels_can_dance_on_the_head_of_a_pin%3F), there's part of me that's not convinced that follower ratio is a good measure for who is a 'Connector' - perhaps a good Connector would tend to show a more balanced ratio of followers / follows?

I think that is born out by what I found at the top of my Follows list, accounts with extreme `followratio` that I arbitrarily classifed as either **Broadcasters** or **Just Famous**, neither of which are much use in a knowledge network.


In the world of technical analysis of social networks, [Valdis Krebs](https://en.wikipedia.org/wiki/Valdis_Krebs) pioneered this work 15+ years ago, and if we were able to do that type of analysis what we might be looking for are people with high [*Betweenness Centrality*](http://orgnet.com/sna.html), i.e. people who sit between otherwise-disconnected groups in the network.

Regardless of these network topologies, the key point is the behaviour, a connector is someone who joins up others, who [closes the triangle](https://bethkanter.org/close-the-triangle/). 

Although someone with more skills and time might pull off some amazing semantic or topological study, in pragmatic terms I am pretty happy with my ad hoc observation that Connectors seem to be "balanced", reflected by posts that show a good mixture of:

- boosts
- tagging others
- sharing links

What do *you* think?

[#100DaysToOffload](https://100daystooffload.com/) 24/100
