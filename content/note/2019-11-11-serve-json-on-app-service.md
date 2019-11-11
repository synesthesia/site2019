---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Serve Json on Azure  App Service"
subtitle: ""
summary: "How to solve broken local search when serving a Hugo site from Azure App Service"
authors: ["synesthesia"]
tags: ["Hugo", "Azure"]
categories: ["quick notes"]
date: 2019-11-11T16:29:41Z
lastmod: 2019-11-11T16:29:41Z
featured: false
draft: false

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
I have been setting up an internal work site based on [Hugo](https://gohugo.io/) in [Azure App Service](https://azure.microsoft.com/en-gb/services/app-service/) (it's in App Service so we can protect it easily with Azure AD).

Using the Academic theme, I noticed the [local search](https://sourcethemes.com/academic/docs/search/) wasn't working. This relies on accessing a JSON version of the site content, and a quick look in DevTools showed `index.json` was being served as a `404` error.

The fix, via [StackOverflow](https://stackoverflow.com/questions/48137750/azure-web-app-does-not-load-json-file/48137869#48137869), is to create a `Web.config` file in the root of the site. Specifically, for Hugo, add a file `/static/Web.config` with the following content:

```xml
<?xml version="1.0"?>
<configuration>
    <system.webServer>
        <staticContent>
            <remove fileExtension=".json"/>
            <mimeMap fileExtension=".json" mimeType="application/json" />
     </staticContent>
    </system.webServer>
</configuration> 
```

As an aside it's worth noting that with this combination of technologies (plus Azure DevOps to do the CI/CD build) I could set up a good-looking internal-only comms site in under an hour. With such a light payload it could easily sit on an existing App Service Plan, so the resource cost is zero.
