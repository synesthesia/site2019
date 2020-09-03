---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Antora Publishing"
subtitle: ""
summary: "Approaches for publishing Antora projects to websites on Netlify and Azure"
authors: ["synesthesia"]
categories: ["notes"]
tags: ["docsascode","antora", "CI/CD"]
lastmod: 2020-09-03T11:34:13+01:00
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
projects: ["antora"]
---
## Background

As noted in [Antora basics]({{< relref "../2020-09-03-antora-basics/index.md" >}}) the Antora build pipeline generates a static website bundle in `./build/site`.

Although it is possible to manually upload the contents of that directory to any webserver, in a real project we want to have automated publishing triggered by pushing changes to either the **playbook project** or any of the **content root** repositories.

## Publishing destinations

In our real world project we set up a total of three websites - one for our customers, and two restricted sites for internal staff documentation.

The public site is hosted on [Netlify](https://www.net), and the two internal sites hosted on [Azure App Service](https://docs.microsoft.com/en-gb/azure/app-service/overview) with [authentication](https://docs.microsoft.com/en-gb/azure/app-service/overview-authentication-authorization) switched on - to visit those sites you have to authenticate with our Azure Active Directory.

## Continuous deployment

All of our sites are published automatically whenever changes to either the **playbook project** or any of the relevant **content root** repositories are pushed to GitHub.

|Change|Site type|Hosting|Build engine|Trigger|
|---|---|---|---|---|
|Playbook project|Public|Netlify|Netlify|Automatic build triggered by GitHub push|
|Playbook project|Restricted|Azure|Azure DevOps|Automatic build triggered by GitHub push|
|Content roots|Public|Netlify|Netlify|GitHub action fires build of associated playbook project via netlify webhook|
|Content roots|Restricted|Azure|Azure Devops|GitHub action fires build of associated playbook project via Azure DevOps API|

### Netlify

1. Ensure **playbook project** is connected to Netlify
2. In **playbook project** add `build-site.sh` _(includes addition of search)_:
  {{< gist synesthesia 83cdf8ad1b9e1a432ce5ddc753b49a2a >}}
3. In **playbook project** add `netlify.toml`:
   {{< gist synesthesia 13aae1e92221cc3156fd3c84b2c2ffa9 >}}
4. Log in to Netlify, create a webhook for the **playbook project**
5. In GitHub create an account-level or organisation-level secret called `NETLIFY_HOOK_DOCS_PUBLIC` with the value set to the URL of the webhook created in step 1
6. In GitHub add the secret to each **content project** that contains public docs
7. In each **content project** create a GitHub action in `./.github/workflows/build-public.yml` that looks like this (we assume content root is always under `./public`, edit to suit your setup):

{{< gist synesthesia 5ff026194c1cf75c9ee1c325a79da02e >}}

### Azure App Service / Azure Devops

1. Create a connection in Azure Devops to the relevant Azure subscription
2. In the **playbook project** add `./azure-pipelines.yml` as per the gist below (edit values for Azure subscription and website)
  {{< gist synesthesia ecb1a4228b954412671753c997bf1e3b >}}
3. Connect the playbook project to Azure Devops and configure a pipeline based on the `./azure-pipelines.yml` file
4. Login to Azure Devops and create a [Personal Access Token](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=preview-page)
5. In GitHub create an account-level or organisation-level secret called `AZURE_DEVOPS_TOKEN` with the value set to the token created in the previous step
6. In GitHub add the secret to each **content project** that contains docs used in this project
7. In each **content project** add a GitHub action in `./.github/workflows/build-azure.yml` that looks like the gist below (the version shown assumes content in the `./staff` folder, edit to suit your setup )
  {{< gist synesthesia 0bc37702968ec3752693f7b5ada3500f >}}
