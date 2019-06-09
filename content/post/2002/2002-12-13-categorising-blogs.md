---
title: Categorising Blogs
author: Julian
type: post
date: 2002-12-13T10:31:56+00:00
excerpt: Hammersley, Azhar and others grapple with linking blogs by category
url: /2002/12/13/categorising-blogs/

---
[Ben Hammersley][1] and [Azeem Azhar][2] are debating how to create a decentralised categorisation service for blogs, to support a &#8220;More Like this&#8221; sort of thing&#8230;
  
<!--more-->


  
\*\\*\*Updated\*\**
  
The debate goes on &#8211; [Ben][1] [responds to Azeem][3] with

> It&#8217;s a nice idea, but I have an odd feeling about it. It just seems a bit un-emergent, not-very-decentralized, vendor-specific.

to which [Azeem][2] has [this][4]:

> The idea he has is that trackbacks between blogs. Without needing to know what the labels are we can &#8220;create plans of meaning&#8221;.
  
> One dramatic problem is this: there is no sensible relationship between categories. I may call place a post in a category called &#8220;tech&#8221; and include within it news about PDAs, XML and cool MacOS software. Ben my TB back to a post of mine and place it in the very specific category of &#8220;FOAF news&#8221;. The plane of meaning is lost, or it has gone through a messy wormhole. 

Azeem envisages:

> [&#8230;] [a public service categorisation engine.][5] These would have a number of requirements:
> 
>   * creation of many, multi-faceted taxonomies&#8211;to ensure they are decentralised, vendor-independent [&#8230;]
>   * a way of looking at a blog posting (with its cues and clues) and spitting out a set of suggested categories
> 
> The first (taxonomies) is tough. I am not a taxonomy expert. That is the area of [IAs][6]. However, the design of standards-based taxonomies is [well-understood][7] and almost a mature business. There are a number of publically available ones out there. Let&#8217;s assume we can find a decentralised way to create many taxonomies. (Big assumption).
  
> The second element is the service itself. It is simply a remote services call. I send the blog post with whatever clues I can (such as posts I am tracking-back to or URLs in the post) and it figures out several candidate categories the post could be in. It could also figure out sites which might want to receive a track-back or a ping about that particular posting.
  
> I have a few more thoughts on this. In particular, how we can create a market for taxonomy definition allowing multiple taxonomies to emerge, what cues you could use to generate category (and &#8220;others who might like to see this&#8221; information) &#8230;

\***
  
[Ben Hammersley][1] wrote a couple of days ago about [Trackback, RDF, and the LazyWeb][8] 

> Here&#8217;s the thing: I want to make a More Like This From Others button for each of the entries below. Clicking on it would bring a list of entries, formatted just like the blog, with excerpts of entries on a similar subject from other people. [&#8230;] So here&#8217;s what I&#8217;d like. Movable Type blogs now automatically create trackbacks when they can. These trackbacks contain RDF, denoting the category the MT blog has that category within. MT produces RDF indexes too (in the flavour of RSS 1.0). So, what I want is a little app that takes the trackback. Follows it back to the originating site, find the RDF snippet, takes the index.rdf, and gives back all the entries within the index.rdf that are on the same subject as the trackback one.

[Azeem Azhar][2] [responds][9]:

> There are two problems to overcome:
> 
>   * People are notoriously bad at categorising things accurately or consistently
>   * Predefined controlled vocabularies ensure consistency but laziness or uncertainty by authors means these CVs are rarely used well, unless financial incentives are attached.
> 
> [&#8230;]
  
> So what I would like? When I author a blog post to be able to submit it to a categorisation server. This server to perform analysis on the content, analysis on my context (what it already knows about me), analysis on the context of the blog post (what URLs am I quoting, what am I tracking back to, and analyses of those posts) to provide suggested categories which I can select.
  
> The categories would need to come from an agreed set of taxonomies. DMoz might be one taxonomy but you would need very many more (geographical ones, directed, standardised efforts like the MeSH, or perhaps they could be created by examining and analysis all the categories contained in RSS feeds collected by the method Ben suggests.) 

There are further useful ideas in the comments to [Ben&#8217;s post][10], including contributions from [Burningbird][11], [Phil Ringnalda][12] and [Sam Ruby][13]

 [1]: https://www.benhammersley.com/
 [2]: https://azeem.azhar.co.uk/
 [3]: https://www.benhammersley.com/archives/003379.html#003379
 [4]: https://azeem.azhar.co.uk/archives/000261.php
 [5]: https://www.monkeyx.com/archives/www_semantic_web/categorisation_server.html
 [6]: https://www.iaslash.org/
 [7]: https://www.boxesandarrows.com/archives/all_about_facets_controlled_vocabularies.php
 [8]: https://www.benhammersley.com/archives/003371.html#003371 "Ben Hammersley.com: Trackback, RDF, and the LazyWeb"
 [9]: https://azeem.azhar.co.uk/archives/000261.php "azeem.azhar.co.uk: Auto trackback and categorising blogs"
 [10]: https://www.benhammersley.com/archives/003371.html#003371
 [11]: https://weblog.burningbird.net/
 [12]: https://philringnalda.com/
 [13]: https://www.intertwingly.net/blog/