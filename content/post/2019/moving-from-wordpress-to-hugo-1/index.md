---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Why Hugo?"
slug: moving-wp-to-hugo-01
subtitle: ""
summary: ""
authors: []
tags: []
categories: []
date: 2019-06-07T12:00:00+01:00
featured: false
draft: false

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
projects: ["wp-to-hugo"]
---

` find . -name "*.md" -exec sed -i 's|syn_worknote|note|g' {} \; `

` grep -iRl "type: note" ./post | while read f; do mv "$f" note; done `

 ` sed -E "s/url: \/([[:digit:]]*\/[[:digit:]]*\/[[:digit:]]*\/)([a-zA-Z0-9\-]*)/slug: \2 \naliases: [\"\/\1\2\"]" `

 ` find ./post -type f -exec sed  -i -E  -e "s/url: \/([[:digit:]]*\/[[:digit:]]*\/[[:digit:]]*\/)([a-zA-Z0-9\-]*)/slug: \2 \naliases: [\"\/\1\2\"]" {} \; `

 ` find ./post -type f -exec sed  -i -E  -e "s/]\//]" {} \; `

 url: /worknotes/removing-malicious-content-from-wordpress-posts/

 ` find ./note -type f -exec sed  -i -E  -e "s/url: (\/worknotes\/)([a-zA-Z0-9\-]*)/slug: \2 \naliases: [\"\1\2\"]/" {} \; `
 `  find ./note -type f -exec sed  -i -E  -e "s/]\//]/" {} \; `

slug: removing-malicious-content-from-wordpress-posts 
aliases: ["/worknotes/removing-malicious-content-from-wordpress-posts"]

` find . -name "*.md" -exec sed -i 's|author: Julian|authors: [\"synesthesia\"]|g' {} \; `



