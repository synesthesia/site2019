---
title: Iceberg Workflow Automation Platform – Installation
author: Julian
type: post
date: 2008-09-24T10:22:12+00:00
url: /2008/09/24/iceberg-workflow-automation-platform-installation/

---
As mentioned in [my last post][1], I&#8217;m trying out [Iceberg][2].

Iceberg offer an “all in one” installer using the Cassini webserver, or for more complex installs you can download a zip file with the web application and a configuration script. As I already have SQLExpress and IIS7 in my laptop I chose the latter.

The setup instructions are very clear, and follow the normal pattern – set up a database and database user, install the web application to a virtual directory on the web server, make sure all users and permissions are correct,

I encountered three small problems during the setup, two of which were answered on the Iceberg Forums ([1][3], [2][4]), and a third because the the default configuration of SQLExpress does not have named pipes enabled. In other words the sort of things which always pop up with setting up web applications.

Having fixed all of those I was presented with the login screen.<figure id="attachment_1263" aria-describedby="caption-attachment-1263" style="width: 361px" class="wp-caption aligncenter">

[<img class="size-full wp-image-1263" title="iceberg-signin" src="https://www.synesthesia.co.uk/blog/wp-content/uploads/2008/09/iceberg-signin.png" alt="Iceberg Signin Screen" width="361" height="242" />][5]<figcaption id="caption-attachment-1263" class="wp-caption-text">Iceberg Signin Screen</figcaption></figure>

 [1]: https://www.synesthesia.co.uk/blog/archives/2008/09/24/iceberg/
 [2]: https://www.geticeberg.com/overview/
 [3]: https://www.learniceberg.com/support/comments.php?DiscussionID=18
 [4]: https://www.learniceberg.com/support/comments.php?DiscussionID=42
 [5]: https://www.synesthesia.co.uk/blog/wp-content/uploads/2008/09/iceberg-signin.png