---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Dataverse resilience pause and reflect"
subtitle: ""
summary: "A short reflection on the Dataverse resilience tests so far"
authors: ["synesthesia"]
categories: []
tags: ["dataverse", "100DaysToOffload"]
lastmod: 2023-01-31T06:29:43Z
featured: false
draft: false
type: note
slug: "dataverse-resilience-pause-and-reflect"

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: ["dataverse-resilience"]
---
## Tests so far

I have now documented some fairly pragmatic and uncontrolled tests of four different approaches to calling Dataverse from client code:

- using `ServiceClient` in a `Parallel.ForEach` loop, setting maximum parallelisation based on the recommended settings from the Dataverse instance
- using `ServiceClient` in a `Parallel.ForEachAsync` loop, setting maximum parallelisation based on the recommended settings from the Dataverse instance
- using `HttpClient` without any retry logic and with varying degrees of parallelisation
- using `HttpClient` with `Polly`-based retry logic and with varying degrees of parallelisation

Of these, the fastest for small volumes seems to be to use HttpClient on its own, however that speed comes with a low resilience: there is an unpredictable threshold where the volume of calls, the amount of server-side processing or the chosen number of parallel tasks can all tip the process over into error.

Based on these quick samples I would mirror the advice in the Microsoft documentation - if your client is written in C# and you are happy to let the `ServiceClient` control the retry logic then that should be your first choice, choosing `async` operations for best speed. I would suggest that another factor is that your client app is running on a single node.

If you are calling Dataverse from a more complex application, potentially with multiple scaled-out nodes, then I think further investigation is needed.

## Next steps

As I mentioned in the project header for these posts, another significant area of use cases for us is Dataverse client code running in Azure Functions. 

Most of the applications we host that way are small volume functions in our overall suite that just help glue everything together. With those it is almost a case of "throw the code into Functions and let it run" (which is sort of the point of serverless, perhaps!): certainly, it is the case that for those apps the biggest percentage of our time is spent developing and testing the business logic.

However we have a couple of larger integrations where the volume of Dataverse calls can be significant, for example when we are pulling sends/clicks/opens/bounces from our Marketing Automation into Dataverse. In that case we have found issues arising which we have had to work around in a fairly fast "just get this working" sort of way. Again, since we are talking about real life with a small development team, we have never taken the time to explore properly how our workloads drive the underlying [Consumption Plan scaling](https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-perf-and-scale) and how that might impact our use of downstream services.

So before I can go further with understanding the best ways to talk to Dataverse at scale, I need to diverge slightly and spend some time experimenting with the behaviour of the Azure Functions platform.

[#100DaysToOffload](https://100daystooffload.com/) 11/100
