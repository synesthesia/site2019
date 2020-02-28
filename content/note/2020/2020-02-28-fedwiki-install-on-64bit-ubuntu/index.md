---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "FedWiki Install on 64bit Ubuntu"
subtitle: ""
summary: "Setting up smallest federated wiki on a new server"
authors: ["synesthesia"]
categories: ["HowTo"]
tags: ["linux", "fedwiki", "DigitalOcean", "ubuntu"]
lastmod: 2020-02-28T13:00:24Z
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
I recently had to migrate my wiki to a 64 bit server in order to deploy the most recent updates. These instructions relate to Ubuntu 18.04 64 bit on Digital Ocean.

**Backup old wiki files**

As this was to support a migration, before setting up anything new I took a local copy of the `/home/wiki/.wiki` directory on my existing server.

**Create SSH key pair for wiki user**

These instructions assume that you can run shell locally - e.g. via Git bash if on Windows

```shell
local> cd ~
local> mkdir wikiuser
local> mkdir wikiuser/.ssh
local> cd wikiuser
local> ssh-keygen -t rsa
```

When asked where to store the key enter `~/wikiuser/.ssh/id_rsa`

**Create new server**

Log in to Digital Ocean account and create new droplet. The smallest size is more than enough for a personal wiki farm that gets almost zero traffic. I assume you have got an SSH key uploaded to Digital Ocean and you tell Digital Ocean to install this on the new machine

Make a note of the new machine IP address, I refer to this later as IPADDRESS 

**Set up server**

```shell
# copy public key for the new user to temp file on new server
local> rsync -a ~/wikiuser/.ssh/id_rsa.pub root@IPADDRESS:~/wiki_id_rsa.pub

# connect to server
local> ssh root@IPADDRESS

# create new user
root@IPADDRESS> useradd -s /bin/bash -d /home/wiki/ -m -G sudo wiki
root@IPADDRESS> mkdir /home/wiki/.ssh
root@IPADDRESS> chmod 700 /home/wiki/.ssh
root@IPADDRESS> cat wiki_id_rsa.pub >>  /home/wiki/.ssh/authorized_keys
root@IPADDRESS> chown -R wiki:wiki /home/wiki
root@IPADDRESS> rm wiki_id_rsa.pub

# set up firewall
root@IPADDRESS> ufw allow OpenSSH
root@IPADDRESS> ufw enable
root@IPADDRESS> exit
```

**Second phase of installation**

From now on we will login remotely as the wiki user.
Do whatever your local SSH software needs to use the key created for the wiki user, then...

```shell
# connect to server
local> ssh wiki@IPADDRESS

# set up time utilities
wiki@IPADDRESS> sudo dpkg-reconfigure tzdata
wiki@IPADDRESS> sudo apt-get update
wiki@IPADDRESS> sudo apt-get install ntp

# Setup auto upgrades
wiki@IPADDRESS> sudo dpkg-reconfigure --priority=low unattended-upgrades

# Install node
wiki@IPADDRESS> curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
wiki@IPADDRESS> sudo apt-get install -y nodejs
wiki@IPADDRESS> sudo apt-get install -y build-essential

# Install nginx
wiki@IPADDRESS> sudo apt update
wiki@IPADDRESS> sudo apt install nginx
wiki@IPADDRESS> sudo ufw allow 'Nginx Full'
wiki@IPADDRESS> systemctl status nginx # check output to see nginx is running
# check in browser by visiting http://IPADDRESS

#Install wiki
wiki@IPADDRESS>sudo npm install -g wiki
```

**Configure wiki to start and stop correctly**

```shell
wiki@IPADDRESS> sudo vi /etc/systemd/service/wiki.service  

# In vi enter the following contents to the file

# this is /etc/systemd/system/wiki.service
[Unit]
Description=Federated Wiki

[Service]
Type=simple
ExecStart=/usr/bin/sudo -H -u wiki wiki -f

[Install]
WantedBy=multi-user.target
# <esc>qw to save

# Test wiki install
wiki@IPADDRESS> sudo systemctl start wiki
wiki@IPADDRESS> curl http://127.0.0.1:3000 
# should return  Found. Redirecting to welcome-visitors.html

wiki@IPADDRESS> sudo systemctl stop wiki
```

**Set up nginx proxy**

```shell
wiki@IPADDRESS> sudo vi /etc/nginx/sites-available/wiki

# In vi enter the following contents to the file

map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
}

server {
  server_name SERVER_IP_ADDRESS ;

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
    listen 80;
}
# <esc>qw to save

wiki@IPADDRESS> ln -s /etc/nginx/sites-available/wiki /etc/nginx/sites-enabled/wiki
wiki@IPADDRESS> sudo systemctl start wiki
wiki@IPADDRESS> sudo systemctl restart nginx
wiki@IPADDRESS> exit
```

At this point you should have a server running wiki - point your browser at http://127.0.0.1 and you should see an empty federated wiki site.

In the next post I will document how to port an existing wiki onto this new server.
