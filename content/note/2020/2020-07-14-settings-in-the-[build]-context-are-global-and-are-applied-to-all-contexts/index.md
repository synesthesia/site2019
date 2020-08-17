---
type: note
slug: "2020-07-14-settings-in-the-[build]-context-are-global-and-are-applied-to-all-contexts"
featured: false
draft: true
title: "Settings in the [build] context are global and are applied to all contexts"
subtitle: 
summary: 
authors: ["synesthesia"]
categories: ["quick notes"]
tags: []
date: 2020-07-14T05:46:00+01:00
---

[build]
  # Directory to change to before starting a build.
  # This is where we will look for package.json/.nvmrc/etc.
  base = "_layouts/"

  # Directory that contains the deploy-ready HTML files and assets generated by
  # the build. This is relative to the base directory if one has been set, or the
  # root directory if a base has not been set.
 
  publish = "_layouts/public"

  # Default build command.
  command = "npm install && npm run build -- --prefix-paths"

  # by default Netlify ignores changes outside the root, we need to force it to build on any change

  ignore = "git diff --quiet HEAD^ HEAD"