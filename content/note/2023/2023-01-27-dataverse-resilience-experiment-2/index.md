---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Dataverse resilience experiment 2"
subtitle: "Still trying to bulk create records using ServiceClient's built-in retry logic, but using async"
summary: "A second approach to parallel record creation using ServiceClient but using Parallel.ForEachAsync"
authors: ["synesthesia"]
categories: []
tags: ["dataverse", "resilience", "100DaysToOffload"]
lastmod: 2023-01-27T00:00:02Z
featured: false
draft: false
type: note
url_code: "https://github.com/synesthesia/dataverse-resilience/tree/899df96aca3a21b1b000808e9b33d45d75f29e57"
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
## The code

For this experiment I followed this [Microsoft guidance](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/send-parallel-requests?tabs=sdk) to use `Parallel.ForEachAsync`.

The full code can be seen at [899df9](https://github.com/synesthesia/dataverse-resilience/tree/899df96aca3a21b1b000808e9b33d45d75f29e57), but the key method looks like this:

```csharp
private async Task CreateAndDeleteAccounts(int numberOfAccounts)
{
    var accountsToCreate = new List<Entity>();
    var count = 0;
    while (count < numberOfAccounts)
    {
        var account = new Entity("account")
        {
            ["name"] = $"Account {count}"
        };
        accountsToCreate.Add(account);
        count++;
    }

    var createdIds = new ConcurrentBag<Guid>();

    try
    {
        _logger.LogInformation($"Creating and deleting {accountsToCreate.Count} accounts");

        var startCreate = DateTime.Now;

        var parallelOptions = new ParallelOptions()
        {
            MaxDegreeOfParallelism =
                _xrmService.RecommendedDegreesOfParallelism
        };

        await Parallel.ForEachAsync(
            source: accountsToCreate,
            parallelOptions: parallelOptions,
            async (entity, token) =>
            {
                createdIds.Add(await _xrmService.CreateAsync(entity, token));
            });

        var secondsToCreate = (DateTime.Now - startCreate).TotalSeconds;

        _logger.LogInformation($"Created {accountsToCreate.Count} accounts in  {Math.Round(secondsToCreate)} seconds.");

        _logger.LogInformation($"Deleting {createdIds.Count} accounts");
        var startDelete = DateTime.Now;

        await Parallel.ForEachAsync(
            source: createdIds,
            parallelOptions: parallelOptions,
            async (id, token) =>
            {
                await _xrmService.DeleteAsync("account", id, token);
            });

        var secondsToDelete = (DateTime.Now - startDelete).TotalSeconds;

        _logger.LogInformation($"Deleted {createdIds.Count} accounts in {Math.Round(secondsToDelete)} seconds.");

    }
    catch (AggregateException ae)
    {
        var inner = ae.InnerExceptions.FirstOrDefault();
        if (inner != null)
        {
            throw inner;
        }
    }
}

```

## The experiment

On the first trial I tried to create/delete 1,000 accounts, on a similar setup to last time, running with `MaxDegreeOfParallelism` set to the reported `RecommendedDegreesOfParallelism` from the `ServiceClient` instance. This performed ~7% faster than the synchronous approach in experiment 1 - a total of 469 seconds of which 37 seconds were for record deletion. 

As a small tweak I ran the code again but with doubled `MaxDegreeOfParallelism` and this was noticeably worse overall, running into a lot of long retry timeouts because of aggregated processing time: a total of 769 seconds (of which 87 were to delete).

## Reflections

- perhaps not as much improvement as I expected
- tuning the `MaxDegreeOfParallelism`  is critical
- next steps will be to try using `HttpClient` directly, with `Polly` to implement the retry logic

[#100DaysToOffload](https://100daystooffload.com/) 8/100
