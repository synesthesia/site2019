---
title: Finding out about Content Security Policy
authors: ["synesthesia"]
type: note
date: 2015-09-21T12:31:28+00:00
excerpt: Had some issues when adding custom fonts to IdentityServer - which is when I found in the docs that by default it implements Content Security Policy
slug: finding-out-about-content-security-policy 
aliases: ["/worknotes/finding-out-about-content-security-policy"]
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
  - https://synesthesiaworknotes.smallpict.com/2015/09/21/findingOutAboutContent.html
syndication_item_hash:
  - f507f68e12f72d654a602ae13c5d3f7a
  - 1b44e39f1505fbe153e28485c19e3ccc

---
Had some issues when adding custom fonts to [IdentityServer][1] &#8211; which is when I found in the [docs][2] that by default it implements [Content Security Policy][3]

Also found some issues with trying to override the builtin Bootstrap with the CDN version&#8230;

Found [this][4] useful reference on [CSP and ASP.net][4]

This resource looks useful too &#8211; [CSP Playground][5]

 [1]: https://identityserver.github.io/
 [2]: https://identityserver.github.io/Documentation/docs/advanced/csp.html
 [3]: https://content-security-policy.com/
 [4]: https://rehansaeed.com/content-security-policy-for-asp-net-mvc/
 [5]: https://www.cspplayground.com/
