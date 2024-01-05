---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Expanding Digger to work with Hypothes.is"
subtitle: "From web annotations to local notes"
summary: "Expanded my Digger small-tech tool to now extract basic annotations from Hypothes.is into local Markdown notes."
authors: ["synesthesia"]
categories: []
tags: ["small tech", "notemaking", "PKM", "dotnet", "open source", "Digger", "hypothes.is"]
lastmod: 2024-01-05T07:48:14Z
featured: false
draft: false
type: post
slug: "expanding-digger-to-work-with-hypothesis"

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
projects: ["smalltools"]
url_code: "https://github.com/synesthesia/digger"
---
This note is mostly for myself - Digger is built for a userbase of  1 - you are welcome to fork and copy it, but I am not proposing to support it.

About eighteen months ago I released [a small tool to pull annotations from 
Diigo]({{< relref "../../2022/2022-07-15-digging-out-diigo-notes/index.md"   >}}) into local Markdown notes. 

With version 0.5.0 (released yesterday) there is now also a basic capability to pull annotations from Hypothes.is.

To upgrade:

- [get an API key](https://hypothes.is/account/developer) for your Hypothes.is account
- create an environment variable `HYPOTHESIS__APITOKEN` on your machine to hold this value
- update the tool 
   ```
   dotnet tool update -g digger
   ```

To pull annotations for a specific page, use the command: 

```
digger hypothesis -o <relative path to desired output directory> -u <url of source page>
```
