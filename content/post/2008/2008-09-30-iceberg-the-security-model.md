---
title: Iceberg – the security model
author: Julian
type: post
date: 2008-09-30T10:54:37+00:00
url: /2008/09/30/iceberg-the-security-model/

---
I’m [trying out Iceberg][1], the workflow automation platform. In [previous][2] [posts][3] I described adding some basic forms, views and processes in the context of a sample application.

Today I’ve been experimenting with the [security model][4]. It seems both complex and powerful, with the downside that the [online help][4] seems to be only 25% populated in this area. Here’s what I’ve been able to work out:

Access Control lists (ACL) – every object (optionally) has an ACL which can control Browse, Read, Write, Delete, Change Owner and Change Permissions rights. A user can be associated with a given ACL by means of direct allocation or via allocation of a relevant Groups, Role or Profile.

Groups – A way of aggregating Users, other Groups, Roles or Profiles

Roles – an application-specific way of assigning rights to forms, views, lists, tabs, controls and actions – it seems this is the main way to customise the look and feel of Iceberg based on user login. Strangely you can only assign Users to a Role, not Groups.

Profiles – are associated with a specific object, and _seem_ to be a way of controlling what lists of related objects a user can see when looking at a specific object form. What I can’t find is how you assign someone to a profile!

 [1]: https://www.synesthesia.co.uk/blog/archives/2008/09/24/iceberg/
 [2]: https://www.synesthesia.co.uk/blog/archives/2008/09/24/iceberg-creating-the-first-user-story-1/
 [3]: https://www.synesthesia.co.uk/blog/archives/2008/09/25/iceberg-creating-the-first-user-story-2/
 [4]: https://www.learniceberg.com/6_Security_and_Permissions