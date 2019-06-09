---
title: Testing MTTextile 2
author: Julian
type: post
date: -001-11-30T00:00:00+00:00
excerpt: "Installed 'MTTextile 2 plugin (MTTextile2)':https://www.bradchoate.com/mt-plugins/textile from Brad Choate - mostly wonderful, one bug still unresolved..."
draft: true
url: /?p=190

---
Testing this new &#8216;plugin (MTTextile2)&#8217;:https://www.bradchoate.com/mt-plugins/textile from Brad Choate 

First issue I&#8217;ve found on this Smarty-powered MT blog is that the linking feature only works with &#8216; rather than &#8221; i.e.

bc. ==&#8217;plugin (MTTextile2)&#8217;:https://www.bradchoate.com/mt-plugins/textile== 

\*works\*

bc. ==&#8221;plugin (MTTextile2)&#8221;:https://www.bradchoate.com/mt-plugins/textile==

(as per the manual) \*doesn&#8217;t\*

Also images don&#8217;t seem to work:

!https://synesthesia.co.uk/blog/images/modifiedcycle.gif! 

(should be an image?)

Tests that work OK have been moved to the extended entry
  
<!--more-->


  
\*Tested OK\* so far are:

* bullet 1
  
* bullet 2
  
** bullet 2.1

\# ol 1
  
\# ol2

Definition lists:

dl. textile:a cloth, especially one manufactured by weaving
  
or knitting; a fabric
  
format:the arrangement of data for storage or display.

tables

|a|b|c|
  
|1|2|3|

table(fig). {color:red}_|Top|Row|
  
{color:blue}|/2. Second|Row|
  
|_{color:green}. Last|

character subs

(c) (r) &#8482; {c|} {L-} {Y=} {A&#8217;} {a&#8217;} {1/4} {*} {:)} {:(}

bq. in a blockquote

bc. some block code
  
another line

normal \*strong\* \_emphasis\_ \*\*bold\*\* \_\_italics\_\_ &#8211;smaller&#8211; ++bigger++ ^super^ ~sub~ normal[1]

normal

fn1. footnote 1 content