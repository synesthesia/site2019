---
# Note metadata
# -------------
type: "stream"
subType: "reply"
title: "Reply to {{ getenv "NOTE_REF_AUTHOR" }} '{{ getenv "NOTE_REF_TITLE" }}'"
date: {{ .Date }}
lastmod: {{ .Date }}
tags: []
authors: ["synesthesia"]
draft: true

# Bookmark target
# ---------------
inReplyTo: "{{ getenv "NOTE_REF_URL" }}"
inReplyToTitle: "{{ getenv "NOTE_REF_TITLE" }}"

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: false


# Images and resources
# --------------------
# mainImage: "example.jpg"
# resources:
#   - src: "example.jpg"
#     title: "TODO: alt text goes here"
---
