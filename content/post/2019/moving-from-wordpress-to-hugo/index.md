---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Moving From Wordpress to Hugo"
subtitle: ""
summary: ""
authors: []
tags: []
categories: []
date: 2019-06-09T12:32:09+01:00
lastmod: 2019-06-09T12:32:09+01:00
featured: false
draft: true

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

find . -name "*.md" -exec sed -i 's|syn_worknote|note|g' {} \;
