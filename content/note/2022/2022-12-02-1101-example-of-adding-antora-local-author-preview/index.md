---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Example of adding Antora local author preview"
subtitle: ""
summary: ""
authors: ["synesthesia"]
categories: ["notes"]
tags: ["docsascode","antora"]
lastmod: 2022-12-02T11:01:03Z
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
url_code: https://github.com/synesthesia/doc-example
---
In [Antora Local Authoring]({{< relref "../../2020/2020-09-03-antora-local-authoring/index.md" >}}) I described how the [author mode](https://docs.antora.org/antora/latest/playbook/author-mode/) configuration could be used to manage your local copy of a documentation site.

[Where I work](/#section-experience) we have been running a couple of internal documentation sites for 2 years, the largest of which references nearly 30 source repositories. Although I drove the initial work I am always looking for ways to encourage colleagues to get involved with writing documentation, especially if they are contributing code changes to one of the systems or services that are documented.

One of the barriers has been the inability to easily preview documentation changes when in the context of a specific code repository. Since one of the goals of [#docsascode](/tag/docsascode/) is to manage the documentation for a feature as you write that feature this has been a major impediment.

The change I have started implementing from today is to add the minimum extra to each code repository to allow developers to run a local preview copy of the documentation.

- additional dev dependencies
- an additional documentation component to act as a local site entry point, with links to the other components
- an Antora local playbook
- a Gulp configuration to run antora agaisnt the local playbook and host a development server

Running the preview is as simple as:

- `npm install`
- `npx gulp`
- visit [http://localhost:5000](http://localhost:5000)

And the result looks like this:

{{< figure src="local-preview-build.png" title="Example repository running in author mode preview" lightbox="true" >}}

*(internally we insert our own branded Antora UI so that the preview looks more like the final result)*

The simplest example is in a [repository on Github](https://github.com/synesthesia/doc-example).
