---
title: "Zotero to Markdown Notes"
slug: "zotero-to-markdown-notes"
subtitle: ""
summary: "A workflow to integrate  Zotero and your notes"
authors: ["synesthesia"]
categories: []
tags: ["pkm", "zotero", "obsidian",  "foam", "howto"]
lastmod: 2021-05-10T09:09:43+01:00
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
---

[Zotero](https://www.zotero.org/) is a great free  tool for managing any kind of references and citations.

In [this video](https://youtu.be/_Fjhad-Z61o) [Bryan Jenks](https://www.bryanjenks.dev/blog) demonstrates his workflow to enable initial annotation of PDFs in Zotero to be flowed through into Markdown comments that can be imported into Obsidian, Foam or any other plaintext notes system. The notes include links back to the source via Zotero.

{{<youtube _Fjhad-Z61o>}}

### Summary

Key steps are:

- have a working installation of Zotero
- install necessary Zotero plugins
  - [Zotfile](http://zotfile.com/)
  - [Better  BibTex for Zotero](https://retorque.re/zotero-better-bibtex/)
  - [MdNotes for Zotero](https://github.com/argenos/zotero-mdnotes)
- import the PDF source material into Zotero
- open the PDF from within Zotero
- annotate and save the PDF
- in Zotero right click on the PDF and select `Manage Attachments > Extract Annotations`
- in Zotero right-click on the extracted notes file and select `Mdnotes > Export to markdown`
- save the markdown file somewhere you can easily import into your notes system for further processing
