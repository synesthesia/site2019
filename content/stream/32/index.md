---
# Note metadata
# -------------
type: "stream"
sub_type: "note"
title: "Code lessons I thought we had learned before"
date: 2023-01-13T15:00:06Z
lastmod: 2023-01-13T15:00:06Z
tags: ["100DaysToOffload", "code"   ]
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
I thought we had learned these lessons before, but maybe not!

* never assume that colleagues won't try to do something that they think should work , just because we haven't told them that the feature is available (or not) :smile: 

* time spent writing good automated tests is rarely wasted - they are your saviour when you revisit code that you last looked at months previously and try to understand what that "cowboy builder" (your past self) did exactly!

* if we have undeployed code hanging around for months it can be really hard to restart that feature quickly without errors
constant interruptions and reprioritisations are a part of life so there is always a risk we won't finish a feature in one go

* we need to think more about how we break functionality up into smaller chunks that have value in their own right - anything that needs more than 3-5 days work before something can be released is too big

* we need to consider some of the lessons from [Trunk-Based Development](https://trunkbaseddevelopment.com/) - releasing new code into production but using things like feature-flags to disable it until it is ready - that way it should always be possible to pivot development to a new feature
