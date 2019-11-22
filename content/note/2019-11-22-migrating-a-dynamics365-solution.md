---
type: note
slug: "2019-11-22-migrating-a-dynamics365-solution"
featured: false
draft: false
title: "Migrating a Dynamics365 solution"
subtitle: 
summary: 
authors: ["synesthesia"]
categories: ["quick notes"]
tags: ["dynamics365"]
date: 2019-11-22T18:54:00-00:00
---

A bit out of order[^1] but capturing this week's work to migrate one of our legacy Dynamics solutions into our new architecture.

The solution in question contained only business logic - about half a dozen plugins, and similar numbers of workflow steps and a similar number of workflows  (including custom actions),

## Removing ILMerge

Having already moved a few plugins I knew there were some challenges in getting away from the use of ILMerge (one of our goals). In the original source of this solution we use ILMerge for two assemblies:

- a service layer abstracted out from the plugins and workflow steps, to allow common code across the plugin and workflow assemblies, and to facilitate testing
- our model assembly, containing earlybound  classes and a few entity extension helpers, we distribute this via NuGet to all projects that need it

Although we are migrating all of our server-side business logic into a single Dynamics solution, we intend to keep multiple assemblies (and therefore multiple VS projects) to provide more manageable encapsulation of code.

The "obvious" answer was to replace the shared service and shared model assemblies with [shared source projects](https://dev.to/rionmonster/sharing-is-caring-using-shared-projects-in-aspnet-e17) linked form the workflow and plugin assemblies. 

That left the challenge of [generating the earlybound classes](https://docs.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/org-service/create-early-bound-entity-classes-code-generation-tool).

The approaches tried were: 

- using the [spkl](https://github.com/scottdurow/SparkleXrm/wiki/spkl) task runner - we are already using this for scripted deployment and registration of plugins and workflow steps
- using  the [XrmToolBox](https://www.xrmtoolbox.com) [earlybound generator plugin](https://www.xrmtoolbox.com/plugins/DLaB.Xrm.EarlyBoundGenerator/)
- porting across the technique we use to build our existing NuGet-distributed model - a VS project that builds custom code filters then shells to CrmSvcUtil to generate the classes - a final script copies the generated code to wherever it is needed in the overall solution 

We settled on the last one: spkl has an [open issue](https://github.com/scottdurow/SparkleXrm/issues/263) that kept breaking our code;  the XrmToolBox plugin worked but generated lots of case differences that broke our existing code.

## Testing

The second major area of work has been to get our unit tests working correctly, and to start adding some integration tests where appropriate.

The major task has been refactoring legacy tests to use a consistent approach - we now use xunit, FakeXrmEasy and FluentAssertions as our standard tools, with AutoFixture and XBehave added where needed. 

Some of our legacy tests were using MSTest, Moq and Castle Windsor (as an auto mocking container) in various combinations, so these have been refactored out - not only does this make for consistency, but also terser easier-to-read tests. 

Running tests showed up a couple of issues where the code we were working on called custom actions that we haven't yet ported. On reflection this is a strong "smell" that our previous split of functionality into separate Dynamics solutions wasn't right. Now we are moving to all back-end logic in a single Dynamics solution the easy refactor is to replace the call to the custom action with a direct  call to the service class that backs it.

This process has also surfaced areas that perhaps have insufficient test coverage - at some point we will need to revisit, especially around the more critical bits of logic.

## Reflection

A task which I thought might take about three days (interspersed with other work) ended up taking five , mainly because of the issues above. The positive outcome is that the common early bound classes problem is resolved. I anticipate the testing issues will continue.



[^1]: I haven't yet posted about the context of this project, although there are a few initial notes in [FedWiki](https://code.wiki.synesthesia.co.uk/view/welcome-visitors/view/crm-reboot)
