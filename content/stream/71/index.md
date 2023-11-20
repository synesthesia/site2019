---
# Note metadata
# -------------
type: "stream"
sub_type: "note"
title: "Distributed locking in Azure Functions"
date: 2023-11-20T16:21:01Z
lastmod: 2023-11-20T16:21:01Z
tags: ["100DaysToOffload", "AzureFunctions", "Dataverse"]
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
We have an integration between Dataverse and a third party system that runs in Azure Functions. Third party have now acknowledged that in certain race conditions their system can create two entries duplicated on what should be a unique key. Just deployed what I hope is a fix to our code that uses blob lease distributed locking via the [madelson/DistributedLock](https://github.com/madelson/DistributedLock/tree/master) library...
