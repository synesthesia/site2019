---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Antora Local Authoring"
subtitle: ""
summary: ""
authors: ["synesthesia"]
categories: ["notes"]
tags: ["docsascode","antora"]
lastmod: 2020-09-03T12:32:31+01:00
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
## Writing content for your Antora site

In [the note about publishing]({{< relref "../2020-09-03-antora-publishing/index.md" >}}) I described how the final published site gets built.

However in reality you will want to preview your work locally before you push to the published site.

Antora supports an [author mode](https://docs.antora.org/antora/2.3/playbook/author-mode/) of working where it builds a site based on local clone(s) of the content project(s) (as opposed to fetching a specified branch or tag from the published repository/repositories at build time.)

A gulp script is available to produce a local version of the website that rebuilds each time the content is updated.

## Configuring author mode in a project

If you are working with an existing documentation project this step will have been done, but it's useful to know how to configure.

1. install gulp globally
   ```bash
   >~/ $ npm install -g gulp-cli
   ```
2. install the dependencies in the root of your publishing project
   ```bash
   >~/ $ npm install --save-dev   antora-site-generator-lunr gulp-connect js-yaml
   ```
3. add `gulpfile.js`  from this gist in the root of your publishing project
   {{< gist synesthesia b2d11154bebb29b1e670fc03c40692bd >}}
4. create a `./workspace` folder and add to `.gitignore`
   ```bash
   >~/ $ mkdir workspace
   >~/ $ cat 'workspace/' >> .gitignore
   ```
5. create a local version of the playbook as `local-antora-playbook.yml` similar to this gist _obviously edit the content sources will match your project_
   {{< gist synesthesia 5c3cbf35beff0b3e77c2467bac963e81 >}}
6. make local clones of your content projects into the correct directories under `./workspace`[^1]
   ```bash
   >~/ $ git clone git@github.com:myaccount/mycontentproject.git workspace/mycontentproject
   ```

## Editing content in author mode

1. make sure you have latest version of your content and open an editor (e.g. VS Code)
  ```bash
  >~/ $ cd workspace/mycontentproject
  >workspace/mycontentproject/ $ git pull origin master
  >workspace/mycontentproject/ $ code .
  >workspace/mycontentproject/ $ cd ../..
  ```

2. run the previewer
  ```bash
  >~/ $ gulp
  ```
3. access the preview at `https://localhost:5000
4. edit the content, refresh the browser to see changes

## Pushing changes

1. stop the previewer
  ```bash
  >~/ $ Ctrl-C
  ```
2. commit and push  
   ```bash
   >~/ $ cd workspace/mycontentproject
   >workspace/mycontentproject/ $ git add -A && git commit -m"My lovely commit message"
   >workspace/mycontentproject/ $ git push
   ```
3. wait for the CI build and deployment to finish


[^1]: this assumes you have direct access to the content. In a more complex environment you may need to work with forks of the content repositories and submit changes via pull request.
