---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Webmentions revisited"
slug: "webmentions-revisited"
subtitle: ""
summary: ""
authors: ["synesthesia"]
categories: []
tags: []
lastmod: 2022-02-21T17:54:18Z
featured: false
draft: false
type: note

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
{{% callout note %}}
This is a very brief note for my own benefit - if you are even slightly interested I recommend following the links to find other authors who have done a much better job of explaining this!
{{% /callout %}}

I had previously displayed [WebMentions](https://indieweb.org/Webmention#History) on posts via a script that ran on each pageview, queried [webmention.io](https://webmention.io/) for mentions relevant to that page and rendered them - entriely based on the [original approach documented by Sebastian de Dyne](https://sebastiandedeyne.com/adding-webmentions-to-my-blog/).

In the most recent iteration of changes I have:

- adapted the processing of inbound webmentions so they are pulled periodically into data files in the repo by Github actions, then processed when the site is built so they are baked into the rendered static pages
- added a Netlify build plugin to push outgoing webmentions from my site to the sites I link to

## Processing inbound web mentions

Key elements:
- a Github action that runs every thirty minutes and calls a retrieval script
- the retrieval script which pulls webmentions from [webmention.io](https://webmention.io/) and stores them as data files in the source repo for the site
- a processing script that is run each time the site is built - this reads the raw webmentions and processes them into a form suitable for Hugo to digest
- changes to page layouts to render a webmentions section

For all of this I am indebted to [Rowan Manning's approach](https://rowanmanning.com/posts/webmentions-for-your-static-site/).

## Sending web mentions when the site is built

This is the other side of the coin. There are a range of approaches, but I decided to go with a Netlify build plugin [configured to only run on production builds](https://www.netlify.com/blog/2021/05/06/now-available-configure-build-plugins-by-deploy-context/).

All the examples I could find work by processing the RSS feed for the site, and most take the approach of posting webmentions for any remote sites linked from the last (or a configurable last number of) posts. This will fall down if you ever create more than one post in between publishes - rare but not impossible.

I then found the approach documented by [Mark Everitt](https://qubyte.codes/blog/dispatching-webmentions-with-a-netlify-build-plugin) which compares the RSS feed before and after the build and pushes webmentions for all new items, and have adapted [his code](https://github.com/qubyte/qubyte-codes/tree/main/plugins/dispatch-webmentions).


## Other things

~~_A note to myself - new functionality based on code developed by others, I need to spend some time to make the repo for this site openable, then make it public._~~
<ins>now done - [here](https://github.com/synesthesia/site2019)</ins>
