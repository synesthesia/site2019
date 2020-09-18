---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Sagas in Durable Functions - 1"
subtitle: ""
summary: ""
authors: ["synesthesia"]
categories: []
tags: ["durablefunctions", "EAI", "patterns"]
lastmod: 2020-09-14T07:45:54+01:00
featured: false
draft: true
type: note

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
projects: []
---
## The problem

We had the challenge of rewriting an integration between two cloud based services (a CRM system and an accounting system). The volume of transactions is low (at most a few hundred per day) but reliability is essential. Transactions must be atomic across the two systems - for example if an invoice cannot be correctly created in the accounting system not only must that system be left in its original state but any changes (e.g. record status) made in the CRM system must be rolled back.

Overall our key requirements are:

* atomicity of transactions across the two systems
* idempotency of operations - however many times an action is repeated the resulting system state should be the same
* observability of the integration - for example we may want to provide a web page that shows the state of all transactions within a certain time frame
* a range of triggering options, for example in the legacy integration we are replacing transactions are fired in a batch on a cron schedule, but we might want to make the integration fire every time a relevant record is created in the source system
* minimise the standing cost - we only want to pay for compute when it is being used

This is a common problem in systems integration, and there is sufficient consensus on the overall approach that a pattern has been described in the literature - the Saga Pattern, for example:

* [MicroService Architecture - Pattern:Saga](https://microservices.io/patterns/data/saga.html)
* [Saga distributed transactions pattern](https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/saga/saga)
* [Enterprise Integration Patterns - Compensating Action](https://www.enterpriseintegrationpatterns.com/patterns/conversation/CompensatingAction.html)

## Azure Durable Entities

[Azure Durable Functions](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview?tabs=csharp) augment Azure Functions with support for reliable long-lived processes. In turn, Durable Functions have recently been joined by [Durable Entities](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-entities?tabs=csharp) which provide a capability to manage state in a thread-safe and storage-independent way, exposed to the application as functions. 

On an initial look Durable Entities are a good candidate to store the state of a transaction as it passes through our integration.

## Proof of concept

