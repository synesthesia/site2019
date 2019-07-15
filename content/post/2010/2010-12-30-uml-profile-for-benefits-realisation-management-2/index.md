---
title: UML Profile for Benefits Realisation Management – 2
authors: ["synesthesia"]
type: post
date: 2010-12-30T16:07:32+00:00
lastmod: 2019-07-15T12:00:00+00:00
slug: uml-profile-for-benefits-realisation-management-2 
aliases: ["/2010/12/30/uml-profile-for-benefits-realisation-management-2"]
tags: ["Benefits Realisation Management", "UML"]
---
This is a follow on from [UML Profile for Benefits Realisation Management &#8211; 1](/2010/12/21/uml-profile-for-benefits-realisation-management-1). In  that post I described the basic UML profile I have created for modelling project benefits in line with [Bradley][2] and [Ward & Daniels][3]

Having started to apply the profile successfully, I wanted to extend it to model [measures](https://books.google.co.uk/books?id=2IfFQY_XrfAC&lpg=PA113&ots=r5fdUWFy3k&pg=PA133&redir_esc=y#v=onepage&q=measure&f=false),

These were modelled by meta-classing Class

{{< figure src="brm-profile-3.png" title="Extending Benefits Model with Measures" numbered="true" >}}

As can be seen from this diagram, I have added a number of tagged values (which are modelled as attributes in the UML profile) to cover off the typical data that needs to be captured in relation to a measure.

