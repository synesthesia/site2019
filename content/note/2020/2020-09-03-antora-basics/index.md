---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Antora Basics"
subtitle: ""
summary: "Setting up a basic Antora process"
authors: ["synesthesia"]
categories: ["notes"]
tags: ["docsascode","antora"]
lastmod: 2020-09-03T08:33:20+01:00
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
projects: ["antora"]
---

{{% toc %}} 

## Context

One of the many tools that has emerged in the [documents as code]({{< relref "../2020-09-03-documents-as-code/index.md" >}}) space is [Antora](https://antora.org). Antora is aimed squarely at the production of technical documentation websites with the following features:

- source documents written in [AsciiDoc](https://asciidoctor.org/docs/what-is-asciidoc/)
- integrates with multiple Git repositories
- support for versioning and branching
- generates a static website bundle that can be deployed anywhere using standard techniques

## Install tools

1. Ensure you have [git](https://git-scm.com/) installed on your workstation
2. If you haven't previously created an SSH key for use with version control, [do so now](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
3. Create an account on [GitHub](https://github.com/join) (if you haven't already got one) and [add your SSH public key](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account )
4. Install the code editor of your choice, e.g. [Visual Studio Code](https://code.visualstudio.com/)
5. [Install Antora, run the quickstart](https://docs.antora.org/antora/2.3/install-and-run-quickstart/)

_NB all command line examples assume you are running in the Git Bash terminal_

## Planning out repositories

At a bare minimum an Antora-based site needs two code repositories set up[^1]:

* the publishing repository
* at least one content repository


### Publishing repository

The publishing repository (aka playbook project) contains configuration information for the entire set of documentation (it may also include code to publish the resulting site to a web server, that will be covered later).

At a minimum the playbook project contains an [Antora Playbook](https://docs.antora.org/antora/2.3/playbook/set-up-playbook/) file.

Example Antora Playbook

```yaml
site:
  title: My Demo Site
  url: https://docs.demo.com
  start_page: component-b::index.adoc
content:
  sources:
  - url: https://gitlab.com/antora/demo/demo-component-a.git
  - url: https://gitlab.com/antora/demo/demo-component-b.git
    branches: [v2.0, v1.0]
    start_path: docs
ui:
  bundle:
    url: https://gitlab.com/antora/antora-ui-default/-/jobs/artifacts/master/raw/build/ui-bundle.zip?job=bundle-stable
    snapshot: true
```

### Content repository

Each content repository must contain at least one content root.

A content root consists of a directory with a specific set of files and sub-directories, the minimum is:

```
contentroot/
           antora.yml
           modules/
                  ROOT/
                      nav.adoc
                      pages/
                           index.adoc
                 
```

The content of the minimum files are as follows:

#### Component Version Descriptor (antora.yml)

The [antora.yml](https://docs.antora.org/antora/2.3/component-version-descriptor/) file tells Antora that a directory contains a content root, and includes the required and optional component version metadata that Antora assigns to the source files it collects from the standard directories located in the modules folder.

Example antora.yml:

```yaml
name: docmetatech
title: Technical documentation overview
version: '1.0'
nav:
- modules/ROOT/nav.adoc
```

#### Navigation files

Each content root must contain one or more navigation files within the module directories. These are listed in the [navigation configuration](https://docs.antora.org/antora/2.3/component-navigation/) section of the **antora.yml** file

A navigation file is a simple Asciidoc file containing an unordered list of cross references to pages which should be linked from the navigation, for example:

```asciidoc
* xref:index.adoc[Introduction]
```

#### Page files

Page files are asciidoc files within the `pages` subdirectory of each module, for example

```asciidoc
= Introduction to our documentation

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

1. first
1. second

And another list

* blah
* blah

```

Other forms of content (e.g. images) can be added by adding them to other special directories within the content root - see [Standard File and Directory set](https://docs.antora.org/antora/2.3/standard-directories/).

## Building the site

Make sure you have committed some content in your content repository and pushed it up to the version control server (e.g. GitHub).

In the root of the playbook project run:

```bash
antora --fetch antora-playbook.yml
```

_( the --fetch parameter tells Antora to always fetch the latest version of the content repositories - slower but guarantees latest content )_

The resulting site should be generated in `./build/site`

The contents of that directory could be manually uploaded to a webserver to make visible (obviously in a real case we would set up some form of Continuous Delivery pipeline - see a later post).

[^1]: technically you could put document source _content roots_ in your publishing repository, in order to work with just one repository, but Antora advise against this in order to maintain a separation of concerns between authoring and publishing.
