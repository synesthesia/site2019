---
title: Modelling Benefits in UML
author: Julian
type: post
date: 2010-12-20T14:14:33+00:00
url: /2010/12/20/modelling-benefits-in-uml/
aktt_notify_twitter:
  - yes
aktt_tweeted:
  - 1

---
[Benefits Realisation Management][1] is one of those classic programme / project disciplines that “everyone” agrees is a great idea, which in my experience is more overlooked than observed.

The main sources in the literature I’m aware of are books by [Bradley][2] and [Ward & Daniels][3]. I’ve also had the privilege of learning directly from [Gerald Bradley][4], so my own approach is very much influenced by his work.

A key tool is the use of visual maps, both interactively with stakeholders to discover benefits, and then as a way of presenting and communicating the complex causal links between an IT investment and the benefits it allegedly supports.

Interactive mapping works best with tactile materials – Post-It notes, sticky card etc. But for analysis and presentation some kind of tool is needed – drawing tools may work for smaller maps, but it very quickly becomes impractical, and something model-based is required.

[Specialised tools][5] are available, but they are just that, specialised tools: a good investment perhaps, but nevertheless a substantial outlay. The lack of affordable tools might, I suggest, be a block to wider adoption of these methods.

I’ve blogged before about using [general purpose UML modelling tools to help programme shaping][6], so it was natural that I looked at extending this approach to benefits mapping.

An example benefits map using the UML approach is shown here, produced using [Sparx Enterprise Architect][7]:

[<img class="aligncenter size-full wp-image-22406" style="display: block; float: none; margin-left: auto; margin-right: auto;" title="Benefits Map" src="https://www.synesthesia.co.uk/blog/wp-content/uploads/2010/12/sample-ben-map.gif" alt="" width="485" height="592" />][8]

I have created a [UML Profile][9] (which I will write more about later), which extends the Requirement metaclass provided in Enterprise Architect by stereotyping to create the five core Benefits Realisation Management objects:

<div>
  <table border="4" cellspacing="0" cellpadding="2" width="501" align="center">
    <tr>
      <td width="136" valign="top">
        Objectives
      </td>
      
      <td width="357" valign="top">
        Why are we doing this?
      </td>
    </tr>
    
    <tr>
      <td width="136" valign="top">
        Benefits
      </td>
      
      <td width="357" valign="top">
        A measurable indicator of a change which is perceived as positive by at least one stakeholder group
      </td>
    </tr>
    
    <tr>
      <td width="136" valign="top">
        Disbenefits
      </td>
      
      <td width="357" valign="top">
        A measurable indicator of a change which is perceived as positive by at least one stakeholder group
      </td>
    </tr>
    
    <tr>
      <td width="136" valign="top">
        Business Changes
      </td>
      
      <td width="357" valign="top">
        Any change in the way a business operates, for example in terms of resourcing, behaviours, skills, processes etc.
      </td>
    </tr>
    
    <tr>
      <td width="136" valign="top">
        Enablers
      </td>
      
      <td width="357" valign="top">
        Typically something that can be built or bought
      </td>
    </tr>
  </table>
</div>

Readers familiar with Benefits maps will have spotted something different about the arrows. Most graphical presentations use an arrow from the precursor enabler, change  or benefit to the subsequent change, benefit or objective:

[<img class="aligncenter size-full wp-image-22472" style="display: block; float: none; margin-left: auto; margin-right: auto;" title="Simple Benefits Map" src="https://www.synesthesia.co.uk/blog/wp-content/uploads/2010/12/simple-ben-map.gif" alt="" width="293" height="104" />][10]

Unfortunately this is not UML compliant, so  I have chosen to model using UML dependency and realisation relationships:

<div>
  <table border="4" cellspacing="0" cellpadding="2" width="500" align="center">
    <tr>
      <td style="text-align: center;" width="166" valign="top">
        <a href="https://www.synesthesia.co.uk/blog/wp-content/uploads/2010/12/dependency.gif"><img class="aligncenter size-full wp-image-22476" title="dependency" src="https://www.synesthesia.co.uk/blog/wp-content/uploads/2010/12/dependency.gif" alt="" width="75" height="37" /></a>
      </td>
      
      <td style="text-align: center;" width="166" valign="top">
        Dependency
      </td>
      
      <td style="text-align: center;" width="166" valign="top">
        “This objective or benefit depends on that benefit”
      </td>
    </tr>
    
    <tr>
      <td style="text-align: center;" width="166" valign="top">
        <a href="https://www.synesthesia.co.uk/blog/wp-content/uploads/2010/12/realisation.gif"><img class="aligncenter size-full wp-image-22477" title="realisation" src="https://www.synesthesia.co.uk/blog/wp-content/uploads/2010/12/realisation.gif" alt="" width="91" height="50" /></a>
      </td>
      
      <td style="text-align: center;" width="166" valign="top">
        Realisation
      </td>
      
      <td style="text-align: center;" width="166" valign="top">
        “This change or enabler implements that change or benefit”
      </td>
    </tr>
  </table>
</div>

Using the language constructs in this way means that it is possible to use the traceability features within the tool to identify all the chains of dependencies.

Later posts will cover the development of the UML Profile, including the addition of attributes to the benefits and the modelling of measures.

I’m in the middle of a review cycle with a group of stakeholders who are used to talking about project benefits, but who perhaps have not used visual maps before – I shall blog how it goes!

What approaches have you used to document project benefits in a graphical format? Please leave a comment…

 [1]: https://www.pmis.co.uk/benefits_realisation.htm
 [2]: https://www.amazon.co.uk/gp/product/1409400948?ie=UTF8&tag=fivegocrazyinmid&linkCode=as2&camp=1634&creative=19450&creativeASIN=1409400948
 [3]: https://www.amazon.co.uk/gp/product/047009463X?ie=UTF8&tag=fivegocrazyinmid&linkCode=as2&camp=1634&creative=19450&creativeASIN=047009463X
 [4]: https://www.sigma-uk.com/about/history.html
 [5]: https://www.changedirector.com/Solutions/Benefits-%20Management
 [6]: https://www.synesthesia.co.uk/blog/archives/2009/12/14/lean-programme-shaping-models/
 [7]: https://www.sparxsystems.com/
 [8]: https://www.synesthesia.co.uk/blog/wp-content/uploads/2010/12/sample-ben-map.gif
 [9]: https://www.uml-diagrams.org/profile-diagrams.html#profile
 [10]: https://www.synesthesia.co.uk/blog/wp-content/uploads/2010/12/simple-ben-map.gif