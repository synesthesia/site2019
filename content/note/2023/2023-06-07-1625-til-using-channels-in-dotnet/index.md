---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "TIL - using Channels in dotnet"
subtitle: ""
summary: "Using System.Threading.Channels to build async console tools"
authors: ["synesthesia"]
categories: []
tags: ["TIL","dotnet", "100DaysToOffload"]
lastmod: 2023-06-07T17:25:10+01:00
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

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---
## Context

Many of the code tools we build in a small non-software business relate to various forms of data cleanup. 

A classic example would be to read set of data from one system (or a spreadsheet), compare it with data from another system, make row-by-row decisions, and then create, delete or update rows in a system based on that decision.

These are usually console apps run from the developer's machine (typically we are looking at a couple of hundred thousand rows at most), and although they might only get used a few times a year, the code needs to be reasonably performant *and* understandable.

A typical tool will involve at least a few internet I/O operations for each row, as well as reading and writing files, so an asynchronous approach is pretty much essential.

Although the first temptation is always a "God class" that does everything in one long method, this always fails the maintainability test, and with large numbers of rows and/or complex transformations is often horrible to make performant. However when you break down the process into logical sections you are then faced with the challenge of passing data between those sections - tempting to do everything all at once in memory but that doesn't scale, and it can be hard to optimise the async / parallel bits of each stage.

This week's problem broke down into these requirements:

- read a spreadsheet of contact data that had been manually exported from our marketing automation
- match each row to the equivalent contact in CRM
- identify rows which failed to match on any of a handful of critical fields (i.e. historical sync failures)
- trigger existing cloud logic to resync the erroneous rows

## System.Threading.Channels

Although this capability has been around since Net Core 2.1, I'd not heard of it until recently.

I recommend the video [Working with channels in Net](https://learn.microsoft.com/en-us/shows/on-net/working-with-channels-in-net) to get a good overview.

The System.Threading.Channels namespace provides a set of synchronization data structures for passing data between producers and consumers asynchronously. The library targets .NET Standard and works on all .NET implementations.

Channels are an implementation of the producer/consumer conceptual programming model. In this programming model, producers asynchronously produce data, and consumers asynchronously consume that data. In other words, this model hands off data from one party to another. 

Options control the behavior of the channels, such as how many elements they're allowed to store and what happens if that limit is reached, or whether the channel may be accessed by multiple producers or multiple consumers concurrently.


See also:
  - [Channels - MSFT Learn](https://learn.microsoft.com/en-us/dotnet/core/extensions/channels)
  - [An Introduction to System.Threading.Channels](https://devblogs.microsoft.com/dotnet/an-introduction-to-system-threading-channels/)


## Wiring it all up

The basic design pattern I used was to have a class for each step of the process, with each wired up with at least one of:

- an input channel
- an output channel
- an error channel (this is shared across all the stages)

{{< figure src="channels-based-app.drawio.png" caption="Example app for checking marketing contacts - data flow between stages using via channels" numbered="true" >}}

I can't share the full code as it is inside as larger repo, however to give you some idea of the code, the Program class is responsible for all the wiring up, then setting each stage running:

```csharp

 // note I am using McMaster.Extensions.CommandLineUtils
 internal class Program
 {
    // setup arguments
    // ...

    public static Task<int> Main(string[] args)
    {
       // setup logging
       // ...
       try
       {
           // read configuration
           // ...
           // configure services
           // ...
           var app = new CommandLineApplication<Program>();
           app.HelpOption();
           app.Conventions
               .UseDefaultConventions()
               .UseConstructorInjection(sp);
           return app.ExecuteAsync(args);
       }
       catch (Exception ex)
       {
           Log.Fatal(ex, "Unhandled exception {message}", ex.Message);
           return Task.FromResult(1);
       }
       finally
       {
           Log.CloseAndFlush();
       }
    }

    private async Task<int> OnExecuteAsync()
    {
        // check arguments
        // ...

        var (errors, inputRows, matches, reSyncNeeded) = CreateChannels();

        // start the comparer
        _ = Task.Run(async delegate
        {
            await _contactComparer.CompareContacts(matches, reSyncNeeded, errors);
        });

        // start the matcher
        _ = Task.Run(async delegate
        {
            await _xrmMatcher.MatchRows(inputRows, matches, errors);
        });

        // feed the pipeline
        _ = Task.Run(async delegate
        {
            await _sheetReader.ReadInput(DataPath, inputRows, errors);
        });

        // start the resyncer
        await _resyncer.SyncContacts(reSyncNeeded, errors, Unsafe);

        // output the errors
        await foreach (var e in errors.Reader.ReadAllAsync())
        {
            _logger.LogWarning("{source}: {message}", e.Source, e.Message);
        }

        return 0;
    }

 }

```

Configuration of channels looks a bit like this:

```csharp
 private static (
     Channel<ErrorMessage> errors, 
     Channel<InputRow> inputRows, 
     Channel<MatchedPair> matches, 
     Channel<MatchedPair> reSyncNeeded)
     CreateChannels()
 {
     // create a channel to receive errors
     var errors =
         Channel.CreateUnbounded<ErrorMessage>(
             new UnboundedChannelOptions
             {
                 SingleWriter = false,
             });


     // create a channel to receive the input rows
     var inputRows = Channel.CreateBounded<InputRow>(
         new BoundedChannelOptions(1000)
         {
             SingleWriter = true,
             FullMode = BoundedChannelFullMode.Wait
         });

     // create a channel to receive the matched pairs
     var matches = Channel.CreateBounded<MatchedPair>(
         new BoundedChannelOptions(1000)
         {
             SingleWriter = true,
             FullMode = BoundedChannelFullMode.Wait
         });

     // create a channel to receive the pairs needing resync
     var reSyncNeeded = Channel.CreateBounded<MatchedPair>(
         new BoundedChannelOptions(10)
         {
             SingleWriter = true,
             FullMode = BoundedChannelFullMode.Wait
         });

     return (errors, inputRows, matches, reSyncNeeded);
 }
```

[#100DaysToOffload](https://100daystooffload.com/) 38/100
