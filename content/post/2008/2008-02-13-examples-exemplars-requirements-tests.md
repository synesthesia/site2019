---
title: Examples, Exemplars, Requirements, Tests
author: Julian
type: post
date: 2008-02-13T10:23:40+00:00
url: /2008/02/13/examples-exemplars-requirements-tests/

---
I’m blogging the conference [Agile Approaches for Delivering Business Value][1]

**Examples, Exemplars, Requirements, Tests**

_[Keith Braithwaite][2], [Zuhlke][3] (but speaking on behalf of [SPA][4])_

**Summary**

  * Automated Functional Tests ensure quality and drive process change
  * Test failures are more often due to misunderstood requirements than sloppy coding
  * Treating tests as executable specifications can help with both
  * Tests based on examples lead to an exploration of the problem space that discovers requirements and provides a foundation for trapping defects.

<!--more-->

**Notes**

Reporting on practical experience at Zuhlke over last ~18months

What business value should we see from automated testing?

IT response to the uncertainty of software delivery has traditionally been about forcing the customer to speak in IT terms – e.g. requirements engineering, waterfall etc.

Big shock – it’s about people!

And people want IT tools to help them carry out a task in order to achieve a goal in some context – and it’s the goal and the context which are important.

Context is fuzzy and messy.

Writing _rules_ about fuzzy contexts is hard/impossible – but the people in the business can almost always give _examples_

In example, users built examples (of FX trades) in Excel. Team used [FitLibrary][5] to take these example data, drive the system under test and display results

Several hundred scenarios tested. Revealed defects in existing systems (very early). Having tests before features encourage incremental development.

It was hard to write the adapters from FIT to the system-under-test – if it’s hard to instrument the design that in itself suggests the design is faulty.

This delivery of the tool was defect-free: i.e. no defects to fix after the release! After that, this approach became mandatory.

What about “correctness”? Almost certainly not in the exact computer science sense – but who cares – not the business!

Second example – messaging system, again for financial trades.

Again, examples set out in a tabular format. this time captured in [Fitnesse][6].

Some issue – domain specific messages ([SWIFT][7]) have many fields, so example tables v. sparse – hard to work with.

Issues with shared test environment – required semi-manual intervention.

Reporting – tests written = scope captured, tests passing = scope delivered.

Project board said first time they believed a status. Users said they want it this way always in future, even though it required a lot of their time.

These tests get written early (preferably first) – which means they are testing something that doesn’t exist. Think of them as a form of a specification – in fact they act as a gauge.

Q: How do you estimate?

A: Probably doesn&#8217;t affect…

Q: How should this impact the buying side – should we frame our requirements in an example-driven way?

A: yes…

Q: What if the tests do not cover all areas of the user requirement?

A: dangerous – should aim for as full coverage as possible..

<ins datetime="2008-03-13T12:33:50+00:00">Update: See <a href="https://peripateticaxiom.blogspot.com/2008/03/tests-and-gauges.html">this post</a> from Keith</ins>

 [1]: https://www.unicom.co.uk/product_detail.asp?prdid=1547
 [2]: https://peripateticaxiom.blogspot.com/
 [3]: https://www.zuehlke.com/en/
 [4]: https://www.spaconference.org/
 [5]: https://sourceforge.net/projects/fitlibrary
 [6]: https://fitnesse.org/
 [7]: https://www.swift.com/