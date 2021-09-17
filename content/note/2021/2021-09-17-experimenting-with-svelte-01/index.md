---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Experimenting With Svelte - episode 1"
slug: "experimenting-with-svelte-ep01"
subtitle: "Getting a basic site running locally"
summary: "Getting a basic site running locally"
authors: ["synesthesia"]
categories: []
tags: ["code", "learning-in-public"]
lastmod: 2021-09-17T09:10:01+01:00
date: 2021-09-17T09:10:01+01:00
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
projects: ["svelte"]
---
## Introduction

This is part of a series of notes documenting some experiments with the Svelte and SvelteKit code stack. To see a full list of posts in this series visit the [project link]({{< relref "/project/svelte">}})

## Getting going

In the [previous note]({{< relref "../2021-09-17-experimenting-with-svelte-00" >}}) I explained why I wanted to experiment with  Svelte and SvelteKit.

As is the case with most frameworks these days, SvelteKit offers a simplified CLI setup of a basic project, so my first experiment is to get this working locally.

Following [the instructions](https://kit.svelte.dev/docs#introduction-getting-started), I opened up my WSL2 Ubuntu distro, created a new directory for these epxeriments, and typed:

```shell
npm init svelte@next experiment01
```

During the setup it asks you if you want to use Typescript, ESLint and Prettier - I said yes to all of these.

Then I ran these commands:

```bash
cd experiment01
npm install
npm run dev -- --open
```

## A hiccough

On the first run the build failed with this error message:

```bash
(node:9397) UnhandledPromiseRejectionWarning: file:///home/julian/source/web/svelte-kit-experiments/experiment01/node_modules/@sveltejs/vite-plugin-svelte/dist/index.js:257
import { createMakeHot } from "svelte-hmr";
         ^^^^^^^^^^^^^
SyntaxError: The requested module 'svelte-hmr' is expected to be of type CommonJS, which does not support named exports. CommonJS modules can be imported by importing the default export.
For example:
import pkg from 'svelte-hmr';
const { createMakeHot } = pkg;
```

A bit of Googling [suggested](https://github.com/sveltejs/vite-plugin-svelte/issues/61#issuecomment-863850353) that the fix was to update node. Turned out I was running node v12, so a quick `nvm install 14.17.6` got things working again.

This time on running `npm run dev -- --open` my web browser opened to diplay a simple test site running locally.

![](svelte-demo-page-1.png)

{{% callout note %}}
A note on tooling. Throughout this series of experiments I will be using Visual Studio Code to edit files, together with the [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) extension.
{{% /callout %}}

## Code on GitHub

As I work through these epxeriments I will share the code into [this repo](https://github.com/synesthesia/svelte-kit-experiments) on GitHub. The code for this first experiment is in the sub-folder [`/experiment01`](https://github.com/synesthesia/svelte-kit-experiments/tree/main/experiment01).

## Next steps

In the next experiment I will explore the code underneath each of the three pages in the sample app.

