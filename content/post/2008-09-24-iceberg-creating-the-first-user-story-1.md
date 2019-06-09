---
title: Iceberg – Creating the First User Story (1)
author: Julian
type: post
date: 2008-09-24T12:49:40+00:00
url: /2008/09/24/iceberg-creating-the-first-user-story-1/

---
I’m [trying out Iceberg][1], the workflow automation platform. In [my previous post][2] I decided what application I was going to build, and wrote the first two [user stories][3].

Again, I’m using the [Iceberg User Guide][4] to guide me. The first thing that is quite confusing is that the environment within which you are building your application is also the one which displays it &#8211; I’m guessing that a later stage creating user-only logins allows you to hide all the configuration options.

I’ve created a new application, and added two new objects – Project and Project Issue. The next thing I want to do is tell the system that these two are related:

[<img class="aligncenter size-full wp-image-1275" title="issuetracker-classdiag01" src="https://www.synesthesia.co.uk/blog/wp-content/uploads/2008/09/issuetracker-classdiag01.png" alt="" width="298" height="129" />][5]

Counter-intuitively you do this by modifying the Form for an object rather than the object itself – by adding a field which is of type Select List you create a dropdown field that creates a one-to-many link

<img class="aligncenter size-full wp-image-1276" title="iceberg-addlinkedfield" src="https://www.synesthesia.co.uk/blog/wp-content/uploads/2008/09/iceberg-addlinkedfield.png" alt="" width="340" height="335" />

Another thing that you immediately notice is that the listbox used to select the relevant object for the other side of the relationship shows all objects in the system (Iceberg out of the box seems to come pre-populated with certain common objects), reinforcing the point that this is a platform / environment rather than just an application framework. I imagine the idea is that everyone within a company or workgroup would look at the same instance of Iceberg and see a common set of inter-linked applications.

The next challenge was to ensure that all ProjectIssues are created with a unique identifier. Traditionally this would be done either with built-in DBMS functionality or a trigger on object creation. Time to open up the Process Designer. (also time to find another small IIS7 issue, documented [here][6]).

OK, time to get thoroughly stuck&#8230; (see the [next post][7])

 [1]: https://www.synesthesia.co.uk/blog/archives/2008/09/24/iceberg/
 [2]: https://www.synesthesia.co.uk/blog/archives/2008/09/24/iceberg-building-the-first-application/
 [3]: https://www.synesthesia.co.uk/wikka/IssueTracker
 [4]: http://www.learniceberg.com/1_Getting_Started
 [5]: https://www.synesthesia.co.uk/blog/wp-content/uploads/2008/09/issuetracker-classdiag01.png
 [6]: http://www.learniceberg.com/support/comments.php?DiscussionID=43
 [7]: https://www.synesthesia.co.uk/blog/archives/2008/09/25/iceberg-creati…t-user-story-2iceberg-creating-the-first-user-story-2/