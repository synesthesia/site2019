---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Dataverse resilience experiment 1"
subtitle: "Trying to bulk create records using ServiceClient's built-in retry logic"
summary: "I try a naive approach to parallel record creation using ServiceClient and example code from the documentation."
authors: ["synesthesia"]
categories: []
tags: ["dataverse", "resilience", "100DaysToOffload"]
lastmod: 2023-01-26T09:09:29Z
featured: false
draft: false
type: note

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: false

url_code: "https://github.com/synesthesia/dataverse-resilience/tree/7fdc7160446942b4dbea8bc8ad76bab3bcdfe88e"

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: ["dataverse-resilience"]


---
## The code

If you are working with the `ServiceClient` class from [`Microsoft.PowerPlatform.Dataverse.Client`](https://github.com/microsoft/PowerPlatform-DataverseServiceClient) then there is built-in logic to handle service protection errors from the remote service.

|Property|Comment|
|----|----|
|`MaxRetryCount`|Maximum number of retry attempts after receiving an error from the connection, default 10|
|`RetryPauseTime`|Time to wait before retry when response is `503 Service unavailable` , default 5 seconds NB this is from a quick scan of source code, may not be accurate!|

If the remote error is because of a [Service Protection response](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/api-limits?tabs=sdk), then the retry period is calculated from the error reponse Retry-After.

For the first experiment I used the rather simplistic approach from [this Microsoft Example code](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/xrm-tooling/sample-tpl-crmserviceclient). 

The main loop looks like this:

```csharp
#pragma warning disable CS1998
public async Task StartAsync(CancellationToken cancellationToken)
#pragma warning restore CS1998
{
    _logger.LogInformation("Worker.StartAsync()");
    _logger.LogInformation("Dataverse ServiceClient.IsReady: {0}", _xrmService.IsReady);
    _logger.LogInformation("Dataverse recommended max parallelism : {0}", _xrmService.RecommendedDegreesOfParallelism);
    OptimiseConnectionSettings();
    var startTime = DateTime.UtcNow;
    
    CreateAndDeleteAccounts(10000);
    
    var secondsForRun = (DateTime.Now - startTime).TotalSeconds;
    _logger.LogInformation($"Finished in {Math.Round(secondsForRun)} seconds.");
    
    _logger.LogCritical("Calling host to end application");
    
    _hostApplicationLifetime.StopApplication();
}
```

The full code for this experiment can be seen at [7fdc716](https://github.com/synesthesia/dataverse-resilience/tree/7fdc7160446942b4dbea8bc8ad76bab3bcdfe88e)TODO, however the part of interest is how the parallel record creation is set up using a synchronous `Parallel.ForEach` loop:

```csharp
private ConcurrentBag<EntityReference> CreateEntities(List<Entity> entities)
{
    var createdEntityReferences = new ConcurrentBag<EntityReference>();

    Parallel.ForEach(entities,
        new ParallelOptions() { MaxDegreeOfParallelism = _xrmService.RecommendedDegreesOfParallelism },
        () => _xrmService.Clone(), //Clone the ServiceClient for each thread
        (entity, loopState, index, threadLocalSvc) =>
        {
            // In each thread, create entities and add them to the ConcurrentBag
            // as EntityReferences
            createdEntityReferences.Add(
                new EntityReference(
                    entity.LogicalName,
                    threadLocalSvc.Create(entity)
                )
            );

            return threadLocalSvc;
        },
        (threadLocalSvc) =>
        {
            //Dispose the cloned ServiceClient instance
            if (threadLocalSvc != null)
            {
                threadLocalSvc.Dispose();
            }
        });

    //Return the ConcurrentBag of EntityReferences
    return createdEntityReferences;
}
```

Deletion of records as a batch follows a similar pattern.

## The experiment

On the first approach I tried to create/delete 10,000 accounts, running on my laptop from inside the Visual Studio Debugger, with other tasks still happening, and over domestic Fibre-To-Cabinet internet. 

The process eventually crashed out  with a connection error after about 90 mins, with ~8,900 records created.

During the run, a number of retry errors were visible in the log, all related to aggregate processing time in a 300 second window, for example:

```console
[10:52:24 ERR] Failed to Execute Command - Create : RequestID=c9c5de1e-8ebf-4c58-a13f-1455f7bf7e07 : Create To Dataverse via IOrganizationService duration=00:00:00.0751690 ExceptionMessage = Combined execution time of incoming requests exceeded limit of 1200000 milliseconds over time window of 300 seconds. Decrease number of concurrent requests or reduce the duration of requests and try again later.
Source: System.Private.ServiceModel
Method: HandleReply
Error: Message: Combined execution time of incoming requests exceeded limit of 1200000 milliseconds over time window of 300 seconds. Decrease number of concurrent requests or reduce the duration of requests and try again later.
ErrorCode: -2147015903
Trace:
Error Details   :
Retry-After     : 00:00:34.2260000
```

Because the code limits the degrees of parallelism to the recommended settings returned from the Dataverse service, I didn't expect to see errors with too many requests in parallel, and that was true in practice.

It's worth noting that the instance I was running against has 7 plugins configured on the Create message of the Account entity. From a quick scan of log messages it looks like individual Account creation was taking approximately 2 to 4 seconds in most cases. Although it is technically possible to suppress plugin operation (with the right privileges), this risks creating records that do not comply with business rules, so in practice of limited use unless you build further logic into your import tool to update the accounts after creation. 

Because the main (large) run had failed I did a couple of shorter runs to get some rough data to baseline future tests. Times rounded to nearest second.

- Creation / deletion of 100 records took 55 seconds, of which 46 seconds were record creation. No retries were seen.
- Creation / deletion of 1000 records took 508 seconds, of which 466 seconds were record creation. Retries for aggregate prodcessing time were seen.

## Reflections

- It looks like the trigger for retries was aggregate processing time (those plugins!), so using batch requests to create multiple accounts in one network request unlikely to be of any benefit.

- I forgot to disable the Affinity cookie, which meant we were probably overloading a single server (although this experiment was agaisnt a sandbox instance, so it might only have one server).

- The way in which `Parallel.ForEach` works is to divide the input collection into equal buckets, and assign a bucket per parallel thread. If one particular subset of requests is significantly faster, then that thread will terminate before the others, wasting processing capability (a [Leaky Abstraction](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/) - we need to know about the inner workings of the method).

- This operation is largely not bound by the processor on which we are running it - network requests and remote processing are more significant. Therefore it would be a good fit for an asynchronous model if we can launch more requests and still stay within the API limits.

- Although 10,000 records is a completely reasonable number for an ETL scenario, for this experimental setup it makes the iteration time of tests too long, and too vulnerable to connection errors (obviously real code would need to handle these gracefully). For future tests I will use creation and deletion of 1000 records, for which our baseline is 508 seconds - 466 seconds for record creation and 42 for deletion. 



[#100DaysToOffload](https://100daystooffload.com/) 7/100

