---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Experimenting With Svelte - Why?"
slug: "experimenting-with-svelte-ep00"
subtitle: ""
summary: "Why I want to explore this new-ish web framework"
authors: ["synesthesia"]
categories: []
tags: ["code", "learning-in-public"]
lastmod: 2021-09-17T09:00:00+01:00
date: 2021-09-17T09:00:00+01:00
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

## What is Svelte?

Svelte 3 was released in 2019, and claims to be ["a radical new approach to building user interfaces"](https://svelte.dev/). In the launch [post](https://svelte.dev/blog/svelte-3-rethinking-reactivity) [Rich Harris](https://twitter.com/Rich_Harris) explains: 

>Svelte is a component framework — like React or Vue — but with an important difference. Traditional frameworks allow you to write declarative state-driven code, but there's a penalty: the browser must do extra work to convert those declarative structures into DOM operations, using techniques like [virtual DOM diffing](https://svelte.dev/blog/virtual-dom-is-pure-overhead) that eat into your frame budget and tax the garbage collector.
>
>Instead, Svelte runs at build time, converting your components into highly efficient imperative code that surgically updates the DOM. As a result, you're able to write ambitious applications with excellent performance characteristics.

In other words, it's a compiler that outputs vanilla Javascript

## And Svelte Kit?

In the real world a purely front-end framework only goes so far. Most apps need to authenticate users and pull data from APIs, and increasingly the most secure way of doing this is seen as the [backend-for-frontend (BFF) pattern](https://samnewman.io/patterns/architectural/bff/), in other words hosting the backend APIs on the same domain as the frontend app.

Although this has always been possible, historically the back-end was often written in a different language from the front-end, and sometimes in a seperate (but related) project.

There's often an advantage in having a single language for front- and back-ends, especially if the same person or team is developing them. One approach is Microsoft's inclusion of [Blazor](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor) in ASP.Net, allowing C# code to be compiled to WebAssembly. In the Javascript world, specifically for teams using the React framework on the front-end, [Next.js](https://nextjs.org/) offers the abililty to build front- and back-end  in a single project, with clever build technology separating the output packages appropriately. Add-in dedicated hosting like [Vercel](https://vercel.com/home) and single-click deployment of a front-end served fro the edge together with serverless functions to implement the back-end becomes a reality.

The equivalent of Next.js for Svelte is [Svelte Kit](https://kit.svelte.dev/docs), which in turn is a reevelopment of the team's earlier application framework [Sapper](https://sapper.svelte.dev/docs).

To quote from the [Svelte Kit docs](https://kit.svelte.dev/docs#introduction-what-is-sveltekit):

>SvelteKit is a framework for building extremely high-performance web apps. Building an app with all the modern best practices is fiendishly complicated. Those practices include [build optimizations](https://vitejs.dev/guide/features.html#build-optimizations)), so that you load only the minimal required code; [offline support](https://kit.svelte.dev/docs#service-workers); [prefetching](https://kit.svelte.dev/docs#anchor-options-sveltekit-prefetch) pages before the user initiates navigation; and [configurable rendering](https://kit.svelte.dev/docs#ssr-and-javascript) that allows you to generate HTML [on the server](https://kit.svelte.dev/docs#ssr-and-javascript-ssr) or [in the browser](https://kit.svelte.dev/docs#ssr-and-javascript-router) at runtime or [at build-time](https://kit.svelte.dev/docs#ssr-and-javascript-prerender). SvelteKit does all the boring stuff for you so that you can get on with the creative part.
>
>And SvelteKit does this all while providing a lightning-fast development experience where changes to your code show up in your browser automatically. We do this by leveraging [Vite](https://vitejs.dev/) with a [Svelte plugin](https://github.com/sveltejs/vite-plugin-svelte), so that [updates are instant and precise without reloading the page or blowing away application state](https://vitejs.dev/guide/features.html#hot-module-replacement).

In terms of hosting, the approach in Svelte Kit is to provide [adapters](https://kit.svelte.dev/docs#adapters) which hook into the build process and modify the output to work on different hosts, such as [Netlify](https://github.com/sveltejs/kit/tree/master/packages/adapter-netlify),  [Vercel](https://github.com/sveltejs/kit/tree/master/packages/adapter-vercel), or even for purely [static files](https://github.com/sveltejs/kit/tree/master/packages/adapter-static).

## What do I want to find out?

Firstly I want to see if the promises of development speed and simplicty of code are reflected in reality.

Then I want to explore adding some key common features, such as:

- mixing static, server-side rendered and client-side rendered content in an app
- adding APIs
- deploying to serverless hosts
- adding authentication against external identity sources
- managing authorization

The [code from the experiments is on Github](https://github.com/synesthesia/svelte-kit-experiments).
