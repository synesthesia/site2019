---
title: CRM plugin hard won learnings
authors: ["synesthesia"]
type: note
date: 2015-06-18T10:25:57+00:00
excerpt: If you need to use ILMerge, you must use an unencrypted string name key for your assembly If you change the strong name key for your assembly, CRM thinks it's a whole new assembly, so it might pay to create new ones explicitly
slug: crm-plugin-hard-won-learnings 
aliases: ["/worknotes/crm-plugin-hard-won-learnings"]
tags: ["Dynamics365", "ILMerge", "code"]
       

---
If you need to use ILMerge, you must use an unencrypted strong name key for your assembly

If you change the strong name key for your assembly, CRM thinks it&#8217;s a whole new assembly, so it might pay to create new ones explicitly

If you are now including the generated CRM early-bound classes through ILMerge instead of as a source include, remember to add _[assembly: Microsoft.Xrm.Sdk.Client.ProxyTypesAssemblyAttribute()]_ to all deployed assemblies
