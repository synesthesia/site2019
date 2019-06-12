---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Setting up Hugo locally and choosing a theme"
slug: moving-wp-to-hugo-02
subtitle: "Part 2 of Moving from WordPress to Hugo"
summary: ""
authors: []
tags: ["wordpress","hugo", "static site generators"]
categories: ["Technology"]
date: 2019-06-12T08:00:00+01:00
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

Part 2 of [Moving from WordPress to Hugo]({{< ref "/project/wp-to-hugo/index.md" >}})
<!--more-->
## Setting up Hugo

Very little to add to the [official instructions](https://gohugo.io/getting-started/installing/)

I use a Windows laptop, so at first I tried the [Chocolatey installation](https://gohugo.io/getting-started/installing/#chocolatey-windows), however this only installs standard Hugo. The [theme I chose](#choosing-a-theme) requires the extended version of Hugo, so I uninstalled the Chocolatey build and re-installed as a [direct download](https://github.com/gohugoio/hugo/releases).

Add the install directory to the path environment variable, reboot, and you're ready to go.

## Choosing a theme

A quick browse around the Hugo [templates](https://gohugo.io/templates/) and [theme creation](https://gohugo.io/themes/creating/) documentation convinced me that if I started trying to write a theme from scratch it would extend this project significantly. 

Luckily there's a [large choice of community themes](https://themes.gohugo.io/) already available for Hugo. After bit of clicking around, and trying a couple locally, I decided to go for the [Academic](https://sourcethemes.com/academic/) theme from [George Cushen](https://georgecushen.com/) because it seemed to be both full-featured yet very flexible.

Again, there are [excellent installation instructions](https://sourcethemes.com/academic/docs/install/) for the theme and the provided [kickstart](https://github.com/sourcethemes/academic-kickstart) site so I won't document the detail here.

The initial configuration tasks were [based on the instructions](https://sourcethemes.com/academic/docs/get-started/#customize-it):

1. Edit the files in `/config`
2. Edit the `/content/home/about.md` page
3. Edit the `/content/authors` settings
4. Create some test content
5. Copy the contents of `/themes/academic/archetypes` to `/archetypes` <br />
  (didn't see this one in the instructions but without it the archetypes don't get picked up on `hugo new -kind post post/mypost`) 

Then 
```shell
hugo server -D
```

and check the site at http://localhost:1313
