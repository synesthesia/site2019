---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Working with this Hugo site in GitHub Codespaces"
subtitle: ""
summary: "Development Containers work well with WSL2 and GitHub Codespaces, found problems from Windows"
slug: "working-with-this-hugo-site-in-github-codespaces"
authors: ["synesthesia"]
categories: []
tags: ["TIL", "devcontainers", "codespaces", "Hugo", "SSG", "100DaysToOffload"]
lastmod: 2023-06-28T05:43:35+01:00
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
I wanted to learn a bit more about using devcontainers and GitHub CodeSpaces, and thought the code/content repo for this site would be a good place to start.

## Development Containers

The [Development Containers](https://containers.dev/) spec was originally started by Microsoft to provided a simple experience to edit codes in predictable containerised development environments from Visual Studio Code via the [Visual Studio Code Dev Containers extension](https://code.visualstudio.com/docs/devcontainers/containers).

Amongst the benefits are:

- predictable development environment
- easy to setup new developers
- easy way to cross-target, for example edit a .Net application on a windows machine (with Docker and WSL2) that will target a Linux environment.

When running on a Windows host, the tooling takes advantage of WSL2 and Docker for Windows to run the environment in Linux-based containers. Windows-based containers are not supported. 

However many web development tools work best in a Linux environment, so this potentially allows the author to stay in their familiar Windows filesystem whilst taking advantage of the Linux services in WSL2.

I started with the [community-contributed Hugo devcontainer](https://github.com/microsoft/vscode-dev-containers/tree/main/containers/hugo) config, and made the following changes:

- change the Hugo variant to `hugo_extended` - needed by the SASS elements in the site third-party theme
- change the Node version to `18`
- added a feature to include Go in the build - needed because the theme is included via a module
- extended the VS Code extensions list I wanted

The final version is shown at the end of this post.

I tried two configurations locally, running on a Windows 11 laptop with WSL2 and Docker for Windows configured:

### From Windows filesystem

In this scenario the VS Code IDE is running in Windows connecting to a remote container in WSL2.

**TL;DR** - At first it seemed that everything started correctly, but when I tried to edit the files in the container only the top-level of the source directory was visible. The file name of files in sub-directories were visible but the file content could not be accessed. 

A further problem showed itself when I updated the `devcontainer.json` file to automatically run `npm install`, this failed at the point of trying to create the `node_modules` folder.

Given these symptoms my working assumption is that this is to do with a mismatch between windows permissions model / user ids and the container, but I haven't had time to investigate further.

### From WSL2 filesystem

I normally edit this repo in Ubuntu on WSL2 using the [VS Code WSL extension](https://code.visualstudio.com/docs/remote/wsl) that allows an IDE running in Windows to edit files in WSL2. (This is completely invisible to the user, you just type `code .` in your WSL directory at the bash prompt.)

There is still a use case for development containers WSL2 - WSL2 as this allows the development environment to be predictable for that project, regardless of what changes you may have made to your WSL2 setup.

In simple terms, this "just worked".

## Github Codespaces

[Github codespaces](https://github.com/features/codespaces) are a feature which provides Github users with a cloud-based on-demand development environment for their repositories. It supports remote development from a local IDE but for many the key benefit is the provision of a web-based version of Visual Studio Code. This allows remote development using only a browser.

There is plenty of [documentation on how to set this up](https://docs.github.com/en/codespaces/getting-started/quickstart), and it all worked as it says, or at least until I tried to run a development build of the site with `hugo serve -D`, which I found would randomly crash.

I had a vague feeling this might be to do with memory (I had heard that `hugo serve` could be memory-hungry) so re-ran the command with the `--printMemoryUsage` flag. Sure enough it peaked just below the maximum memory of the VM (default codespace VM is 2 cores / 8GB RAM) before it fell over. To increase the RAM available you need to jump up to 8 cores / 16GB RAM, and at this configuration the command worked, with a maximum allocation on this site of 8.6GB.

Although this size of machine does eat up the compute allotment, even on the free tier you get 120/8 = 15 hours per month. I already pay for a Github Pro subscription, so within that $4 price you get 180/8 = 22.5 hours per month. For the few times I need to edit the blog in a browser this seems a very reasonable compromise.

## Final version of the configuration

{{< gist synesthesia ff13d3d46016b31f4dbf594c693e4096  >}}
