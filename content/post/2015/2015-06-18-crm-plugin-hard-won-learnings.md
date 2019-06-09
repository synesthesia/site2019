---
title: CRM plugin hard won learnings
author: Julian
type: syn_worknote
date: 2015-06-18T10:25:57+00:00
excerpt: If you need to use ILMerge, you must use an unencrypted string name key for your assembly If you change the strong name key for your assembly, CRM thinks it's a whole new assembly, so it might pay to create new ones explicitly
url: /worknotes/crm-plugin-hard-won-learnings/
       
syndication_source:
  - WorkNotes
syndication_source_uri:
  - https://synesthesiaworknotes.smallpict.com/
syndication_source_id:
  - https://synesthesiaworknotes.smallpict.com/rss.xml
syndication_feed:
  - https://synesthesiaworknotes.smallpict.com/rss.xml
syndication_feed_id:
  - 8
syndication_permalink:
  - https://synesthesiaworknotes.smallpict.com/2015/06/18/crmPluginHardWonLearnings.html
syndication_item_hash:
  - 7932296f83906b2dc534b6ec96405539
  - 00c658d6c7dd3a82a067b6ec4a689eb3

---
If you need to use ILMerge, you must use an unencrypted string name key for your assembly

If you change the strong name key for your assembly, CRM thinks it&#8217;s a whole new assembly, so it might pay to create new ones explicitly

If you are now including the generated CRM early-bound classes through ILMerge instead of as a source include, remember to add _[assembly: Microsoft.Xrm.Sdk.Client.ProxyTypesAssemblyAttribute()]_ to all deployed assemblies
