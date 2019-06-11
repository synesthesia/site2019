---
title: Removing malicious content from WordPress posts
authors: ["synesthesia"]
type: note
date: 2019-06-07T10:43:49+00:00
slug: removing-malicious-content-from-wordpress-posts 
aliases: ["/worknotes/removing-malicious-content-from-wordpress-posts"]

---
Sometimes malware will corrupt the database, inserting malicious script tags.

Here&#8217;s the quick removal approach if you have access to your database directly:

`<br />
UPDATE wp_posts SET post_content = REPLACE ( post_content, 'BAD SCRIPT TAG', '' );<br />
`
