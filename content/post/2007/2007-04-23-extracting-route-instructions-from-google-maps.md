---
title: Extracting Route Instructions from Google Maps
author: Julian
type: post
date: 2007-04-23T06:06:31+00:00
slug: extracting-route-instructions-from-google-maps 
aliases: ["/2007/04/23/extracting-route-instructions-from-google-maps"]

---
This mini-project came about because I had a need to give people route instructions for a party.

It&#8217;s easy to use [Google Maps][1] to set up a customised route by adding placemarks at navigationally-significant locations (see [this example][2]), and you can easily add instructions (including pictures) at each point (try clicking on one of the &#8220;map pins&#8221;).

However in the real world, there is nothing to beat having a list of instructions that each person can print out. I didn&#8217;t want to re-type everything into a separate document, so created a [web page][3] to extract the key information from Google Maps and present it as a [tabular list][3]. Editing the data in Google Maps is immediately reflected in the web page.

There are three key components which are described in more detail (including source listings) on the associated [wiki page][4].

  * The [KML][5] representation of the map
  * A PHP script to pull down the relevant KML file, manipulate it by application of an XSL stylesheet, and create the resulting web page
  * The XSL stylesheet

**Assumptions and Limitations**

  * Assumes that the order in which waypoints are added to the Google Map is the correct navigational order. (this could be a real pain if you later needed to add an intermediate point)
  * URL transform to get KML file is hard-coded
  * Assumes that the only placemarks on the map are navigational waypoints

**References**

  * A lot of the insight on manipulating KML came from [Mark Mclaren&#8217;s Weblog][6]
  * The PHP code to manipulate the XML was heavily lifted from the [Zend Developer Zone][7]

 [1]: https://maps.google.com/ "Google Maps"
 [2]: https://maps.google.com/maps/ms?ie=UTF8&hl=en&z=16&om=1&msid=114870744536353390965.00000111ea7e65a3111ef&msa=0 "Example Google Map"
 [3]: https://www.synesthesia.co.uk/data/sp2tm.php "Example output page"
 [4]: https://www.synesthesia.co.uk/blog/wiki/Extracting+Route+Instructions+from+Google+Map
 [5]: https://earth.google.com/kml/kml_tags_21.html "KML reference"
 [6]: https://cse-mjmcl.cse.bris.ac.uk/blog/2005/07/26/1122414882406.html "Mark McClaren's Weblog"
 [7]: https://devzone.zend.com/node/view/id/1302 "Zend Developer Zone"