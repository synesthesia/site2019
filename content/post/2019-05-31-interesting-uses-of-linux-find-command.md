---
title: Interesting uses of Linux “find” command
author: Julian
type: syn_worknote
date: 2019-05-31T08:36:37+00:00
url: /worknotes/interesting-uses-of-linux-find-command/

---
Find all files for given user and change ownership 

`sudo find . -user OLDUSER -exec chown NEWUSER:NEWGROUP “{}” \;`

Find all files with given permissions

 `find -perm mode`