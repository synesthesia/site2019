---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Move a Wiki"
subtitle: ""
summary: "Moving wiki to a new server"
authors: ["synesthesia"]
categories: ["HowTo"]
tags: ["linux", "fedwiki", "DigitalOcean", "ubuntu"]
lastmod: 2020-03-03T08:00:51Z
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

## Introduction 

This is a follow-on post to [FedWiki install on 64 bit Ubuntu]({{< relref "../2020-02-28-fedwiki-install-on-64bit-ubuntu/index.md"   >}})

The reason I set up a new server for wiki was to enable me to take advantage of recent upgrades which require a 64 bit server.

This second post documents how to move the wiki.

{{% toc %}} 

The approach I am taking does involve a period of outage for the service, but as it's a personal server that's acceptable. If you wanted to do the swap without an outage you would need a more complex architecture including a load balancer so you could set up the new server while the old one still served requests, then swap when the new one is ready. That would be total overkill for this site!

## Reviewing what sites we are moving

I have several wiki sites on one farm - at present:

* wiki.synesthesia.co.uk
* pkm.wiki.synesthesia.co.uk
* forage.wiki.synesthesia.co.uk
* code.wiki.synesthesia.co.uk
* product.wiki.synesthesia.co.uk

## Moving DNS to point to the new server

This is the point at which service to the old installation will be lost, but we need to set up the DNS before we can configure SSL.

I have sites at `wiki.synesthesia.co.uk` and on sub-domains under that, so for convenience I also set a wildcard DNS record - i.e. an A record for `*.wiki.synesthesia.co.uk`.

Once both A records have been edited to point to the new server you need to wait for changes to propagate before moving on, so initially I always use a low TTL setting.

Because I run wiki in farm mode this wildcard DNS would represent a risk that anyone could create a wiki on my farm just by visiting the correct URL, this is mitigated in the Nginx configuration

## Setting up SSL

I use [Certbot](https://certbot.eff.org/) to create SSL certificates.

Install certbot:

```shell
wiki@MYSITE.COM> sudo apt-get update
wiki@MYSITE.COM> sudo apt-get install software-properties-common
wiki@MYSITE.COM> sudo add-apt-repository universe
wiki@MYSITE.COM> sudo add-apt-repository ppa:certbot/certbot
wiki@MYSITE.COM> sudo apt-get update
wiki@MYSITE.COM> sudo apt-get install certbot python-certbot-nginx
```

Although certbot is able to edit nginx config files, because of the complexity of my setup I choose to just get the certificates, then manually edit the nginx config:

```shell
wiki@MYSITE.COM> sudo certbot certonly --nginx -d domain1 -d domain2 -d domainN

```

Finally test auto-renewal:
```shell
wiki@MYSITE.COM> sudo certbot renew --dry-run
```

Lastly check renewal script has been installed as a cron:

```shell
wiki@MYSITE.COM> sudo systemctl list-timers
```



## Modifying the Nginx configuration

Connect to server and edit the config file:

```shell
local> ssh wiki@MYSITE.COM  ## your server address  will vary!
wiki@MYSITE.COM> sudo vi /etc/nginx/sites-available/wiki

```

The complete contents of my nginx config are:

```
map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
}

# Main server block to proxy correct requests
# through to wiki
server {
  server_name wiki.synesthesia.co.uk
    code.wiki.synesthesia.co.uk
    pkm.wiki.synesthesia.co.uk
    product.wiki.synesthesia.co.uk
    forage.wiki.synesthesia.co.uk;

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $host;
    proxy_set_header X-NginX-Proxy true;

    proxy_pass http://127.0.0.1:3000;
    proxy_redirect off;

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
  }


  listen 443 ssl; 
  ssl_certificate /etc/letsencrypt/live/wiki.synesthesia.co.uk/fullchain.pem; 
  ssl_certificate_key /etc/letsencrypt/live/wiki.synesthesia.co.uk/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf; 
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; 

}

# Default server block serves two purposes:
# - http requests to recognised sites are redirected to the https URL
# - requests to unrecognised sites are rejected

server {

    listen      80 default_server;
    listen 443 ssl default_server;
    server_name _;
    ssl_certificate /etc/letsencrypt/live/wiki.synesthesia.co.uk/fullchain.pem; 
    ssl_certificate_key /etc/letsencrypt/live/wiki.synesthesia.co.uk/privkey.pem; 


    if ($host = product.wiki.synesthesia.co.uk) {
        return 301 https://$host$request_uri;
    }

    if ($host = code.wiki.synesthesia.co.uk) {
        return 301 https://$host$request_uri;
    } 

    if ($host = forage.wiki.synesthesia.co.uk) {
      return 301 https://$host$request_uri;
    } 

    if ($host = pkm.wiki.synesthesia.co.uk) {
       return 301 https://$host$request_uri;
    } 

    if ($host = wiki.synesthesia.co.uk) {
       return 301 https://$host$request_uri;
    } 

    return      444; # "Connection closed without response"

}

```

## Restoring the wiki content

My wiki data is stored in the directory `/home/wiki/.wiki/data` as defined in `/home/wiki/.wiki/config.json`:

```json
{
  "data" : "/home/wiki/.wiki/data",
  "farm": "true",
  "security_type": "passportjs",
  "wikiDomains": {
      "wiki.synesthesia.co.uk": {
          "github_clientID": "MYCLIENTID",
          "github_clientSecret": "MYCLIENTSECRET"
       }
  }

}
```

To restore the wiki content:

* from the local backup copy to the server `/home/wiki/.wiki/config.json` and `/home/wiki/.wiki/data`
* in each wiki directory under `/home/wiki/.wiki/data` find and delete `./status/sitemap.json` and `./status/sitemap.xml`

## checking that login still works

* visit any of the wikis
* click the padlock to trigger login
* authenticate with relevant provider (in my case GitHub)
* check that the padlock opens
