---
# reply
title: "Reply to Ton Zijlstra 'Clipping Articles From Feed Reader To Obsidian'"
subtitle: "Planning another personal information tool"
summary: "I look at what a 'web colleague' has done, and think about how I might solve a similar problem."
authors: ["synesthesia"]
tags: ["PKM", "personal software tools"]
categories: []
date: 2022-05-24T06:28:24+01:00
lastmod: 2022-05-24T06:28:24+01:00
featured: false
draft: false
type: reply
# Reply target
# ------------
in_reply_to: "https://www.zylstra.org/blog/2022/05/clipping-articles-from-feed-reader-to-obsidian/"
in_reply_to_title: "Clipping Articles From Feed Reader To Obsidian"

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
projects: ["note-making-practice"]
---
## Ton shows the way again

Once more, Ton has not only shown that he is thinking about similar personal information tooling challenges, but is ahead of me in implementing another [personal tool](https://interconnected.org/home/2020/06/18/personal_software) to support his workflow.

Ton has already taken the steps of implementing a [feed reader](https://www.zylstra.org/blog/2022/02/building-my-own-microsub-client-for-feed-reading/) running on his local machine, to which he has added the ability to post commentary on tagged feed items to his public website (which I think runs on wordpress).

In [this post](https://www.zylstra.org/blog/2022/05/clipping-articles-from-feed-reader-to-obsidian/) he describes augmenting the tool, to allow him the option to post his clipped material and annotations into a Markdown file in his local notes repo. Given that Ton had already implemented his feed-reader client as PHP-based runnning in a local web server this approach seems extremely pragmatic.

## My process

My [personal information environment](https://www.synesthesia.co.uk/2021/05/01/reinventing-my-note-making-practice/) is somewhat different at the implementation layer (although broadly similar in terms of information flows). 

At the moment I don't feel that using a commercial feed reader ([Feed.ly](https://feedly.com/)) is the biggest pain point in my process. I value the portability of a cloud solution, and in particular the availability of a mobile app - most of my initial feed skimming is done on my phone in odd moments, and I use [IFTTT](http://ifttt.com/) to post saved items into my [Diigo library](https://www.diigo.com/user/synesthesia).

At the point I grab stuff into Diigo (either from Feedly or during normal web searches) I may have multiple outcomes in mind, broadly in these groups:

- something I've seen in a feed that I want to do "something" with later, in other words one of the other reasons in this list
- just a quick save of something I have opened (usually on my phone) and will want to come back to "at some point", giving me portability of the bookmark across devices and allowing me to clear down open tabs
- whilst engaged on a work problem I will almost always end up with a dozen tabs open _(different pieces of documentation, background reading, or examples of how someone has tackled the problem before)_ - I usually tag these into Diigo so I can come back easily to them if I have to pick the problem up again and don't want to search down a list of Google results to find them again
- something I think warrants further inspection that I want to grab into my reference library, possibly with initial annotations added in Diigo.

Of these, only the last really merits a permanent home in my notes, although of course information can move between categories - for example something I refer to while solving a problem might warrant deeper review after the immediate need.

## Technical implementation

I'm behind Ton on this, still thinking through what approach to use, and indeed this post is part of that process.

I think it's worth splitting the problem into 

- sources
- destinations
- processing

### Sources

Whatever I build has to pull information from two sources:

- Diigo (potentially only bookmarks with a specific tag)
- Hypothes.is _(only just starting to play with this, but if I can't see how I can process what I might capture with the tool, there is no point in starting down this track)_

Both of these services have APIs.

### Destinations

All of my personal knowledge library is held and processed as Markdown files (website, public notes, private notes), so adding to the library is a matter of either saving files into the local copies of those repositories, or posting them to the relevant github repo.

### Processing

My initial thought was to implement a fairly bare-bones script that would pull bookmarks from Diigo, complete with annotations, and then save into a rough form in my library for further manual editing. 

This would have the advantages of simple implementation and the potential for easy automation, for example by running it in a Github action triggered on a schedule. The obvious downside is that in practice it would fill up my notes inbox with material that had not yet received any mental processing, in effect a local duplication of information at the same state as held in Diigo.

I'm well aware from previous reflection that sense-making is definitely the weak link in how I practice Harold Jarche's [Seek Sense Share](http://jarche.com/2014/02/the-seek-sense-share-framework/) approach, and sense-making requires mental input.

Although it will be more work I think the right approach mirrors Ton's, that is only to bring items into my core library as an intentional act, and with some initial processing.

That implies a user interface for selection of items (possibly from a pre-filtered list drawn from an API), integration of new commentary with clips and annotations that may come from the upstream tool, and selection of one or more destinations.

As my primary text editing tool is [VS Code](https://code.visualstudio.com/) combined with the [Foam](https://foambubble.github.io/) plugin, there is an attraction in using that to host this curation interface.

I've never written a VS Code extension, but I have looked at a couple and the code structure is reasonably clear. They use use Typescript, with which I have some level of knowledge, and the main challenge will be to understand the VS Code extension API.

Anyway...

_(as an aside - when writing a reply-to post should one use second-person ("you") or third-person (e.g. "Ton") to refer to the author of the original post?)_
