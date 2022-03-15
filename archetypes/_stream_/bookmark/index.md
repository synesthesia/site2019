---
# Note metadata
# -------------
type: "stream"
subType: "bookmark"
title: "Bookmark on {{ dateFormat "2" .Date | humanize }} {{ dateFormat "January" .Date }} {{ dateFormat "2006 @ 15:04" .Date }}"
date: {{ .Date }}
lastmod: {{ .Date }}
tags: []
authors: ["synesthesia"]

# Bookmark target
# ---------------
bookmarkOf: "{{ getenv "NOTE_REF_URL" }}"
bookmarkTitle: "{{ getenv "NOTE_REF_TITLE" }}"

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
