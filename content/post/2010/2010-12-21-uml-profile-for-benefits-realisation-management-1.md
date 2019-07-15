---
title: UML Profile for Benefits Realisation Management – 1
authors: ["synesthesia"]
type: post
date: 2010-12-21T11:57:39+00:00
slug: uml-profile-for-benefits-realisation-management-1
aliases: ["/2010/12/21/uml-profile-for-benefits-realisation-management-1/"]
aktt_notify_twitter:
  - yes
aktt_tweeted:
  - 1

---
I wrote yesterday about [using a general purpose UML modelling tool to create project Benefit Maps][1].

In that [post][1] I described using Enterprise Architect&#8217;s ability to [create custom UML profiles][2] to create the beginnings of a [custom modelling language][3] for project benefits management.

In this article I walk through the basics of that UML profile.

### Classes

The first task was to model the core objects of the benefits model – Objectives, Benefits, Disbenefits, Business Changes and Enablers.

These are all modelled as [stereotypes][4] of the Requirement [metaclass][5]:

<p style="text-align: center;">
  <a href="https://www.synesthesia.co.uk/blog/wp-content/uploads/2010/12/brm-profile-01.gif"><img class="aligncenter size-full wp-image-22922" style="display: block; margin-left: auto; margin-right: auto;" title="brm-profile-01" src="https://www.synesthesia.co.uk/blog/wp-content/uploads/2010/12/brm-profile-01.gif" alt="" width="494" height="414" /></a>
</p>

The more observant of you will have noticed that there is also an [enumeration][6] called **BenefitvalueType**. this, together with the attributes on the **Benefit** and **Disbenefit** classes create a [tagged value][7] named “Value Type” in the final model, constrained to the different [Sigma Value Types][8].

The [Sigma Value Types][8] are used as a way of classifying benefits &#8211;  this aids with the identification of measures, and also stimulates a conversation with stakeholders about missing benefits.

### Relationships

The second part of the profile contains the relationships needed for the Benefits model. As I [noted before][1], I have decided to use [realisation][9] and [dependency][10] links to model different aspects of the Benefits model. These are included in the profile by creating new classes of the same name that redefine the relevant metaclasses, thus picking up all the default behaviour.

[<img class="aligncenter size-full wp-image-22925" style="display: block; float: none; margin-left: auto; margin-right: auto;" title="brm-profile-02" src="https://www.synesthesia.co.uk/blog/wp-content/uploads/2010/12/brm-profile-02.gif" alt="" width="246" height="666" />][11]

The profile also includes a redefinition of [Association][12], which I will use in the next part of the model, modelling Measures.

As always, I welcome comments!

 [1]: /2010/12/20/modelling-benefits-in-uml/
 [2]: http://www.sparxsystems.com/enterprise_architect_user_guide/8.0/modeling_languages/umlprofiles_2.html
 [3]: http://www.sparxsystems.com/enterprise_architect_user_guide/8.0/modeling_languages/extending_uml.html
 [4]: http://www.uml-diagrams.org/profile-diagrams.html#stereotype
 [5]: http://www.uml-diagrams.org/profile-diagrams.html#metaclass
 [6]: http://publib.boulder.ibm.com/infocenter/rtnlhelp/v6r0m0/index.jsp?topic=/com.ibm.xtools.modeler.doc/topics/cenum.html
 [7]: http://www.uml-diagrams.org/profile-diagrams.html#tagged-value
 [8]: http://books.google.com/books?id=2IfFQY_XrfAC&lpg=PA113&ots=r5fdUWFy3k&pg=PA113#v=onepage&q=sigma%20benefit%20value%20types&f=false
 [9]: http://www.uml-diagrams.org/class-diagrams.html#abstraction
 [10]: http://www.uml-diagrams.org/class-diagrams.html#dependency
 [11]: https://www.synesthesia.co.uk/blog/wp-content/uploads/2010/12/brm-profile-02.gif
 [12]: http://www.uml-diagrams.org/class-diagrams.html#association
