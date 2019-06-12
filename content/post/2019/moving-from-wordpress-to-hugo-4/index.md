---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Cleaning up content for Hugo version of site"
slug: moving-wp-to-hugo-04
subtitle: "Part 4 of Moving from WordPress to Hugo"
summary: ""
authors: ["synesthesia"]
tags: ["wordpress","hugo", "static site generators"]
categories: ["Technology"]
date: 2019-06-12T08:20:00+01:00
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
Part 4 of [Moving from WordPress to Hugo]({{< ref "/project/wp-to-hugo/index.md" >}})
<!--more-->

## Adding the unmodified content to Hugo site
Adopting the export process documented in [part 3]({{< ref "/post/2019/moving-from-wordpress-to-hugo-3/index.md" >}}) yielded an exported data structure with all of the exported posts (of all types) in one folder.

I copied the contents of this folder into `/content/post` folder and ran `hugo server -D`.

There were a few (<1%) errors due to malformed YAML in front matter where the posts had been imported to WrodPress from an external RSS feed, but after correcting those the site built correctly (but with wrong metadata on posts).

## Examining the exported WordPress data
The front matter in the exported content varied depending on data type:

**Posts**

```yaml
---
title: Only Humans
author: Julian
type: post
date: 2017-02-13T12:28:57+00:00
url: /2017/02/13/only-humans/

---
```

**Notes (custom type *syn_worknote*)**

```yaml
---
title: Interesting uses of Linux “find” command
author: Julian
type: syn_worknote
date: 2019-05-31T08:36:37+00:00
url: /worknotes/interesting-uses-of-linux-find-command/

---
```

## Goals of content cleanup

* reinstate the split between normal posts and working notes <br/>
  (because I use them for different things)
  * change the type of working notes to `note`
  * selectively move the notes to the correct Hugo folder `/content/post/`
* change the author tag to match the [Academic theme](https://sourcethemes.com/academic/docs/managing-content/#introduction) and the author I had set up on the new site
* change the hard-coded urls to aliases (so I can put a new url scheme on this site but still serve requests to the old URLS )
* extract the last part of the hard-coded url into post slug to give me more flexibility in devising the url scheme for this site

### Tools
Although I work on a Windows machine locally, I did this work using the Git bash shell to give me access to unix text and file manipulation.

All commands run from inside the `/content` directory unless otherwise noted.

### Reinstate the split between normal posts and working notes

```shell
find . -name "*.md" -exec sed -i 's|syn_worknote|note|g' {} \;
grep -iRl "type: note" ./post | while read f; do mv "$f" note; done
```

### Change author tags

```shell
find . -name "*.md" -exec sed -i 's|author: Julian|authors: [\"synesthesia\"]|g' {} \; 
```
### Remove url tag, create slug and aliases
**Posts**

```shell
find ./post -type f -exec sed  -i -E  -e "s/url: \/([[:digit:]]*\/[[:digit:]]*\/[[:digit:]]*\/)([a-zA-Z0-9\-]*)/slug: \2 \naliases: [\"\/\1\2\"]" {} \;
find ./post -type f -exec sed  -i -E  -e "s/]\//]" {} \; 
```

**Notes**
```shell
find ./note -type f -exec sed  -i -E  -e "s/url: (\/worknotes\/)([a-zA-Z0-9\-]*)/slug: \2 \naliases: [\"\1\2\"]/" {} \; 
find ./note -type f -exec sed  -i -E  -e "s/]\//]/" {} \; 
```
### Example metadata after changes

**Posts**
```yaml
---
title: Only Humans
authors: ["synesthesia"]
type: post
date: 2017-02-13T12:28:57+00:00
slug: only-humans 
aliases: ["/2017/02/13/only-humans"]
---
```

**Notes**
```yaml
---
title: Interesting uses of Linux "find" command
authors: ["synesthesia"]
type: note
date: 2019-05-31T08:36:37+00:00
slug: interesting-uses-of-linux-find-command 
aliases: ["/worknotes/interesting-uses-of-linux-find-command"]
---
```

## Setup new permalink structure

To create the desired permalink structure, edit `/config/_default/config.toml`:

```TOML
[permalinks]
  post = "/:year/:month/:day/:slug/"
  note = "/note/:year/:month/:day/:slug/"
```

