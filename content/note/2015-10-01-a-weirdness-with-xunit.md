---
title: A weirdness with xunit
authors: ["synesthesia"]
type: note
date: 2015-10-01T15:31:27+00:00
excerpt: Today was rebuilding a solution that had been updated to xunit2, and kept getting random test failures, usually with some kind of conflict with Rhino Mocks. The fix seemed to be to turn off the parallel testing.
slug: a-weirdness-with-xunit 
aliases: ["/worknotes/a-weirdness-with-xunit"]
tags: ["xunit", "Rhino Mocks", "code"]        

---
Today was rebuilding a solution that had been updated to xunit2, and kept getting random test failures, usually with some kind of conflict with Rhino Mocks. The fix seemed to be to turn off the [parallel testing][1]. A little googling turned up [this][1] which suggests Rhino Mocks does indeed have a problem in a multi-threaded test environment

 [1]: https://xunit.github.io/docs/running-tests-in-parallel.html
