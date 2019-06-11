---
title: Strange CSS bug in Mozilla Firefox
author: Julian
type: post
date: 2004-02-09T18:26:49+00:00
excerpt: Weird CSS bug in Firefox
slug: strange-css-bug-in-mozilla-firefox 
aliases: ["/2004/02/09/strange-css-bug-in-mozilla-firefox"]

---
Just upgraded to [Firefox][1] and discovered that all my hyperlinks were jumping to the right when I hovered over them&#8230;

Replacing the original style declaration of
  
`A:hover { border-bottom: 1px dashed #555; }`
  
with
  
`A:hover	 { color: #999999;  text-decoration: none;}`
  
has worked around it&#8230;

Anyone know how to report bugs to Mozilla?

 [1]: https://www.mozilla.org/products/firefox/