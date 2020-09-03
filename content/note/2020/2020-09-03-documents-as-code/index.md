---
type: note
slug: "documents-as-code"
featured: false
draft: false
title: "Documents as Code"
subtitle: 
summary: "Managing documentation using code tools"
authors: ["synesthesia"]
categories: ["notes"]
tags: ["docsascode","antora"]
projects: ["antora"]
date: 2020-09-03T07:00:00+01:00
---

##  The problem

Technical documentation is often seen as a problem. Everyone needs it, everyone complains if it isn't there, no-one wants to write it.

The problem escalates when you rely on more than one application, a truism in corporate life. Not only do you need documentation about applications, but even if you only use software produced by other people, you still need documentation about how those applications interact in your unique setup.

Add the challenge of different audiences (e.g. technical staff, internal users, external users) and the chances of ending up with a [hydra](https://en.m.wikipedia.org/wiki/Lernaean_Hydra) are near to certain.

## Managing the beast

Historically there has been a huge market in specialist tools to support documentation requirements, inevitably in themselves often vastly complex (and expensive) applications.

Whilst there will always be specialist domains such as aerospace where complex applications are needed to manage the version control and auditability requirements, in many places such things are overkill.

## Documents as Code

Over the last decade a movement has been growing alongside the changes in software development that promotes the concept of treating [Documents as Code](https://www.writethedocs.org/guide/docs-as-code/):

- write document source using simple text editors, with markup (such as [Markdown](https://en.wikipedia.org/wiki/Markdown), [reStructuredText](https://docutils.sourceforge.io/rst.html), or [AsciiDoc](https://asciidoctor.org/docs/what-is-asciidoc/)) to create formatting
- store documents in version control systems, often alongside the application code they refer to
- make use of the tools and workflows for distributed team working built in to distributed version control
- automated build of documentation output (e.g. websites, PDF LaTex
- automated testing of documentation builds

The benefits of this approach include:

- cheap or free tooling
- support for distributed working 
- potential to split authoring from publishing: enables subject matter experts to easily write about what they know whilst isolating them from the bits of process that need publishing expertise
- encourages developers to write about the features they are building 

## Introducing Antora

One of the many tools that has emerged in this space is [Antora](https://antora.org). Antora is aimed squarely at the production of technical documentation websites with the following features:

- source documents written in [AsciiDoc](https://asciidoctor.org/docs/what-is-asciidoc/)
- integrates with multiple Git repositories
- support for versioning and branching
- generates a static website bundle that can be deployed anywhere using standard techniques

Later posts  will explain the key points.
