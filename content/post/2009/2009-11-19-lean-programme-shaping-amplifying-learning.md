---
title: Lean Programme Shaping – Amplifying Learning
authors: ["synesthesia"]
type: post
date: 2009-11-19T11:30:09+00:00
lastmod: 2019-07-15T08:33:00+00:00
excerpt: This is the fifth post in a series of thought experiments on applying Lean/Agile principles to the early shaping stages of a programme.
slug: lean-programme-shaping-amplifying-learning 
aliases: ["/2009/11/19/lean-programme-shaping-amplifying-learning"]
tags: ["PPPM"]

---
This is the fifth post in a series of thought experiments on [applying Lean/Agile principles to the early shaping stages of a programme](/2009/10/25/agile-programme-shaping-first-thoughts/).

In  [previous](/2009/11/03/lean-programme-shaping-finding-the-value-stream/) [posts](/2009/11/05/lean-programme-shaping-more-on-flow/) I have talked about the application of the ideas of flow and a value stream to programme shaping, and touched on sources of "[waste](/2009/11/05/lean-programme-shaping-exploring-waste/)" in the typical programme environment.

Again borrowing heavily from the [Poppendiecks](https://www.poppendieck.com/) for my conceptual structure, I want to think about learning in our context, and how we can make it work better.

**Programme Shaping as a Learning Process**

What are we learning about during programme shaping? A few thoughts:

  * Stakeholder expectations and perceptions;
  * The shape of the perceived problem, the nature of the programme objectives, the expected benefits and how they relate to each other;
  * The enablers and business changes that will support the benefits;
  * Increasing amounts of detail and quantification around benefits, costs, risks;
  * Alternative solution approaches and trade-offs;
  * The quality criteria that will be imposed at decision gates, and/or that we may determine for ourselves;

As we learn more about these areas we progressively build and refine our product - the design of the programme as a system.

This sort of learning process can be likened to the Deming [Plan-Do-Check-Act](https://en.wikipedia.org/wiki/PDCA) cycle (PDCA).

<p style="text-align: center;">
  <img class="size-full wp-image-1493 aligncenter" title="PDCA-Cycle-400" src="https://upload.wikimedia.org/wikipedia/commons/7/7a/PDCA_Cycle.svg" alt="PDCA Cycle" width="400" height="275" />
</p>

So our question becomes "how do we iterate the learning cycle faster during programme shaping?". Drawing on the agile software approach, I suggest the following themes:

**Iterating Faster**

If we are going to learn faster about what shape of programme is most likely to be acceptable and successful, we need to increase the speed with which we plan, develop and review our growing programme design. Translating good practice from the agile and lean engineering movements we get the following points:

  * Break the programme design work down into small deliverables;
  * Clarify the stakeholder requirements for each deliverable  - what will good look like?;
  * Build quality in explicitly;
  * Actively constrain the number of deliverables started at any one time;
  * Frequent feedback from stakeholders. Look at physical proximity (e.g. where the team sits), access to diaries, collaboration technology.

**Build Shared Understanding**

A central challenge to effective consensus building comes from the intangible nature of the concepts under discussion and the relationships between those concepts. Approaches that offer visual modelling to support rapid understanding of conceptual relationships, supported by the right blend of numerical and textual "backing information"  to support deeper understanding and analysis are helpful here.

In my experience a visual meta-model of the programme shaping artifacts is also a useful tool to clarify the dependencies between different outputs.

**Simplify Programme Documentation**

Published methodologies such as [MSP](https://www.ogc.gov.uk/delivery_lifecycle_overview_of_managing_successful_programmes_msp_.asp) are often (or are often interpreted as) document heavy. The work to synchronise work products expands exponentially with the number of separate but inter-dependent documents. Following the lead of others (sorry no references to hand) I find it helpful to think of different programme documents as merely different views into the programme model.

In the ideal case this will be literally true, with the model held in a [central computerised repository](https://www.changedirector.com/Solutions) that can create the necessary views. However many programmes will not have that luxury, and are faced with maintaining a set of separate documents. In that situation I have found the following ideas useful:

  * Actively simplify the document set, don't just produce every document that is listed in your favourite (or mandated) methodology). For each document ask yourself what question that document answers, or what decision it supports. If you can't answer, then you may well not need it. Adopting this approach successfully may require active engagement with, and influencing of, the "quality police" -  PMO, Internal Audit etc.
  * Model the documentation set to clarify dependencies between documents. The systems design principles of high coherence within a document and low coupling between documents are a good guide. If all you have is Visio, then that's better than nothing, but I've found that a [UML modelling tool](https://www.sparxsystems.com.au/) can be very useful in this regard.
  * If possible, automate production of documents from a common source. For example, with the right modelling tool it may be possible to auto-generate some documents, moving a step towards the nirvana of an all-encompassing data repository.
  * Use a version control system to track document history and tag consistent sets of documents. My personal preference is [Subversion](https://subversion.tigris.org/), as it is free, available on several platforms, well-known, and supported by a number of tools.

**Synchronise Work Frequently**

In the initial stages of programme shaping there may only be one or two people involved, so keeping the work in sync is often "just" the problem of keeping the document set consistent. Once more than a couple of people are working on the idea then it becomes increasingly possible for the work to diverge, increasing the risk of re-work being needed. Until someone invents automated integration tests for programme documents :-) we are faced with using the design of our shaping process to keep the work on track.

  * Faster iterations, changing relatively small parts of the concept at each pass, are the first step;
  * Keeping documentation as simple as possible, with well-designed and understood inter-dependencies between documents;
  * Taking a [set-based](https://sloanreview.mit.edu/the-magazine/articles/1999/winter/4025/toyotas-principles-of-setbased-concurrent-engineering/) approach to solution design. For example if you had a team working on high-level technology decisions for the enabling projects working alongside another team looking at organisational decisions, encourage each to maintain a set of options in their design. As the programme shape firms up, each team can narrow their options.

I'd be interested in dialogue to sharpen these ideas, do please comment below!

(Image credit: [Karn G. Bulsuk](https://karnbulsuk.blogspot.com/))

<ins datetime="2019-07-15">(2019-07-15) Fix links</ins>

