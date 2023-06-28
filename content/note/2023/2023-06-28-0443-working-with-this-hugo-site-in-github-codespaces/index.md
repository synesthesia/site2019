---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Working with this Hugo site in GitHub codespaces"
subtitle: ""
summary: ""
slug: "working-with-this-hugo-site-in-github-codespaces"
authors: ["synesthesia"]
categories: []
tags: ["TIL", "devcontainers", "codespaces", "100DaysToOffload"]
lastmod: 2023-06-28T05:43:35+01:00
featured: false
draft: true
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
I wanted to learn a bit more about using devcontainers and GitHub CodeSpaces, and thought the code/content repo for this site would be a good place to start.

## Development Containers

The [Development Containers](https://containers.dev/) spec was originally started by Microsoft to provided a simple experience to edit codes in predictable containerised development environments from Visual Studio Code via the [Visual Studio Code Dev Containers extension](https://code.visualstudio.com/docs/devcontainers/containers).

Amongst the benefits are:

- predictable development environment
- easy to setup new developers
- easy way to cross-target, for example edit a .Net applicaiton on a windows machine (with Docker and WSL2) that will target a linux environment.

When running on a Windows host, the tooling takes advantage of WSL2 and Docker for Windows to run the environment in Linux-based containers. Windows-based containers are not supported. However many web development tools work best in a linux environment, so this potentially allows the author to stay in their familiar Windows filesystem whilst taking advantage of the Linux services in WSL2.

I started with the [community-contributed Hugo devcontainer](https://github.com/microsoft/vscode-dev-containers/tree/main/containers/hugo) config, and made the following changes:

- change the Hugo variant to `hugo_extended` - needed by the SASS elements in the site third-party theme
- change the Node version to `18`
- added a feature to include Go in the build - needed because the theme is included via a module

The final version is shown at the end of this post.

I tried two configurations locally, running on a Windows 11 laptop with WSL2 and Docker for Windows configured:

### From Windows filesystem

In this scenario the VS Code IDE is running in Windows connecting to a remote container in WSL2.

**TL;DR** - everything starts correctly, but when you seek to edit the files in the container only the top-level of the source directory is visible. The file name of files in sub-directories are visible but the file content cannot be accessed. My assumption is that this is to do with a mismatch between wiondows permisisons model / user ids and the container, but I haven't had time to investiogate further.

### From WSL2 filesystem

I normally edit this repo in Ubuntu on WSL2 using the [VS Code WSL extension](https://code.visualstudio.com/docs/remote/wsl) that allows an IDE running in Windows to edit files in WSL2. (This is completely invisible to the user, you just type `code .` in your WSL directory at the bash prompt.)

There is still a use case for development containers WSL2 - WSL2 as this allows the development environment to be predictable for that project, regardless of what changes youi may have made to your WSL2 setup.



## Github Codespaces

[Github codespaces](https://github.com/features/codespaces) are a feature which provides Github users with a cloud-based on-demand development environment for their repositories. It supports remote development from a local IDE but for many the key benefit is the provision of a web-based version of Visual Studio Code. This allows remote development using only a browser.

## Final version of the configuration

{{< gist synesthesia ff13d3d46016b31f4dbf594c693e4096  >}}
