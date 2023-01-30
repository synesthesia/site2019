---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Dataverse resilience experiment 4"
subtitle: "Using HttpClient directly plus Polly to access Dataverse"
summary: "A fourth approach to parallel record creation in Dataverse using HttpClient with retry logic from Polly"
authors: ["synesthesia"]
categories: []
tags: ["dataverse", "resilience", "100DaysToOffload"]
lastmod: 2023-01-30T09:36:56Z
featured: false
draft: false
type: note
slug: "dataverse-resilience-experiment-4"

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
url_code: "https://github.com/synesthesia/dataverse-resilience/tree/29245c3a977e3d1639a85331587165fe37519fb7"
---
## Polly

[Polly](https://github.com/App-vNext/Polly/wiki) is a .NET resilience and transient-fault-handling library that allows developers to express policies such as Retry, Circuit Breaker, Timeout, Bulkhead Isolation, Rate-limiting and Fallback in a fluent and thread-safe manner.

It has many helper extensions, including a high-level of integration with `IHttpClientFactory` and Typed Clients.

## Code changes

The code can be seen at [29245c3](https://github.com/synesthesia/dataverse-resilience/tree/29245c3a977e3d1639a85331587165fe37519fb7).

The only [change](https://github.com/synesthesia/dataverse-resilience/commit/29245c3a977e3d1639a85331587165fe37519fb7) is in the DI configuration of our Typed Client, where we add a [Polly](https://github.com/App-vNext/Polly/wiki) [WaitAndRetryAsync](https://github.com/App-vNext/Polly/wiki/Retry) policy.

If the retry is as a result of Dataverse signalling "Too Many Requests" this policy pauses the request for the number of seconds signalled in the response header, otherwise it waits for an exponentially increasing number of seconds before retrying.

```csharp
public static class ServiceCollectionExtensions
{
    public static IServiceCollection UseDataVerseHttpClient(
    this IServiceCollection services)
    {
        services.AddHttpClient<IDataverseClient, DataverseClient>(
            // ....
        )
        .ConfigureHttpMessageHandlerBuilder(builder =>
        {
            //....
        })
        .AddPolicyHandler((s, request) =>
            HttpPolicyExtensions.HandleTransientHttpError()
            .OrResult(httpResponseMessage => httpResponseMessage.StatusCode == System.Net.HttpStatusCode.TooManyRequests)
            .WaitAndRetryAsync<HttpResponseMessage>(
                retryCount: 5,
                sleepDurationProvider: (count, response, context) =>
                {
                    int seconds;
                    var headers = response.Result.Headers;
                    if (headers.Contains("Retry-After"))
                    {
                        seconds = int.Parse(headers.GetValues("Retry-After").FirstOrDefault());
                    }
                    else
                    {
                        seconds = (int) Math.Pow(2, count);
                    }
                    return TimeSpan.FromSeconds(seconds);
                },
                onRetryAsync: (outcome, timespan, retryAttempt, context) =>
                {
                    context["RetriesInvoked"] = retryAttempt;
                    s.GetService<ILogger<DataverseClient>>()?
                        .LogWarning("Status {statusCode} - delaying for {delay}ms, then do retry {retry}.",
                            outcome.Result.StatusCode,
                            timespan.TotalMilliseconds, 
                            retryAttempt);
                    return Task.CompletedTask;
                })
            );
    }
}
```

## Experiment 4 - HttpClient with Polly AwaitAndRetry

I jumped straight in with the configuration that, in [the previous experiment]({{< relref  "..//2023-01-27-0702-dataverse-resilience-experiment-3/index.md" >}}) , had caused the job to crash out, that is 3000 records and a `MaxDegreeOfParallelism` of 12.

The result was that there were a few retries during the process, but the run completed successfully, creating the records in 1,513 seconds (then 131 seconds to delete).

Although the good news is the increase in reliability, the overall performance is nearly 20% slower than the previous experiment running without Polly and constraining the degrees of parallelism to 8. 

In case this was an issue caused my laptop I killed a couple of other things that were running in the background and chewing up CPU and re-ran the test, and got results of 1,411 seconds to create 3,000 records, so now "only" 10% slower than achieved without the retry logic.

## Reflections

I'm cautious about drawing too many conclusions about the speed change - from a visual inspection of the log there were not that many retries, but many create requests seemed to be taking about 4-6 seconds to complete, longer than I was seeing last week.

My home internet speed checks look roughly the same as last week and in line with the expected service - 74MB/s down and 19Mb/s up.

However if I was going to the next level of testing I would want to run multiple experiments against the Dataverse instance and against other sandbox instances in the same region. I have an unproven suspicion that sometimes Sandbox instances are not fully "warmed up" until they have been used a bit.

In the next post I will review the tests so far and plot out some further things I want to explore.

## See also

- [Polly](https://github.com/App-vNext/Polly/wiki) 

- [Implement HTTP call retries with exponential backoff with IHttpClientFactory and Polly policies (MSFT)](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/implement-http-call-retries-exponential-backoff-polly)

- [Service protection API limits - How to re-try (MSFT)](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/api-limits?tabs=webapi#retry-operations)

- [Configuring policies to use services registered with DI, such as ILogger<T>](https://github.com/App-vNext/Polly/wiki/Polly-and-HttpClientFactory#configuring-policies-to-use-services-registered-with-di-such-as-iloggert)

This post is part of [#100DaysToOffload](https://100daystooffload.com/) and is post 10/100
