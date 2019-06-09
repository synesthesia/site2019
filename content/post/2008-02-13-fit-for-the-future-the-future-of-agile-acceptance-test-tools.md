---
title: 'Fit for the Future: The future of Agile Acceptance Test Tools'
author: Julian
type: post
date: 2008-02-13T12:04:17+00:00
url: /2008/02/13/fit-for-the-future-the-future-of-agile-acceptance-test-tools/

---
I’m blogging the conference [Agile Approaches for Delivering Business Value][1]

**Fit for the Future: The future of Agile Acceptance Test Tools**

_[Antony Marcano][2], [testingReflections.com][3]_

  * The role of acceptance test tools in agile teams
  * Where have they come from; what are they; what is their future?
  * Report on the vision created during the Agile Alliance Functional Test Tools Visioning Workshop, which included Ward Cunningham, Brian Marick, Jim Shore, Elisabeth Hendrickson and the presenter, Antony Marcano.
  * Delegates will be encouraged to discuss these ideas and suggest some of their own.

**
  
** 
  
<!--more-->

Notes

Power of acceptance tests to drive out requirements as well as prove success.

ATDD – Acceptance Test Driven Development or Story Driven Development

Example from [Jason Gorman][4] – [Test-driven Kitchen Design][5] – should have designed based on examples of things that he wanted to to in the kitchen.

Get examples of how you are going to use first before thinking about what you need to enable it – then wrap those examples in the form of tests.

Target audience for tests is the customer/Product Owner, developers and tester: one of common problems with Test Driven Development is that often written in automated test tools which fall short of the customer-communication requirements

A commonly-used tool is FIT – others e.g. [Concordion][6]

How do you slice up the work – e.g. horizontally (by layers / components) or vertically (e.g. by feature) ? ATDD leads to a feature-based approach, growing the design with each iteration by incremental addition of capabilities.

Workshop report on workshop sponsored by Agile Alliance in Portland Oregon October 2007. _“to discuss cutting-edge advancements in, and envision possibilities for, the future of automated tools”_

Highlights:

Levels of abstraction at which tests are applied – [Kevin Lawrence][7] – Goals/Activities/Tasks – e.g. task level testing in [Selenium][8]. However activity-level testing much easier to maintain as the application changes. Next generation of tools should better support activity-level tests.

Vocabulary – many people using FIT in a standard way. e.g. Given (context), When (something happens), Then (expect something) – especially relevant if writing tests at Activity level.

Visualisation of Flow – e.g. seeing images of workflow for tests in that area. [Brian Marick][9] doing some work on before-the-fact workflow visualisation tools. [Alternative approach][10] by [Ward Cunningham][11] requires textual description of test flow, but when text can execute gives a visual view. Another tool – [CubicTest][12] – [Eclipse][13] plugin to capture workflow and make it easier to write [Watir][14] and [Selenium][8] tests.

Multiple Views – how about IDE presenting a “customer view” of test code that maps onto underlying code but which is expressed in customer language?

Augmenting with model-based testing – [Ben Simo][15] presented model-based testing tool. Idea (Antony) how about generating the model from the first tests

Patterns of self-testing software – integrate into the software, part of the documentation (technical, business, online help) – use to drive development.

Workshop Yahoo! group: <aa-ftt@yahoogroups.com>

**Q:** How useful for testing non-functional requirements?

**A:** Workshop didn’t look at this. Some personal experiments with e.g. FitDecorator. Not a lot in the literature yet.

**Q:** Is passing the Acceptance Tests enough?

**A:** No – need to combine Prospective Testing (as described above) with consideration of fault path conditions and with Inspective Testing – as soon as a story is passing all its tests why not start more Inspective testing to explore the application.

**Q:** What’s the right time to do acceptance testing in an agile environment?

**A:** Ideally every time there is releasable code. During the iteration plan at least come up with the names of tests to accept the story, then treat creation of the tests as a story in that iteration.

 [1]: http://www.unicom.co.uk/product_detail.asp?prdid=1547
 [2]: http://www.testingreflections.com/blog/2
 [3]: http://www.testingreflections.com/
 [4]: http://parlezuml.com/blog/
 [5]: http://www.parlezuml.com/blog/?postid=490
 [6]: http://www.concordion.org/
 [7]: http://www.developertesting.com/archives/individual_weblogs-kevin_lawrence-index.html
 [8]: http://selenium.openqa.org/
 [9]: http://www.testing.com/cgi-bin/blog
 [10]: https://dev.eclipse.org/portal/myfoundation/tests/index.php
 [11]: http://c2.com/~ward/
 [12]: http://boss.bekk.no/cubictest/
 [13]: http://www.eclipse.org/
 [14]: http://wtr.rubyforge.org/
 [15]: http://www.questioningsoftware.com/