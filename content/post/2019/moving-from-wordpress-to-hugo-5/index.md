---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Hugo hosting and deployment"
slug: moving-wp-to-hugo-05
subtitle: "Part 5 of Moving from WordPress to Hugo"
summary: ""
authors: ["synesthesia"]
tags: ["wordpress","hugo", "static site generators"]
categories: ["Technology"]
date: 2019-06-12T08:30:00+01:00
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
Part 5 of [Moving from WordPress to Hugo]({{< ref "/project/wp-to-hugo/index.md" >}}) 
<!--more-->
Probably the easiest place to start hosting Hugo for free is [Netlify](https://www.netlify.com/)

Deployment is simply:
* create account on Netlify
* connect Github repo for the site definition
* press deploy

In part it is this easy because the Academic Kickstarter comes pre-configured with a `netlify.toml` file in the project root that contains the necessary configuration for Netlify. Once Netlify has read the repository the configuraiton values are read from this file

```TOML
[build]
  command = "hugo --gc --minify -b $URL"
  publish = "public"

[build.environment]
  HUGO_VERSION = "0.55.6"
  HUGO_ENABLEGITINFO = "true"

[context.production.environment]
  HUGO_ENV = "production"

[context.deploy-preview]
  command = "hugo --gc --minify --buildFuture -b $DEPLOY_PRIME_URL"

[context.branch-deploy]
  command = "hugo --gc --minify -b $DEPLOY_PRIME_URL"
```

Once I was happy the site was building and deploying I set the domain in Netlify to my proper domain, then edited the DNS settings on my DNS host to point to the new site.

After the usual wait for DNS to propagate, the site went live...


