---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Why Hugo?"
summary: "Part 1 of Moving from WordPress to Hugo"
slug: moving-wp-to-hugo-01
subtitle: ""
summary: ""
authors: ["synesthesia"]
tags: ["wordpress","hugo", "static site generators"]
categories: ["Technology"]
date: 2019-06-11T12:00:00+01:00
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
Part 1 of [Moving from WordPress to Hugo]({{< ref "/project/wp-to-hugo/index.md" >}})
<!--more-->
I've been lucky with my WordPress installations - only a couple of malware infections in 15+ years. But the last one was extremely painful to fix - after I had re-installed every file in the deployment I finally found that the attack had manged to rewrite every post in the database with a link to an adware injector script.

Half a day of personal time to rebuild a site that I don't want to close, but which hasn't had a lot of use in the last couple of years, is just too much: the time had come!

This is not a novel idea - quite a few people have blogged [^1] about moving off WordPress to static generators, especially Hugo.  

For me the key benefits are:

* much less vulnerable to malware
* lower hosting costs for a faster site
* simple text-editor creation of content
* content in Git (the code always has been)
* easy to keep multiple copies of content to avoid vendor lock-in
* Hugo is fast to generate the site, and very simple (single executable)
* free high-performance hosting from [Netlify](https://www.netlify.com/), [GitHubPages](https://pages.github.com/) and probably others

[^1]: These are some of the sources I found researching this:
    
    * [Switching from WordPress to Hugo - Smashing Magazine](https://www.smashingmagazine.com/2019/05/switch-wordpress-hugo/)
    * [I finally migrated my blog from WordPress to Hugo](https://julienrenaux.fr/2019/02/14/from-wordpress-to-hugo/)
    * [Migrating from WordPress to Hugo - GoMakeThings](https://gomakethings.com/migrating-from-wordpress-to-hugo/)
    * [Moving from Wordpress to Hugo - R&eacute;gis Philibert](https://regisphilibert.com/blog/2019/01/from-wordpress-to-hugo-a-mindset-transition/)
    * [Moving from Wordpress to Hugo - Philipp Hauer](https://phauer.com/2017/moving-wordpress-hugo/)
    * [WordPress to Static Site Generator (Hugo) Migration and Deployment - HackerNoon](https://hackernoon.com/wordpress-to-static-site-generator-hugo-migration-and-deployment-788a69b93e66)



