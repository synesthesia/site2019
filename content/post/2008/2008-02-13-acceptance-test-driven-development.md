---
title: Acceptance Test Driven Development
author: Julian
type: post
date: 2008-02-13T20:27:31+00:00
url: /2008/02/13/acceptance-test-driven-development/

---
I’m blogging the conference [Agile Approaches for Delivering Business Value][1]

**Acceptance Test Driven Development**

[David Peterson][2]

**Summary**

  * What happens if you put acceptance tests in the
  
    driving seat?
  * Fresh ideas about the agile development process
  * Practical techniques to improve your project’s agility
  * Emphasis on process and practice (non-technical)

**Notes**

Whilst working at EasyNet, David modified their normal XP iteration cycle to insert a phase where, for each story, acceptance test criteria were agreed and documented. Alongside this their testing harnesses were adapted to provide autoamted testing of acceptance tests wherever possible.

A key enabler was to separate out test case definition (which depends on the business requirement) from test scripting (which is dependent on, and coupled with, the system under test).

The technique adopted was to build test fixtures which interfaced between the (HTML) test cases and the system under test. This way the test cases can stay unchanged whilst the system changes. If the system changes in a way that breaks the test fixture that shows up as broken acceptance tests.

The tool is released as [Concordion][3]. Good write up on that site.

<ins datetime="2008-03-13T12:33:50+00:00">Update: See <a href="http://peripateticaxiom.blogspot.com/2008/03/tests-and-gauges.html">this post</a> from Keith Braithwaite</ins>

 [1]: http://www.unicom.co.uk/product_detail.asp?prdid=1547
 [2]: http://blog.davidpeterson.co.uk/
 [3]: http://www.concordion.org/