---
# Note metadata
# -------------
type: "stream"
sub_type: "reply"
title: "Reply to 'reproducible HTTP 502 error in OAuth /oauth/authorize · mastodon/mastodon'"
date: 2022-11-14T06:56:31Z
lastmod: 2022-11-14T06:56:31Z
tags: ["indieweb", "fediverse"]
authors: ["synesthesia"]
draft: false

# Bookmark target
# ---------------
in_reply_to: "https://github.com/mastodon/mastodon/issues/12915"
in_reply_to_title: "reproducible HTTP 502 error in OAuth /oauth/authorize · mastodon/mastodon"

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
Found this when trying to set up syndication via Brid.gy to my Mastodon account.
For me solution was to increase proxy buffers in Nginx as per https://github.com/doorkeeper-gem/doorkeeper/issues/1554#issuecomment-1304606633

