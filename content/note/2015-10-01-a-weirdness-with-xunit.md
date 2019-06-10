---
title: A weirdness with xunit
author: Julian
type: note
date: 2015-10-01T15:31:27+00:00
excerpt: Today was rebuilding a solution that had been updated to xunit2, and kept getting random test failures, usually with some kind of conflict with Rhino Mocks. The fix seemed to be to turn off the parallel testing.
url: /worknotes/a-weirdness-with-xunit/
        
syndication_source:
  - WorkNotes
syndication_source_uri:
  - https://synesthesiaworknotes.smallpict.com/
syndication_source_id:
  - https://synesthesiaworknotes.smallpict.com/rss.xml
syndication_feed:
  - https://synesthesiaworknotes.smallpict.com/rss.xml
syndication_feed_id:
  - 8
syndication_permalink:
  - https://synesthesiaworknotes.smallpict.com/2015/10/01/aWeirdnessWithXunit.html
syndication_item_hash:
  - 2aec4a899b8bd9a7758d5a55166f005b
  - 45d3ba9f4855207bc927df71bdbc3c3b

---
Today was rebuilding a solution that had been updated to xunit2, and kept getting random test failures, usually with some kind of conflict with Rhino Mocks. The fix seemed to be to turn off the [parallel testing][1]. A little googling turned up [this][1] which suggests Rhino Mocks does indeed have a problem in a multi-threaded test environment

 [1]: https://xunit.github.io/docs/running-tests-in-parallel.html
