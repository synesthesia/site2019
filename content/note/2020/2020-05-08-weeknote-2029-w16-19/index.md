---
type: note
slug: "2020-05-08-weeknote-2029-w16-19"
featured: false
draft: true
title: "Weeknote 2029 W16-19"
subtitle: 
summary: 
authors: ["synesthesia"]
categories: ["quick notes"]
tags: []
date: 2020-05-08T15:50:00+01:00
---

And then a whole month had gone without publishing a weeknote.

The lockdown phenomenon of days blending together, combined with deep focus to support colleagues in pivoting to online delivery.

We're starting to move beyond simple digital replacements of one-day seminars (even though they have been very successful), and have started building out a six week whole-school-staff CPD course into Moodle.

With a much reduced team, my time has been split between operational support to colleagues practising the mechanics of live seminars, configuring new resources in Moodle, minor software upkeep of a couple of applications (including merging new plugins and upstream changes into our Moodle build) and a bigger technical architecture project.

In parallel with the immediate tasks I have been thinking ahead to how we might expand platform capacity, and incorporate other tools alongside Moodle to broaden the online experience.

At a fundamental level this is about the basic building blocks of web servers, resilient file storage, database, load balancers. I want the build to be "infrastructure as code" for three reasons: 
1. to make it easier to adapt from one cloud to another 
2. once the design is proven I can tear down the resources until we need them.
3. to document the design

My only previous experience with infrastructure-as-code has been building out AzureRM templates. This challenge needs to be portable so I've had to learn two new tools:

- [Terraform](https://www.terraform.io) for building the infrastructure 
- [Ansible](https://www.ansible.com/resources/get-started) for deploying and configuring system and application software

Terraform is in general quite straightforward, although I did have to learn a few tricks to resync my state with the remote build after a couple of manual changes.

Ansible is clearly very powerful, and with that power there's quite a learning curve. Still it quite there with the full stack installation, and after that I want to get some common maintenance operations under playbook control.