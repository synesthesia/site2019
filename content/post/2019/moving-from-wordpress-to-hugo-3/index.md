---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Exporting content from WordPress for Hugo"
slug: moving-wp-to-hugo-03
subtitle: "Part 3 of Moving from WordPress to Hugo"
summary: ""
authors: ["synesthesia"]
tags: ["wordpress","hugo", "static site generators"]
categories: ["Technology"]
date: 2019-06-12T08:10:00+01:00
featured: false
draft: true

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
projects: ["wp-to-hugo"]
---
Part 3 of [Moving from WordPress to Hugo]({{< ref "/project/wp-to-hugo/index.md" >}})
<!--more-->
The starting point is [Cyrill Schumacher](https://cyrillschumacher.com/)'s [WordPress to Hugo exporter](https://github.com/SchumacherFM/wordpress-to-hugo-exporter).

This WordPress plugin isn't in the WordPress plugin gallery, so needs to be installed directly to your WordPress site either via FTP or by SSH and a git clone.

There are clear [usage instructions](https://github.com/SchumacherFM/wordpress-to-hugo-exporter/blob/master/README.md) in the README, it's worth noting that the time to run is very dependent on how much content you have in your site, and how much processor capacity you have. I found when running it via the web browser that I got a couple of 504 timeout errors until it finally worked and downloaded a zip file of the exported content. If you have SSH access to your web server there is also a CLI option to avoid running through the web request pipeline.

I have previously customised my WordPress site with a couple of [custom post types](https://developer.wordpress.org/reference/functions/register_post_type/). Obviously Cyrill's code doesn't know about those, so they were missing from the first download.

The code is fairly straightforward, and it's possible to add custom post types to the export by [modifying one line](https://github.com/synesthesia/wordpress-to-hugo-exporter/commit/5156e968022d4cfd5537a240e7e8ee1f0a6a5cd6?diff=unified):

```patch
---
 hugo-export.php | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

diff --git a/hugo-export.php b/hugo-export.php
index 1e008e0..36bdd03 100644
--- a/hugo-export.php
+++ b/hugo-export.php
@@ -99,7 +99,7 @@ function get_posts()
     {
 
         global $wpdb;
-        return $wpdb->get_col("SELECT ID FROM $wpdb->posts WHERE post_status in ('publish', 'draft', 'private') AND post_type IN ('post', 'page' )");
+        return $wpdb->get_col("SELECT ID FROM $wpdb->posts WHERE post_status in ('publish', 'draft', 'private') AND post_type IN ('post', 'page', 'syn_worknote', 'syn_linklog' )");
     }
 
     /**
```

Uploading this edited version of the plugin and repeating the export process yielded a zip file with the missing content now added.
