---
title: Why SLAs smell of waste
author: Julian
type: post
date: 2011-07-12T07:36:45+00:00
url: /2011/07/12/why-slas-smell-of-waste/
aktt_notify_twitter:
  - yes
aktt_tweeted:
  - 1

---
<div class="zemanta-img" style="margin: 1em; display: block;">
  <figure style="width: 300px" class="wp-caption aligncenter"><a href="https://commons.wikipedia.org/wiki/File:SLA_2.JPG"><img title="SLA 2" src="https://www.synesthesia.co.uk/blog/wp-content/uploads/2011/07/300px-SLA_21.jpg" alt="SLA 2" width="300" height="187" /></a><figcaption class="wp-caption-text">Image via Wikipedia</figcaption></figure>
</div>

#### 

#### DevOps

There’s quite a lot now on the internet about “devops” – combining development and operations work to increase flow and reduce problems

  * Google search for <a href="https://www.google.co.uk/search?sourceid=chrome&ie=UTF-8&q=kanban+devops" target="_blank">Kanban + Devops</a>
  * <a href="https://www.delicious.com/synesthesia/devops" target="_blank">Links I’ve tagged “devops”</a>

One of the key features of this approach is the idea that above a certain threshold of estimated duration, all operations work has to be included in the kanban board for visibility and flow management.

For example see these <a href="https://docs.google.com/document/d/1gN-MZylxh72m9mCNo5oUCoWZXme4VtMIFf2ft3q1n7s/mobilebasic?authkey=CN_w1lo&pli=1&hl=en_US" target="_blank">meeting notes from a DevOps conference in Ocean View, June 2011</a>, where Lonely Planet shared their experience of this, with a threshold of 30 mins – i.e. any servicedesk issue which takes more than 30 mins gets moved to Kanban

I had a <a href="https://twitter.com/#!/dominicad/status/90507189810233344" target="_blank">brief exchange on Twitter</a> with <a href="https://twitter.com/#!/dominicad" target="_blank">Dominica DeGrandis</a>, one of the DevOps leading lights, in which she confirmed that in her experience 1 hour was the most common point where teams found that the visibility and sharing was worth more than the overhead of putting into Kanban. This happens to be the pragmatic transition point adopted by the team I am coaching.

#### SLAs are a Problem!

Intuitively a follow up step will be to look at how this approach affects traditional service desk SLAs. I’m not a great fan of SLAs, as they tend to focus on failure and what happens after a failure – I’d rather that a service “just worked” and that resources went into keeping it that way.

I’m particularly disenchanted with the idea of SLAs when they are applied between two departments of the same business, not least because they stimulate the wrong sort of behaviour, in particular the chasing of local optima. The SLA-driven approach also encourages managers on the “consumer” side of the agreement to pay no attention whatsoever to systemic problems of their own making, to the ultimate detriment of the overall firm.

Having just read [Bob Marshall][1]’s [Marshall Model of Organisational Evolution][2] I can see that the frustrations I am expressing are a factor of the transition zone between the Analytic and Synergistic organisational mindsets.

I find [John Seddon][3] another source of stimulating ideas, and his piece on “[Why do we believe in economies of scale][4]?”  has some particular insights to how the SLA mentality creates organisational waste.

I humbly offer a few more thoughts to the debate:

  * “Incident management” as a process is focused on failure, and managing the impact of failure rather than removing the causes (and yes I know there is a whole other ITIL process of &#8220;Problem Management&#8221;)
  * SLAs focus resource on local optima (fix this incident for this user) rather than on the “best value for the whole firm at this time”
  * Incident management systems tend to accumulate backlogs of failure demand which represent inherent waste, and which also clog flow making the work to address underlying causes inherently less efficient
  * Efforts to create a synergistic “OneTeam” approach focused on flow are undermined by too much interrupt-driven work. Integrating the interrupt-driven work into the flow gives a much better sense of how to “add the most value possible right now”

The way I explain this to colleagues is usually along these lines:

The business has invested a fixed amount into IT development & support

Usually (especially in small / medium business) there is  a constraint within the technology team

Therefore the best value to the business from that investment is through:

  * elevation and exploitation of the constraint
  * reducing lead time
  * prioritising based on economic cost of delay

All of which are delivered by a tuned Kanban system.

To make sense of this we need to educate ourselves and our colleagues about the systemic dysfunctions caused by trying to force a system to work faster than the constraints allow. It often takes time &#8211; for far too many people from the Analytic mindset the first response is &#8220;they just have to work harder&#8221;

#### How about you?

I&#8217;d love to hear from other people grappling with these issues &#8211; please comment here or tweet me ([@Synesthesia][5])

&nbsp;

<div class="zemanta-pixie" style="margin-top: 10px; height: 15px;">
  <img class="zemanta-pixie-img" style="border: none; float: right;" src="https://img.zemanta.com/pixy.gif?x-id=22db7d7d-2ec3-492f-ada6-24f0d5f74856" alt="" />
</div>

 [1]: https://twitter.com/#!/@flowchainsensei
 [2]: https://www.fallingblossoms.com/opinion/content?id=1006
 [3]: https://www.systemsthinking.co.uk/home.asp
 [4]: https://www.thesystemsthinkingreview.co.uk/index.php?pg=18&utwkstoryid=266
 [5]: https://twitter.com/#!/@synesthesia