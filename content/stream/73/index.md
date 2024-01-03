---
# Note metadata
# -------------
type: "stream"
sub_type: "note"
title: "Working around problems with hypothes.is bookmark"
date: 2024-01-03T08:17:41Z
lastmod: 2024-01-03T08:17:41Z
tags: ["annotation", "hypothes.is", "browser"]
authors: ["synesthesia"]
draft: false

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
Discovered that sites which set `Cross-Origin-Opener-Policy: same-origin` break the hypothes.is bookmark. Workaround is to open the site using the ["Via" proxy](https://web.hypothes.is/via-proxy-tutorial/). See [GH issue](https://github.com/hypothesis/client/issues/5769).
