---
title: Iceberg – Creating the First User Story (2)
author: Julian
type: post
date: 2008-09-25T09:31:00+00:00
url: /2008/09/25/iceberg-creating-the-first-user-story-2/

---
I’m [trying out Iceberg][1], the workflow automation platform. In my last post I described starting to build an application, based on this [outline specification][2]. I had just got to the point of trying to meet the first acceptance criterion on the [first user story][3] (all Project Issues must be uniquely identifiable) when I came to a grinding halt.

The line I started pursuing was to have some kind of global object in which I could store the last used value for a ProjectIssue. I know this is potentially risky in a multi-user environment, but apart from that I have not (yet) been able to find out how Iceberg would allow you to access a global object in the Process Designer.

A fortuitous search on the Iceberg Support site led me to the video below, on how to implement a unique ID.



This will probably be enough for our purposes right now – certainly to be sure every Project Issue is uniquely identified within the system. It does mean that if I have multiple projects in the system then sequential issue IDs may be spread over several projects, but the immediate requirement does not require that the Issues for a given project follow a sequential hierarchy – a timely reminder to myself of [YAGNI][4]!

This was the only real issue, and once this was cracked, it didn&#8217;t take long to add a couple of process steps to set default values for fields. This [first user story][3] is essentially about creating, browsing and editing data, functions which are inherent in the Iceberg environment &#8211; so first story done! The [second story, as currently written][5] also implies only browse and edit, so is met by what we have done so far.

This will probably suffice for an initial look at how easy it is to use the basic Iceberg functionality &#8211; the next things to do are more about refined analysis of the specific application than testing the environment.

 [1]: https://www.synesthesia.co.uk/blog/archives/2008/09/24/iceberg/
 [2]: https://www.synesthesia.co.uk/wikka/IssueTracker
 [3]: https://www.synesthesia.co.uk/wikka/IssueTrackerStory0001
 [4]: https://en.wikipedia.org/wiki/You_Ain't_Gonna_Need_It
 [5]: https://www.synesthesia.co.uk/wikka/IssueTrackerStory0002?time=2008-09-24+11%3A41%3A47