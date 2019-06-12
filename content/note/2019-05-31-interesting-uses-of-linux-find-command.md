---
title: Interesting uses of Linux “find” command
authors: ["synesthesia"]
type: note
date: 2019-05-31T08:36:37+00:00
slug: interesting-uses-of-linux-find-command 
aliases: ["/worknotes/interesting-uses-of-linux-find-command"]
tags: ["linux"]

---
Find all files for given user and change ownership 

`sudo find . -user OLDUSER -exec chown NEWUSER:NEWGROUP “{}” \;`

Find all files with given permissions

 `find -perm mode`
