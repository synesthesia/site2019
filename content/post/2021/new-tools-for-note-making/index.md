---

title: "New Tools for Note Making"
subtitle: ""
summary: "Toolset for desktop and mobile note-making"
authors: ["synesthesia"]
tags: ["pkm", "notemaking", "zettelkasten"]
categories: []
date: 2021-01-20T16:12:58Z
lastmod: 2021-01-20T16:12:58Z
featured: false
draft: false
type: post


image:
  caption: ""
  focal_point: ""
  preview_only: false

projects: ["note-making-practice"]
---
This post is part of my wider [enquiry into my note-making practices]({{< relref  "/project/note-making-practice/index.md" >}}).

## Requirements 

The key technical requirements for my new note-taking setup are as follows:

* must be based on Markdown text files
* optionally the ability to enhance publishing with mdx
* able to separate publishable files from private
* must support any backup or versioning that will work for text files (e.g. dropbox, GitHub)
* not locked into someone else’s product
* publishing selected notes to static website
* options with scriptability and/or templating to reduce the amount of time taken on basic process tasks

## Current tools

I started this note last November, and the title implied that I’d settled on a new note-making tools setup. The reality is that a setup is never fixed, and I find an ever-present temptation for yak-shaving.

The core elements I’m using right now are:

- two git repositories, one private for daily working notes, a second one that is published to [my digital garden](https://garden.synesthesia.co.uk)
- for desktop editing the private, quotidian working notes I currently favour [Obsidian](https://obsidian.md)
- desktop editing of the public digital garden is currently edited using the [Foam plugin](https://foambubble.github.io/foam/) on top of Visual Studio Code
- publishing is a custom Gatsby.js site hosted on Netlify
- Mobile git client is Working Copy
- for mobile quick capture of thoughts I use Drafts (Pro) - including its great dictation feature on Apple Watch 
- for detailed editing on mobile I am currently using IA Writer