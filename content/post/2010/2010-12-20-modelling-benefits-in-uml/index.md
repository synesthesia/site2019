---
title: Modelling Benefits in UML
authors: ["synesthesia"]
type: post
date: 2010-12-20T14:14:33+00:00
lastmod: 2019-07-15T10:00:00+00:00
slug: modelling-benefits-in-uml
aliases: ["/2010/12/20/modelling-benefits-in-uml/"]
tags: ["UML", "Benefits Realisation Management"]
projects: ["ea-uml-addons"]
---
[Benefits Realisation Management][1] is one of those classic programme / project disciplines that "everyone" agrees is a great idea, which in my experience is more overlooked than observed.

The main sources in the literature I’m aware of are books by [Bradley][2] and [Ward & Daniels][3]. I’ve also had the privilege of learning directly from [Gerald Bradley][4], so my own approach is very much influenced by his work.

A key tool is the use of visual maps, both interactively with stakeholders to discover benefits, and then as a way of presenting and communicating the complex causal links between an IT investment and the benefits it allegedly supports.

Interactive mapping works best with tactile materials – Post-It notes, sticky card etc. But for analysis and presentation some kind of tool is needed – drawing tools may work for smaller maps, but it very quickly becomes impractical, and something model-based is required.

[Specialised tools][5] are available, but they are just that, specialised tools: a good investment perhaps, but nevertheless a substantial outlay. The lack of affordable tools might, I suggest, be a block to wider adoption of these methods.

I’ve blogged before about using [general purpose UML modelling tools to help programme shaping][6], so it was natural that I looked at extending this approach to benefits mapping.

An example benefits map using the UML approach is shown here, produced using [Sparx Enterprise Architect][7]:

{{< figure src="example-uml-benefits-map.png" title="Example Benefits Model in UML" numbered="true" >}}

I have created a [UML Profile][9] (which I will write more about later), which extends the Requirement metaclass provided in Enterprise Architect by stereotyping to create the five core Benefits Realisation Management objects:

| Element | Description |
|------|----------------|
| Objectives | Why are we doing this? |
| Benefits | A measurable indicator of a change which is perceived as positive by at least one stakeholder group |
| Disbenefits | A measurable indicator of a change which is perceived as negative by at least one stakeholder group |
| Business Changes | Any change in the way a business operates, for example in terms of resourcing, behaviours, skills, processes etc. |
| Enablers | Typically something that can be built or bought|

Readers familiar with Benefits maps will have spotted something different about the arrows. Most graphical presentations use an arrow from the precursor enabler, change  or benefit to the subsequent change, benefit or objective.

Unfortunately this is not UML compliant, so  I have chosen to model using UML dependency and realisation relationships:

| Relationship | Meaning |
|----|----|
| {{< figure src="dependency.png" >}} |  This objective or benefit depends on that benefit |
| {{< figure src="realization.png" >}} | This change or enabler implements that change or benefit |


Using the language constructs in this way means that it is possible to use the traceability features within the tool to identify all the chains of dependencies.

Later posts will cover the development of the UML Profile, including the addition of attributes to the benefits and the modelling of measures.

I’m in the middle of a review cycle with a group of stakeholders who are used to talking about project benefits, but who perhaps have not used visual maps before – I shall blog how it goes!

What approaches have you used to document project benefits in a graphical format? Please leave a comment…

 [1]: http://www.pmis.co.uk/benefits_realisation.htm
 [2]: http://www.amazon.co.uk/gp/product/1409400948?ie=UTF8&tag=fivegocrazyinmid&linkCode=as2&camp=1634&creative=19450&creativeASIN=1409400948
 [3]: http://www.amazon.co.uk/gp/product/047009463X?ie=UTF8&tag=fivegocrazyinmid&linkCode=as2&camp=1634&creative=19450&creativeASIN=047009463X
 [4]: http://www.sigma-uk.com/about/history.html
 [5]: http://www.changedirector.com/Solutions/Benefits-%20Management
 [6]: /2009/12/14/lean-programme-shaping-models/
 [7]: http://www.sparxsystems.com/
 [9]: http://www.uml-diagrams.org/profile-diagrams.html#profile
 [10]: https://www.synesthesia.co.uk/blog/wp-content/uploads/2010/12/simple-ben-map.gif
