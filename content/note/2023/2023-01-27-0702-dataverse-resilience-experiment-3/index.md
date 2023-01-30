---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Dataverse resilience experiment 3"
subtitle: "Using HttpClient directly to access Dataverse"
summary: "A third approach to parallel creation in Dataverse using HttpClient without any retry logic (naive starting point)"
authors: ["synesthesia"]
categories: []
tags: ["dataverse", "resilience", "100DaysToOffload"]
lastmod: 2023-01-27T07:02:29Z
featured: false
draft: false
type: note
slug: "dataverse-resilience-experiment-3"

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
url_code: "https://github.com/synesthesia/dataverse-resilience/tree/99d01bfe8d5aa85fab1b1fe99ff87aa3296a0f01"
---
## Initial code

The first version of the code can be seen at [99d01bf](https://github.com/synesthesia/dataverse-resilience/tree/99d01bfe8d5aa85fab1b1fe99ff87aa3296a0f01).

This code uses a class `DataverseClient`, to contain a [typed HttpClient](https://learn.microsoft.com/en-us/dotnet/core/extensions/httpclient-factory#typed-clients) configured for use with Dataverse:

```csharp
using DVConsole.Model.DTO;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Text;

namespace DVConsole.Services;

/// <summary>
/// <inheritdoc cref="IDataverseClient"/>
/// </summary>
public class DataverseClient : IDataverseClient
{
    private HttpClient _client;
    private ILogger<DataverseClient> _logger;

    public DataverseClient(
        HttpClient httpClient,
        ILogger<DataverseClient> logger)
    {
        _client = httpClient;
        _logger = logger;
       
    }

    /// <summary>
    /// Get ID of Dataverse user
    /// </summary>
    /// <returns></returns>
    public async Task<Guid?> GetUserId()
    {
        var response = await _client.GetAsync("WhoAmI");
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        var whoAmIResponse = JsonConvert.DeserializeObject<WhoAmIResponse>(content);
        return whoAmIResponse?.UserId;
    }

    /// <summary>
    /// Create record
    /// </summary>
    /// <param name="entityCollection"></param>
    /// <param name="data"></param>
    /// <param name="ct"></param>
    /// <returns></returns>
    public async Task<Guid> Create(
        string entityCollection,
        object data,
        CancellationToken ct = default)
    {
        var request = new HttpRequestMessage(HttpMethod.Post, entityCollection);
        var jsonData = JsonConvert.SerializeObject(data);
        request.Content = new StringContent(jsonData, Encoding.UTF8, "application/json");

        var response = await _client.SendAsync(request, ct);

        await EnsureSuccessStatusCode(response, ct);
        var idGuid = GetEntityIdFromResponse(response);
        return idGuid;
    }

    
    /// <summary>
    /// delete record
    /// </summary>
    /// <param name="entityCollection"></param>
    /// <param name="entityId"></param>
    /// <param name="ct"></param>
    /// <returns></returns>
    public async Task Delete(string entityCollection, Guid entityId, CancellationToken ct = default)
    {
     
        var response = await _client.DeleteAsync(
            $"{entityCollection}({entityId})",
            ct);

        await EnsureSuccessStatusCode(response, ct);
    }

    /*
     * helper methods not shown in this listing
     * see GitHub for full source
     */
    
}
```

The configuration is done in `ServiceCollectionExtensions.UseDataVerseHttpClient(this IServiceCollection services)`:

```csharp
/// <summary>
/// Configure the app to use HttpClient to access Dataverse
/// </summary>
/// <param name="services"></param>
/// <returns></returns>
/// <exception cref="InvalidOperationException"></exception>
public static IServiceCollection UseDataVerseHttpClient(
    this IServiceCollection services)
{

    services.AddHttpClient<IDataverseClient, DataverseClient>(
            (sp, client) =>
            {
                var options = sp.GetRequiredService<IOptions<DataVerseOptions>>();
                var config = options.Value;

                // Set the base address of the named client.
                client.BaseAddress = new Uri(config.InstanceUrl + "/api/data/v9.2/");

                var headers = client.DefaultRequestHeaders;

                // Add a user-agent default request header.
                headers.UserAgent.ParseAdd("dotnet-docs");

                headers.Add("OData-MaxVersion", "4.0");
                headers.Add("OData-Version", "4.0");
                headers.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

            })
        .ConfigureHttpMessageHandlerBuilder(builder =>
        {
            builder.PrimaryHandler = builder.Services.GetRequiredService<OAuthMessageHandler>();
            
        });

    services.AddTransient<OAuthMessageHandler>(sp =>
    {
        var options = sp.GetRequiredService<IOptions<DataVerseOptions>>();
        var config = options.Value;

        if (config?.InstanceUrl == null)
        {
            throw new InvalidOperationException(
                "InstanceUrl is not set in the configuration");
        }
        var ap = sp.GetRequiredService<IConfidentialClientApplication>();

        var handler = new OAuthMessageHandler(
            config.InstanceUrl,
            ap,
            new HttpClientHandler() {UseCookies = false});
        
        return handler;
    });

    services.AddSingleton<IConfidentialClientApplication>(sp =>
    {
        var options = sp.GetRequiredService<IOptions<DataVerseOptions>>();
        var config = options.Value;

        var authProvider = ConfidentialClientApplicationBuilder
            .Create(config.ClientId)
            .WithClientSecret(config.ClientSecret)
            .WithAuthority(AzureCloudInstance.AzurePublic, config.TenantId)
            .Build();

        return authProvider;
    });

    return services;
}

```
Authentication is done by the class `OAuthMessageHandler`:

```csharp
/// <summary>
/// A delegating HTTP handler that authenticates to Dataverse using the Microsoft.Identity.Client library.
/// </summary>
/// <remarks>see https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/enhanced-quick-start</remarks>
public class OAuthMessageHandler : DelegatingHandler
{
    private readonly IConfidentialClientApplication _authProvider;
    private readonly string[] _scopes;

    public OAuthMessageHandler(
        string serviceUrl, 
        IConfidentialClientApplication authProvider,
        HttpMessageHandler innerHandler)
        : base(innerHandler)
    {
        _authProvider = authProvider;
        var scope = serviceUrl + "//.default";
        _scopes = new[] { scope };
    }

    private AuthenticationResult GetToken()
    {
        return _authProvider.AcquireTokenForClient(_scopes).ExecuteAsync().Result;
    }

    protected override  Task<HttpResponseMessage> SendAsync(
              HttpRequestMessage request, System.Threading.CancellationToken cancellationToken)
    {
        var token = GetToken(); 
        var authHeader = new AuthenticationHeaderValue("Bearer", token.AccessToken);
        request.Headers.Authorization = authHeader;
        return base.SendAsync(request, cancellationToken);
    }
}
```

The calling method is very similar to the last experiment, but with a hard-coded `MaxDegreeOfParallelism` set to the value we saw in previous experiments agaisnt this Dataverse instance:

```csharp
var createdIds = new ConcurrentBag<Guid>();

try
{
    _logger.LogInformation($"Creating and deleting {accountsToCreate.Count} accounts");

    var startCreate = DateTime.Now;

    var userId = await _xrmClient.GetUserId();

    _logger.LogInformation($"UserId: {userId}");

    var parallelOptions = new ParallelOptions()
    {
        MaxDegreeOfParallelism = 8
    };
    
    await Parallel.ForEachAsync(
        source: accountsToCreate,
        parallelOptions: parallelOptions,
        async (entity, token) =>
        {
            createdIds.Add(await _xrmClient.Create("accounts", entity, token));
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
             await _xrmClient.Delete("accounts", id, token);
         });

    var secondsToDelete = (DateTime.Now - startDelete).TotalSeconds;

    _logger.LogInformation($"Deleted {createdIds.Count} accounts in {Math.Round(secondsToDelete)} seconds.");

}
// ....
```

## Experiment 3 - HttpClient with no resilience tools applied

In the first naive version of this experiment I just used the above code, calling Dataverse using HttpClient directly without any resilience policies applied.

For 100 records this worked well, taking 46 seconds to create and 6 seconds to delete. Again from a scan of the logs the round-trip Http request/response is taking about 3-4 seconds.

For 1000 records the app took 432 seconds to create and 46 seconds to delete. I was extremely surprised not to see any errors from Service Protection limits on this run. Again there is a time improvement for record creation compared to the previous experiment, this time a further reduction of ~ 7%.

As I need to provoke some API errors before I add retry policies, I ran the code again on 3,000 records, again no errors, created 3,000 in 1,277 seconds (then 125 seconds to delete), so still scaling approximately linearly.

At this point I am really confused, so before trying a run of 10,000 records, decide to try 3,000 records again but with a higher degreee of parellism (12). This time I was able to provoke error code ` 0x80072321`:

```
Combined execution time of incoming requests exceeded limit of 1200000 milliseconds over time window of 300 seconds. Decrease number of concurrent requests or reduce the duration of requests and try again later.
```
after just 328 seconds, with only 754 accounts created.

## Reflections

- using `HttpClient` directly gives a speed increase compared to the `ServiceClient` approach
- without adding any retry logic, there is an unpredictable throughput limit at which point the code is likely to crash
- in the next experiment I will add resilience logic using [Polly](https://github.com/App-vNext/Polly)


[#100DaysToOffload](https://100daystooffload.com/) 9/100
