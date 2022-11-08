---
# article
title: "Joined the Fediverse"
subtitle: "Find me at @julian@social.synesthesia.co.uk"
summary: "I've set up a Fediverse account on a private instance of Mastodon. Here's why."
authors: ["synesthesia"]
tags: ["fediverse", "social media", "indieweb"]
categories: []
date: 2022-11-08T07:53:49Z
lastmod: 2022-11-08T07:53:49Z
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

## What? 

The "Fediverse" is

> an ensemble of federated (i.e. interconnected) servers that are used for web publishing (i.e. social networking, microblogging, blogging, or websites) and file hosting, but which, while independently hosted, can communicate with each other
>
> \- [Wikipedia:Fediverse](https://en.wikipedia.org/wiki/Fediverse)

It's not new, but there is definitely a [popular surge to the Fediverse, especially Mastodon, since Musk took over Twitter](https://uk.pcmag.com/social-media/143628/mastodon-gains-200000-new-users-after-musk-completes-twitter-takeover).

For reasons I expand below, I've now made the leap and set up a Mastodon account, on my own instance ([@julian@social.synesthesia.co.uk](https://social.synesthesia.co.uk@julian)). I won't be deleting my Twitter account just yet, not least because I have several apps that use it for identity, but I might be changing how I use it.

## Why? and Why Now?

I can only speak personally of course, but a more human-scaled social media feels like the obvious next step once you have started [taking control of your web presence](https://boffosocko.com/2017/06/13/the-indieweb-movement-will-help-people-control-their-own-web-presence-future-hosting/). Many commentators have pointed out that this is [going back to the roots of what drove the web in the first place](https://mastodon.ie/@klillington/109290799195239199), and as the length of this site's archive shows, I was there!

I have looked at Mastodon previously, and at that time felt there wasn't enough content that I found interesting. Now, not least because of the recent surge, there are a lot more conversations of interest, and many of the people I already interact with (or in some cases, just follow, so far), have made the leap.

When it comes to finding people, that is something that will feel instantly familiar to those of us who were around back then, as Ton [says](https://www.zylstra.org/blog/2022/10/twitter-after-the-birds-capture-find-me-at-tonm-tzyl-nl/)

>finding your current others that you interact with already on Twitter. The path that one needs for this is like it used to be: once you connect to someone you check-out the people they follow and are followed by. We did that for blog rolls, and for every YASN (yet another social network) we joined, and we asked people in person for their e-mail addresses before that

So at one level personal curiosity, but also a professional interest. I need to know enough about the ecosystem to know whether I should advise my workplace to consider setting up our own Mastodon server: [Julien Deswaef](https://toot.thoughtworks.com/@judeswae) has some [compelling reasons why that might be a good idea](https://martinfowler.com/articles/your-org-run-mastodon.html), and Ton Zjilstra takes the thinking even further, [considering multiple instances configured to replicate the network between a small company and its partners](https://www.zylstra.org/blog/2022/11/how-to-federate-like-our-business-ecosystem/).

## How?

My first instinct was to run my own instance, to give me complete freedom in how I use it, but I also planned to set that up on a hosting service (e.g. the [Masto.Host](https://masto.host/) service is recommended by a number of people I trust), unfortunately every hosting service I can find that might be of interest is currently closed for new business while they handle the surge of activity on existing instances.

For the time being I have set up Mastodon on a cloud server to get things running. After that experience I would definitely point anyone else wanting their own instance to go with a specialised hosting service:

- the Docker approach failed for reasons I am still digging in to, but related to [this issue](https://github.com/mastodon/mastodon/issues/11368)
- getting the app running required a wide range of Linux knowledge, and certain stages (e.g. building a specific Ruby version and compiling web assets) need a fairly beefy server - this would certainly be an area to improve with a CI build and deploy process
- running the app at even minimal performance seems to need a server that costs more than an equivalent hosting service (as they can benefit from economies of scale)

So once the hosting services open up again I think it likely I will port the instance across.

## Will this stick?

A few people are (of course) speculating about the future of social media. I'm sceptical about some of the wilder claims, but there are some who are making more grounded predictions, for example in the [words](https://social.coop/@eloquence/109300911537845631) of [Erik Moeller](https://social.coop/@eloquence)

>The collapse of Twitter is a system breakdown. Mastodon and the fediverse represent something different: _system change_. From for-profit "Big Tech" to nonprofit, open source, community-owned public spaces.
>
>System change is always harder than you think. It always incurs short-term costs, with hoped for long-term benefits. 
>
>The next few weeks will be really tough for the fediverse. Stick around, vibe with it, and you just might help us put a huge part of the web back in community hands. <3
>Expect some of the following to happen in the coming weeks:
>- celebrities with huge follower counts pushing tiny community-run servers to their knees
>- instance admin burnout; shutting down of servers
>- big new servers that don't "vibe" with common rules or culture being widely defederated
>- some notable account violating an instance code of conduct and throwing a fit
>- lots of people ragequitting Mastodon for one reason or another
>- etc.
>It'll be a rough ride. Patience and strength, all.

## Find me

You can find me at [@julian@social.synesthesia.co.uk](https://social.synesthesia.co.uk@julian)
