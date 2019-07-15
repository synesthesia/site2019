---
title: UML Profile for Benefits Realisation Management – 1
authors: ["synesthesia"]
type: post
date: 2010-12-21T11:57:39+00:00
lastmod: 2019-07-15T11:00:00+00:00
slug: uml-profile-for-benefits-realisation-management-1
aliases: ["/2010/12/21/uml-profile-for-benefits-realisation-management-1/"]
tags: ["UML", "Benefits Realisation Management"]
projects: ["ea-uml-addons"]
---
I wrote yesterday about [using a general purpose UML modelling tool to create project Benefit Maps]({{< ref "/post/2010/2010-12-20-modelling-benefits-in-uml/index.md" >}}).

In that [post]({{< ref "/post/2010/2010-12-20-modelling-benefits-in-uml/index.md" >}}) I described using Enterprise Architect's ability to [create custom UML profiles](https://sparxsystems.com/enterprise_architect_user_guide/14.0/modeling_tools/umlprofiles_2.html) to create the beginnings of a [custom modelling language]( https://sparxsystems.com/enterprise_architect_user_guide/14.0/modeling_tools/umlprofiles_2.html) for project benefits management.

In this article I walk through the basics of that UML profile.

### Classes

The first task was to model the core objects of the benefits model – Objectives, Benefits, Disbenefits, Business Changes and Enablers.

These are all modelled as [stereotypes]( http://www.uml-diagrams.org/profile-diagrams.html#stereotype) of the Requirement [metaclass](http://www.uml-diagrams.org/profile-diagrams.html#metaclass):

{{< figure src="brm-profile-01.png" title="Benefits Model" numbered="true" >}}

The more observant of you will have noticed that there is also an [enumeration](https://sparxsystems.com/enterprise_architect_user_guide/14.0/modeling_tools/addingenumerationstagstost.html) called **BenefitvalueType**. this, together with the attributes on the **Benefit** and **Disbenefit** classes create a tagged value named “Value Type” in the final model, constrained to the different [Sigma Value Types](https://books.google.co.uk/books?id=2IfFQY_XrfAC&lpg=PA113&ots=r5fdUWFy3k&pg=PA113&redir_esc=y#v=onepage&q=sigma%20benefit%20value%20types&f=false).

The [Sigma Value Types](https://books.google.co.uk/books?id=2IfFQY_XrfAC&lpg=PA113&ots=r5fdUWFy3k&pg=PA113&redir_esc=y#v=onepage&q=sigma%20benefit%20value%20types&f=false) are used as a way of classifying benefits - this aids with the identification of measures, and also stimulates a conversation with stakeholders about missing benefits.

### Relationships

The second part of the profile contains the relationships needed for the Benefits model. As I [noted before](/2010/12/20/modelling-benefits-in-uml/), I have decided to use [realisation](https://www.uml-diagrams.org/abstraction.html) and [dependency](https://www.uml-diagrams.org/dependency.html?context=class-diagrams) links to model different aspects of the Benefits model. These are included in the profile by creating new classes of the same name that redefine the relevant metaclasses, thus picking up all the default behaviour.

{{< figure src="brm-profile-02.png" title="Benefits Model Relationships" numbered="true" >}}

The profile also includes a redefinition of [Association](https://www.uml-diagrams.org/association.html?context=class-diagrams), which I will use in the next part of the model, modelling Measures.

As always, I welcome comments!

<ins datetime="2019-07-15">(2019-07-15) updated links and diagrams</ins>

 [1]: /2010/12/20/modelling-benefits-in-uml/
 [2]: http://www.sparxsystems.com/enterprise_architect_user_guide/8.0/modeling_languages/umlprofiles_2.html
 [3]: http://www.sparxsystems.com/enterprise_architect_user_guide/8.0/modeling_languages/extending_uml.html
 [4]: http://www.uml-diagrams.org/profile-diagrams.html#stereotype
 [5]: http://www.uml-diagrams.org/profile-diagrams.html#metaclass
 [6]: http://publib.boulder.ibm.com/infocenter/rtnlhelp/v6r0m0/index.jsp?topic=/com.ibm.xtools.modeler.doc/topics/cenum.html
 [7]: http://www.uml-diagrams.org/profile-diagrams.html#tagged-value
 [8]: https://books.google.co.uk/books?id=2IfFQY_XrfAC&lpg=PA113&ots=r5fdUWFy3k&pg=PA113&redir_esc=y#v=onepage&q=sigma%20benefit%20value%20types&f=false
 [9]: http://www.uml-diagrams.org/class-diagrams.html#abstraction
 [10]: http://www.uml-diagrams.org/class-diagrams.html#dependency

