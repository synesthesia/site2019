---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Exploring Interactive Notebooks"
subtitle: ""
summary: "Learning  to use interactive notebooks"
authors: ["synesthesia"]
categories: []
tags: ["notebooks", "jupyter"]
lastmod: 2021-05-21T11:20:26+01:00
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
As I mentioned the other day, one of my background learning goals for the second half of this year is a [maths refresh and to explore the world of data science]({{< relref "/post/2021/2021-05-07-maths-for-data-science" >}}).

You can't get very far in such an exploration before you come across the  idea of Interactive Notebooks, most commonly in the  form of [Jupyter Notebooks](https://jupyter.org/).

To quote the Jupyter site:

>The Jupyter Notebook is an open-source web application that allows you to create and share documents that contain live code, equations, visualizations and narrative text. Uses include: data cleaning and transformation, numerical simulation, statistical modeling, data visualization, machine learning, and much more.

 As [others](https://www.youtube.com/watch?v=W-F0gO7dVOE) have pointed out, they also hold great potential for creating actionable documentation for common IT operational incidents. This may be the first area I explore - it's potentially more accessible to me while I learn more about data science

 The range of tools and services which are available to run notebooks, either locally or in the cloud, seems  to be growing  all the time. A few that I have played with (or at  least looked at) so far:

 - [Jupyter](https://jupyter.org/) locally, on top of [Anaconda](https://www.anaconda.com/products/individual)
 - [nteract](https://nteract.io/applications)
 - in [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15)
 - in [Visual Studio Code](https://code.visualstudio.com/docs/python/jupyter-support)
 - in [Visual Studio Code Insiders](https://code.visualstudio.com/insiders/) with the  [`vscode-jupyter` extension](https://github.com/microsoft/vscode-jupyter)
 - [Paperspace Gradient](https://gradient.paperspace.com/) (which even has a free tier that includes GPU for heavy processing)
 - Azure [Synapse Analytics](https://docs.microsoft.com/en-gb/azure/synapse-analytics/spark/apache-spark-development-using-notebooks?tabs=classical)

The number of kernels available (and therefore the languages you can write your notebooks in) is also increasing. Depending on the environment you run in you may have one  or more of the  following available:

- Python
- R
- .Net  Interactive (C#, F#, Powershell)
- T-SQL
- Scala
- PySpark
- Spark/R
- Kusto
- ...?

I also found [this great list of example notebooks](https://github.com/jupyter/jupyter/wiki/A-gallery-of-interesting-Jupyter-Notebooks).

As I continue to explore I will label notes on my experiments with the tag [`notebooks`](/tag/notebooks/).

