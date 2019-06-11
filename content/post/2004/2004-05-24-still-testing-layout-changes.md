---
title: Still testing layout changes
author: admin
type: post
date: 2004-05-24T20:18:31+00:00
excerpt: |
  What I'm trying to achieve is an inline-linkblog type effect, with the posts to the quicklink category being displayed all together after all of that days main posts (if any).
  
  At present (as you can see) they are displaying at the bottom of the page. What I want to do is find how to trap the date header code in each loop...
slug: still-testing-layout-changes 
aliases: ["/2004/05/24/still-testing-layout-changes"]

---
<ins datetime="2004-4-25T21:57:48--1:00">This post has now been superceded by <a href="https://www.synesthesia.co.uk/blog/archives/2004/05/25/wordpress-linkblog/">this one</a></ins>
  
<!--more-->


  
What I&#8217;m trying to achieve is an inline-linkblog type effect, with the posts to the quicklink category being displayed all together after all of that day&#8217;s main posts (if any).

At present (as you can see) they are displaying at the bottom of the page (because I have put them in a second loop). What I want to do is find how to trap the date header code in the main loop so I can display this set at the bottom of the day &#8230;

Basic category detection and formatting code based on Matt&#8217;s [Asides][1], modified to catch all of the quicklink posts in an array for later posting.

before the main loop:
  
`<br />
$quicklinks = array();<br />
` 

In the main loop:

`<br />
if (in_category(35) && !$single) {<br />
 $quicklinks[] = $post;<br />
  } else {<br />
//do normal post here<br />
}<br />
` 

And after the main loop:

`<br />
if ($quicklinks) : foreach ($quicklinks as $post) : start_wp();<br />
//HTML here to display the quicklinks in an unordered list (as per Matt's Asides)<br />
 endforeach; else:  _e('Sorry, no posts matched your criteria.');<br />
 endif;<br />
`

 [1]: https://photomatt.net/archives/2004/05/19/asides/