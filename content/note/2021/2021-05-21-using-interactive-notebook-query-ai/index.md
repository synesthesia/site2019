---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Querying Application Insights using  an Interactive Notebook"
subtitle: "Using .Net interactive in a Jupyter notebook to query application logs"
summary: "Using .Net interactive in a Jupyter notebook to query application logs"
authors: ["synesthesia"]
categories: []
tags: ["notebooks", "dotnet interactive"]
lastmod: 2021-05-21T11:21:46+01:00
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
Although the most prominent use  of interactive notebooks is in data science and statistics, to steal an idea from [Rob Sewell](https://www.youtube.com/watch?v=W-F0gO7dVOE), they  also hold great  potential for creating actionable documentation for common operational incidents.

A common operational scenario is the need to query application log  data to understand where and when a  fault  is occurring. 

This note book example uses the [.Net Interactive shell](https://github.com/dotnet/interactive) to allow the use  of C# code to query Azure Application Insights. Code is [here](https://gist.githubusercontent.com/synesthesia/e7e5a64b52acd9fb89dbcf3c2d13477f/raw/cc4417c0ce44a33e488b7cac7e488bfab562242c/query-ai-net.ipynb).

The rest of this page is the actual notebook (with  sample results) exported to  Markdown.

***

## Querying  application insights - C# version

To run this notebook you need to have .Net Interactive installed on your machine:

### Install .Net Interactive

- as a  minimum  install [Net Core 3.1](https://dotnet.microsoft.com/download)

- In an ordinary console, install the dotnet interactive global tool:
  ```
  dotnet tool install --global Microsoft.dotnet-interactive
  ```

**WARNING** This notebook does not work in Azure Data Studio.  This is  because it reads settings from a local  environment  file. Azure Data Studio sets the wrong value for current directory, see [microsoft/azuredatastudio:12965](https://github.com/microsoft/azuredatastudio/issues/12965).

It  **does**  work in `nteract` or  `Jupyter`,  see below for  installing one or both of these tools.


### Installing Jupyter

- as a  minimum  install [Net Core 3.1](https://dotnet.microsoft.com/download)
- [install Anaconda](https://www.anaconda.com/products/individual)
- Open the Anaconda Prompt (Windows) or Terminal (macOS) and verify that Jupyter is installed and present on the path:
  ```
  jupyter kernelspec list
      python3        ~\jupyter\kernels\python3
  ```
- Make sure  you have  .Net Interactive  installed  as at the top

- Install the .NET kernel to Jupyter by running the following within your Anaconda Prompt:
  ```
  dotnet interactive jupyter install
    [InstallKernelSpec] Installed kernelspec .net-csharp in ~\jupyter\kernels\.net-csharp
    .NET kernel installation succeeded
  
    [InstallKernelSpec] Installed kernelspec .net-fsharp in ~\jupyter\kernels\.net-fsharp
    .NET kernel installation succeeded
   
    [InstallKernelSpec] Installed kernelspec .net-powershell in ~\jupyter\kernels\.net-powershell
    .NET kernel installation succeeded
   ```

- You can verify the installation by running the following again in the Anaconda Prompt:
  ```
  jupyter kernelspec list
    .net-csharp    ~\jupyter\kernels\.net-csharp
    .net-fsharp    ~\jupyter\kernels\.net-fsharp
    .net-powershell ~\jupyter\kernels\.net-powershell
    python3        ~\jupyter\kernels\python3
  ```
  
- to run  Jupyter
  - open an anaconda prompt
  - type `jupyter notebook`
  - wait for web  browser to open to the local Jupyter server
  - browse  to the notebook you want
  
### Installing nteract

- [download the desktop app installer](https://nteract.io/applications)
- run the installer
- [install the .Net kernels](https://nteract.io/kernels/dotnet)
- run the app

## What does this notebook do?

This notebook shows an example of  querying  Application Insights using   C#  and the helper library ` Microsoft.Azure.ApplicationInsights.Query`, a wrapper over the Applicaiton Insights REST API

#### Install additional dependencies


```C#
#r "nuget: Microsoft.Azure.ApplicationInsights.Query, 1.0.0"

```

#### Read secrets from config  file

To get an Application Id and API Secret go to your Applicaton Insights instance in the Azure portal, and  access **Configure** \ **API Access**.

Add the values into a local file `.env.local` in  the format KEY=VALUE

**DO NOT** check these values into source control.


```C#
using System;
using System.IO;

var here =  Directory.GetCurrentDirectory();
Console.WriteLine(here); // added this when testing  issues with Azure Data  Studio

var filePath = ".env.local";
if (!File.Exists(filePath)) 
{
    Console.Error.WriteLine("Cannot find env file");
}
else 
{
    foreach (var line in File.ReadAllLines(filePath))
    {
        var parts = line.Split(
            '=',
            StringSplitOptions.RemoveEmptyEntries);

        if (parts.Length != 2) continue;

        var x = $"Setting {parts[0]}";
        display(x);

        Environment.SetEnvironmentVariable(parts[0], parts[1]);
    }
}

```
    C:\Users\JulianElve\source\repos\notebooks\appinsights

    Setting AI_APPID_XRM2XERO

    Setting AI_APIKEY_XRM2XERO

    Setting AI_APPID_XRMDATAINGEST

    Setting AI_APIKEY_XRMDATAINGEST


```C#
// substitute the  correct key values for your application details in your `.env.local` file

var AI_APPID =  Environment.GetEnvironmentVariable("AI_APPID_XRM2XERO");
var AI_APISECRET =  Environment.GetEnvironmentVariable("AI_APIKEY_XRM2XERO");

```

#### Create an authenticated  client


```C#
using Microsoft.Azure.ApplicationInsights;
using Microsoft.Azure.ApplicationInsights.Query;

var creds = new ApiKeyClientCredentials(AI_APISECRET);
var client = new ApplicationInsightsDataClient(creds);
client.BaseUri = new Uri("https://api.applicationinsights.io/v1");

```

#### Query Application Insights via REST API


```C#
using System.Collections.Generic;
using System.Linq;
using Microsoft.Azure.ApplicationInsights.Query.Models;

// see https://dev.applicationinsights.io/documentation/Using-the-API/Events

var timespan = "P1D";

var topCount  = 100;

var filter  =  "startswith(customDimensions/Category, 'Function') and customDimensions/LogLevel  eq  'Error'";

var orderby  =  "timestamp desc";

EventsResults<EventsTraceResult> traces = 
    await client.Events.GetTraceEventsAsync(AI_APPID,  
                                            timespan: timespan, 
                                            top: topCount, 
                                            filter:  filter,
                                            orderby:  orderby);

//display(traces.Value);
var results  = 
    traces.Value
    .Select(x =>   
      new  {
        TimeStamp     = x.Timestamp,
        SeverityLevel = x.Trace.SeverityLevel,
        LogLevel      = x.CustomDimensions.TryGetValue("LogLevel", out var logLevel) ? logLevel : "", 
        Operation     = x.Operation.Name,
        Message       = x.Trace.Message,
        Category      = x.CustomDimensions.TryGetValue("Category", out var category) ? category : ""
      });
    
display(results);
```


<table><thead><tr><th><i>index</i></th><th>TimeStamp</th><th>SeverityLevel</th><th>LogLevel</th><th>Operation</th><th>Message</th><th>Category</th></tr></thead><tbody><tr><td>0</td><td><span>2021-05-20 17:01:08Z</span></td><td><div class="dni-plaintext">3</div></td><td>Error</td><td>XrmInvoiceExportOrchestration</td><td>Xero Invoice : INV-50017337 - Error: The Account Number already exists. Please enter a different Account Number.</td><td>Function.XrmInvoiceExportOrchestration.User</td></tr><tr><td>1</td><td><span>2021-05-20 16:01:07Z</span></td><td><div class="dni-plaintext">3</div></td><td>Error</td><td>XrmInvoiceExportOrchestration</td><td>Xero Invoice : INV-50017337 - Error: The Account Number already exists. Please enter a different Account Number.</td><td>Function.XrmInvoiceExportOrchestration.User</td></tr><tr><td>2</td><td><span>2021-05-20 15:22:47Z</span></td><td><div class="dni-plaintext">3</div></td><td>Error</td><td>XrmInvoiceExportOrchestration</td><td>Xero Invoice : INV-50017337 - Error: The Account Number already exists. Please enter a different Account Number.</td><td>Function.XrmInvoiceExportOrchestration.User</td></tr></tbody></table>

