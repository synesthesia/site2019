---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "A Rusty Advent"
subtitle: "Learning a new programming language via a quiz"
summary: "I've been using Advent of Code to start playing with the programming language Rust. This is what the journey looks like so far (early days)."
authors: ["synesthesia"]
categories: []
tags: ["programming", "Rust", "AdventOfCode", "AI", "ChatGPT"]
lastmod: 2022-12-06T06:19:09Z
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
url_code: "https://github.com/synesthesia/advent-of-code-rust-2022/"
---
## Background

[Eric Wastel](http://was.tl/) has been publishing [Advent of Code](s://adventofcode.com/) (AoC) since 2015. Each year he publishes 25 programming problems, releasing one a day from the 1st of December. Each day's problem consists of a textual description of a small programming puzzle, split into two parts - you only see the second part when you solve the first one correctly. To make things interesting there isn't a single set of input data and correct answers, Eric populates each question with an undisclosed number of variants, and you get one chosen randomly for your account.

For some people the race to get on the [global leaderboard](https://adventofcode.com/2022/leaderboard) is all part of the fun, but as only the first 100 correct answers per day get points, this is a serious challenge requiring skill, a grasp of tactics ([1](https://kevinyap.ca/2019/12/going-fast-in-advent-of-code/)|[2](https://gist.github.com/mcpower/87427528b9ba5cac6f0c679370789661)|[3](https://blog.vero.site/post/advent-leaderboard)), and availability.

Prompted by [this post](https://fedi.simonwillison.net/@simon/109440161155706170) from Simon Willison, I thought I'd have a go at using [this year's AoC](https://adventofcode.com/2022/) to play with [Rust](https://www.rust-lang.org/). I have absolutely zero previous experience of using Rust, but as it's profile is [slowly rising](https://www.tiobe.com/tiobe-index/) and it is significantly different from my daily diet of C#, it seems a good opportunity to stretch my brain a bit.

Learning a new programming language can be very slow at first, and often the things that get in the way are around setting up your project to work efficiently, rather than the specifics of the language. Luckily, the popularity of AoC means that there are a fair number of pre-built templates out there. I found [this one](https://github.com/fspoettel/advent-of-code-rust) by [Felix Spöttel](https://spoettel.dev/) to be very full-featured.

## Starting the problems

There are at least two conceptual stages to solving an AoC problem (or indeed any programming challenge) - understanding the problem well enough to map out some kind of algorithm, and then implementing that algorithm in your tool of choice. Luckily code that is easy-to-write, ugly, and slow, (but accurate) is enough for AoC: it doesn't require the extra attention needed in production code to make it efficient, safe and maintainable. 

As someone who writes a fair amount of code professionally the first of those isn't too hard, but when you are learning a new language the second can be very challenging. As the point is to learn a new tool, it's extremely useful to look at what other people have done (yes, in a strict competition this would be cheating!), and luckily a fair number of people make their solutions public. I've also found at least one person who is publishing [a set of tutorial blogs](https://fasterthanli.me/series/advent-of-code-2022) based on the same challenge. 

Although approaching like this you can rack up stars fairly easily (although you won't get on the leaderboard because of the time delay), that's only incidental feedback. The whole point when using the process as a learning tool is to gradually wean yourself off looking at other people's code until you get really stuck. In the words of my trainer, "you're only cheating yourself!".

Simon Willison has explicitly chosen to use the process not only to learn Rust, but to test out the use of a modern AI model ([ChatGPT](https://chat.openai.com/)) as a way of bootstrapping a first pass of code for a given question. I haven't yet resorted to that, but I won't rule it out. *It will also be interesting to see if this area (writing code) is something ChatGPT can do well, as there are other fields (such as mathematics) where people are [reporting egregious errors in the results](https://mathstodon.xyz/@timhenke/109462327312838836).* If you are interested in a more in-depth discussion about using ChatGPT for this purpose and some of the wider questions this raises, I recommend [Simon's blog post](https://simonwillison.net/2022/Dec/5/rust-chatgpt-copilot/).

I am keeping more detailed learning notes in the [Github issues](https://github.com/synesthesia/advent-of-code-rust-2022/issues?q=is%3Aissue+is%3Aclosed) associated with [my code](https://github.com/synesthesia/advent-of-code-rust-2022/), I will disclose all sources of help in there.

## Progress

As I write I am [part way through Question 2](https://github.com/synesthesia/advent-of-code-rust-2022/issues/2#issuecomment-1338924224), I only started yesterday and I have no illusions that I will complete these tasks before Christmas.

I will keep commenting in Github as I go, and will come back here with a followup post when I finish (or lose the will to continue).
