---
# reply
title: "Reply to Ton Zijlstra 'The Enshittification of LinkedIn As DSA Takes Effect'"
subtitle: "I agree with @ton, LinkedIn has been getting shittier for years."
summary: ""
authors: ["synesthesia"]
tags: ["100DaysToOffload", "enshittification"]
categories: []
date: 2023-09-11T09:51:05+01:00
lastmod: 2023-09-11T09:51:05+01:00
featured: false
draft: false
type: reply
# Reply target
# ------------
in_reply_to: "https://www.zylstra.org/blog/2023/08/the-enshittification-of-linkedin-as-dsa-takes-effect/"
in_reply_to_title: "The Enshittification of LinkedIn As DSA Takes Effect"

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
## Same old, same old

I never post my updates on there, that's what this site and my Mastodon feed are for. If I really thought there was any value in it I would post links 'over there' to selected posts 'over here'.

When it first started, the idea of tracking your own professional network, and seeing "who knew whom" was something of a winner, but the inevitable swamping in "social" features, adverts, algorithmically-driven content and posts written by marketing people has made it pretty much useless, a source of irritating noise.

One of the less-than-lovely features is that every time you connect to someone, it automatically follows them in your feed, whereas I want to be selective in whose posts I follow.

I'm following the two main tips from Ton's post:

- bookmark the [network page](https://www.linkedin.com/mynetwork/invite-connect/connections/) as my main entry point into the platform
- unfollow all my connections

## Unfollowing connections

Potentially this means my feed is just the algo-babble, but then I plan not to read my feed.

Unfortunately the scripts [suggested by Ton](https://www.zylstra.org/blog/2021/09/emptied-my-linkedin-feed/) from [How to mass unfollow connections on LinkedIn in 2022](https://quadlayers.com/unfollow-connections-in-bulk-linkedin/) no longer work in September 2023 as the  HTML of the 
following and followers page has changed.

With a bit of hacking around I managed to get something of what I needed from this:

```javascript
(() => {
  let count = 0;
  function getAllButtons() {
    return document.querySelectorAll('[aria-label*="stop following"]');
  }
  async function unfollowAll() {
    const buttons = getAllButtons();

    for (let button of buttons) {
        count = count + 1;
        console.log(`Unfollow #${count}`);
        window.scrollTo(0, button.offsetTop - 260);
        button.click();
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  async function run() {
    await unfollowAll();
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const buttons = getAllButtons();
    if (buttons.length) run();
  }
  run();
})();

```

While running the script it does pop up random "are you sure" dialogues which still need a manual click, but for some reason not for every "click".

## The hardest challenge

Does this mean that I want social networks to work much like they did in 2005? Mostly yes.

The biggest challenge? Finding a way to explain the reasons for this to colleagues who still see any form of social network as yet one more one-way marketing medium. 

Oh well...
