---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Running Federated Wiki locally as Windows Service"
subtitle: ""
summary: ""
authors: ["synesthesia"]
categories: ["tools"]
tags: ["fedwiki"]
date: 2019-07-16T10:03:40+01:00
featured: false
draft: true
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
Smallest Federated Wiki is the brainchild of Ward Cunningham - the "Father of Wiki"

Although the main feature is the ability to fork content from other wikis, and to allow other wiki users to fork your content, many people also want to run a local copy as a private notebook or commonplace book.

The most stable distribution of wiki is written in node, so will run anywhere that node will. It's really useful to have wiki run continuously, so in this approach we use [node-windows](http://github.com/coreybutler/node-windows) to install wiki as a windows service.

## Preparation

* install [node and npm](https://nodejs.org/en/download/)
* `npm install -g wiki`
* `npm install -g node-windows`

## Test that wiki works
`cd ~`

`wiki`

Visit http://localhost:3000, you should see a wiki page.

{{< figure src="fedwiki-initial-home.png" title="FedWiki default start page" >}}

## Customise wiki setup

* create `config.json` in `~/.wiki`

```json
{
  "security_type": "friends",
  "cookieSecret": "SECRET",
  "session_duration": 900,
}
```

* optionally, customise data location

```json
 "data": "d:/Dropbox/fedwiki/localhost/data"
```

## Run wiki and claim

* start wiki as above
* in browser, click the padlock icon

A new file `owner.json` will be created in the status subdirectory of the wiki data directory.

Contents will look something like this:
```json
{
  "name": "randomname",
  "friend": {
    "secret": "AVERYLONGKEY"
  }
}
```

If you ever get locked out then the value of AVERYLONGKEY is what you will need to paste in the popup that wiki shows you

You can edit the name to something else (like your own name)


## Create windows service to run wiki automatically

* create a directory for the scripts that will create a windows service

```shell
mkdir ~\wikisvc
```

* copy wiki config file

```shell
cp ~/.wiki/config.json .
```
 
* In the new directory create the following scripts:

*wikiservice.js*

```node
var Service = require('node-windows').Service;

var svc = new Service ({
    name:'Wiki',
    description: 'FedWiki as windows service',
    script: 'C:/bin/Nodist/bin/node_modules/wiki/index.js',
}); 

svc.on('install', function(){
    svc.start();
});

svc.install();
```

*wikiservice-uninstall.js*
```node
var Service = require('node-windows').Service;

var svc = new Service ({
    name:'Wiki',
    description: 'FedWiki as windows service',
    script: 'C:/bin/Nodist/bin/node_modules/wiki/index.js',
}); 

svc.on('uninstall', function(){
    console.log('uninstalled');
});

svc.uninstall();
```
* in the new directory run:

```shell
npm link node-windows
node wikiservice.js
```

* open Windows Service Manager and check for the new service:

{{< figure src="fedwiki-in-windows-service-manager.png" title="Windows Services Manager" >}}

* if it isn't started, start it

* visit the wiki page in a browser to confirm all works





