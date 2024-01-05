---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Digging out Diigo notes"
slug: "digging-out-diigo-notes"
subtitle: "From web annotations to local notes"
summary: "Digger is a command-line tool to extract annotations from web-based services into local Markdown notes"
authors: ["synesthesia"]
categories: []
tags: ["small tech", "notemaking", "PKM", "dotnet", "open source", "Digger", "diigo"]
created: 2022-07-15T08:15:58+01:00
lastmod: 2022-07-15T08:15:58+01:00
featured: false
draft: false
type: post

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
projects: ["smalltools"]
url_code: "https://github.com/synesthesia/digger"

---
_Image credit[^1]_

## Context

Like many others, a key part of my personal knowledge management process is 
the creation of highlights and notes on web pages uses online tools, then the extraction of those notes 
into a local Markdown file to form part of my knowledge library.

So for example I might highlight a page using Diigo in the web browser:

{{< figure src="example-diigo-highlight.png" id="diigo-highlight" caption="A web page highlighted in browser" numbered="true" >}}.

Those highlights are now stored within the Diigo system.

Although some manipulation is possible, for example dragging content into an outliner for editing:

{{< figure src="example-diigo-drag-to-outliner.png" id="diigo-outliner-1" caption="Within Diigo, drag highlights to an outliner" numbered="true" >}}.

All you can do from there is to export as either plain text or HTML, or print to PDF or paper, all of which 
lose a lot of context and require a fair bit of manual editing just to get the information into a usable state 
in my local notes before I can begin _thinking_ about it.

The key point, common to most commercial services, is that it is far easier to use stuff _within_ their walls than it is to extract it.

As discussed [here]({{< relref "../../../post/2022/2022-05-24-1223-reply-to-ton-zijlstra">}}), [here]({{< relref "../../../post/2022/2022-05-24-reply-to-ton-zijlstra">}}) and [here](https://www.zylstra.org/blog/2022/05/clipping-articles-from-feed-reader-to-obsidian/), there is a personal benefit in creating some basic tooling support to pull such annotations into a local context.

## Solution approach

Although previously I thought that [building an extension for Visual Studio Code]({{< relref "../../../post/2022/2022-05-24-reply-to-ton-zijlstra#processing">}} ) would be the best place to start, after playing around that for a while I found I was spending most of my time thinking about how to integrate with VS Code, and very little time looking at what I wanted to do with the information. On further reflection I have changed my mind, and think it would be unwise (certainly for a first attempt at this problem) to tie into one particular editor (_what if I change my mind about Obsidian? etc..._), and instead go for a command-line tool that can be pointed at a set of posts and pull the markdown into a specific directory.

The criteria therefore were:

- runnable from the command line
- usable on Windows and linux
- easily distributed (even if only to multiple devices owned by me)
- in a language and toolset I know well, for speed of implementation

My fairly rapid conclusion was to build this as a [.Net global tool](https://docs.microsoft.com/en-us/dotnet/core/tools/global-tools):

- these are command line apps
- because they will run anywhere that the .Net SDK is installed, they can run on Windows, Mac or linux
- the .Net SDK is [free to use](https://dotnet.microsoft.com/en-us/platform/free) and [open source](https://dotnet.microsoft.com/en-us/platform/open-source)
- easy distribution mechanism via Nuget
- I use C# almost every day

The first three criteria could also have been met with node+npm, or PHP+Composer, my speed with those languages is far lower.

Although the requirement to install the .Net SDK puts this in the class of "tools for developers", the same would apply to the other two approaches, 
and this is fundamentally **a tool for me** (although built and distributed in the open for anyone to try).

Unlike the node+npm and PHP+Composer routes, there is also an option to migrate the code to a fully self-contained excutable for a single install should the desire ever be there.


## What does it do?

Skipping over the detail of how to install and then invoke the tool ([the code README](https://github.com/synesthesia/digger/blob/master/README.md) tells you those details), the process looks something like this:


{{< figure src="digger-overview-01.drawio.png" id="diigo-overview-1" caption="Processing Diigo annotations with Digger" numbered="true" >}}.


## What does the output look like?

A typical generated markdown file looks like this:

```markdown
# .Net Tools

## Summary

(left blank for later summarisation)

[Link to source](https://docs.microsoft.com/en-us/dotnet/core/tools/global-tools)

Note captured: 08\/07\/2022

Bookmark created: 08\/07\/2022

## See also

(left blank for later cross-references)


## Highlights from source page


> A .NET tool is a special NuGet package that contains a console application.
> A tool can be installed on your machine in the following ways:  
> *  **As a global tool**
> The tool binaries are installed in a default directory that is added to the PATH environment variable. You can invoke the tool from any directory on the machine without specifying its location. One version of a tool is used for all directories on the machine.  
> * **As a global tool in a custom location** (also known as a tool-path tool).  
> The tool binaries are installed in a location that you specify. You can invoke the tool from the installation directory or by providing the directory with the command name or by adding the directory to the PATH environment variable. One version of a tool is used for all directories on the machine.  
> * **As a local tool** (applies to .NET Core SDK 3.0 and later).  
> The tool binaries are installed in a default directory. You invoke the tool from the installation directory or any of its subdirectories. Different directories can use different versions of the same tool.  
> The .NET CLI uses manifest files to keep track of which tools are installed as local to a directory. When the manifest file is saved in the root directory of a source code repository, a contributor can clone the repository and invoke a single .NET CLI command that installs all of the tools listed in the manifest files.
> 
> **.NET tools run in full trust. Do not install a .NET tool unless you trust the author.**

> Here are some ways to find tools:  
> *   Use the [dotnet tool search](dotnet-tool-search) command to find a tool that is published to NuGet.org.  
> *   Search the [NuGet](https://www.nuget.org) website by using the ".NET tool" package type filter. For more information, see [Finding and choosing packages](/en-us/nuget/consume-packages/finding-and-choosing-packages).  
> *   See the source code for the tools created by the ASP.NET Core team in the [Tools directory of the dotnet/aspnetcore GitHub repository](https://github.com/dotnet/aspnetcore/tree/main/src/Tools).  
> *   Learn about diagnostic tools at [.NET diagnostic tools](../diagnostics/#net-core-diagnostic-global-tools).

```

**As you can see I am prompting the next parts of my process by inserting explicit cues to write a summary and to cross-reference to other notes or sources.**

## Can I use this?

You are welcome to use this tool yourself, however as .Net tools run with full trust you should read the [source code](https://github.com/synesthesia/digger) and satisfy yourself that it is safe to do so on your machine. 

It doesn't do anything remotely dangerous, but don't take my word for it!

## What next

My priorities are:

- use it ('dogfooding'), and get back to focusing on what I want to learn
- tidy up the code and documentation
- modify the code that converts HTML content in annotations to give markdown consistent with the other parts of the output
  - _for example, choice of list character_
- think about what next, possibilities:
  - a simple HTML to Markdown option to convert files acquired manually (e.g. downloaded Kindle highlights)
  - extract annotations from [hypothes.is](https://web.hypothes.is/)


[^1]: Image credit [Andres Siimon](https://unsplash.com/@johnmcclane?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
