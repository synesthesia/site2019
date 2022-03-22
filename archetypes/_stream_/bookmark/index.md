---
# Note metadata
# -------------
type: "stream"
sub_type: "bookmark"
title: "Bookmark of '{{ getenv "NOTE_REF_TITLE" }}'"
date: {{ .Date }}
lastmod: {{ .Date }}
tags: []
authors: ["synesthesia"]
draft: true

# Bookmark target
# ---------------
bookmark_of: "{{ getenv "NOTE_REF_URL" }}"
bookmark_title: "{{ getenv "NOTE_REF_TITLE" }}"

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
