---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Test from Drafts 1"
subtitle: ""
summary: ""
authors: ["synesthesia"]
categories: ["tools"]
tags: ["tools", "micro-blogging", "Drafts", "Working Copy", "scripting"]
date: 2019-06-17T11:58:58+01:00
featured: false
draft: false
type: note
slug: "2019-05-17-test-from-drafts-1"

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
Written in [Drafts](https://getdrafts.com/), pushed via [Working Copy](https://workingcopyapp.com/)
<!-- more -->


_Updated_

Based on [this script](https://actions.getdrafts.com/a/1Pe) from [BoxOfSnoo](https://github.com/BoxOfSnoo). 

I found this script was failing with a missing key error in Working Copy, fixed by adding the url-encoded key on the two calls  to Working Copy:

* on the [initial call to the repo](https://github.com/synesthesia/drafts-scripts/blob/master/scripts/send-to-working-copy.js#L25)
* [when posting the content](https://github.com/synesthesia/drafts-scripts/blob/master/scripts/send-to-working-copy.js#L66)

As an approach although this works it has quite a few steps. I think better suited to the first step of more complex posts that might need re-arranging in Working Copy with additional resources before pushing.

The next experiment will to be use an approach that directly calls the GitHub API, such as [this](https://forums.getdrafts.com/t/script-step-post-to-github-without-working-copy/3594).
