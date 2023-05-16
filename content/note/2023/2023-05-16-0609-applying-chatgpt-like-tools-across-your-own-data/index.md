---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Applying ChatGPT-like tools across your own data"
subtitle: ""
summary: "Summarising some key principles from Mick Vleeshouwer.    "
authors: ["synesthesia"]
categories: []
tags: ["AI", "ChatGPT", "100DaysToOffload", "MickVleeshouwer"]
lastmod: 2023-05-16T07:09:48+01:00
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
The current speed of iteration across tools based on Large Language Models, both corporate and open-source, is way too fast for a non-specialist to keep up, a classic case of the need to apply [Personal Knowledge Mastery](https://jarche.com/pkm/) techniques and identify a trusted network.

This post draws on an author who is new to me, but who I suspect may be worth following, [Mick Vleeshouwer](https://github.com/iMicknl), who is currently an AI Cloud Solution Architect at Microsoft.

## Applying ChatGPT-like tools across your own data

 In [How to create a private ChatGPT with your own data](https://medium.com/@imicknl/how-to-create-a-private-chatgpt-with-your-own-data-15754e6378a1) he sets out some core principles for building a tool that allows an individual or company to use ChatGPT (or similar) to interrogate their own knowledge base, in summary:

 1. Avoid trying to fine-tune an LLM with your own data
    - risk of [hallucinations](https://hyp.is/4OpjfPOyEe2FwC8LG5eQRw/openai.com/research/gpt-4) (incorrect answers)
    - lack of traceability
    - lack of access control
    - ongoing costs to retrain the model as new documents become available

2.  Separate your knowledge from your language model
    - the key principle is to apply your own understanding of your own information to provide the most relevant information to the LLM
    - not viable to feed ALL your documents to the model with each query (cost, time)   
    - instead, search first for most relevant text
    - generate a prompt for the LLM that combines the user question with the relevant text
3.  Only retrieve the most relevant data  
    Build a knowledge base from your source material than can be the target 
    for an effective semantic search  
    - Chunk and split the data  
      - per page or with a splitter
      - maybe use a search engine service
      - or perhaps precomputing embeddings and compare with user input
    - explore different chunking strategies to improve relevance
4. Generate a smart prompt for your LLM  
   Mick gives [an example of a prompt template](https://github.com/Azure-Samples/azure-search-openai-demo/blob/main/app/backend/approaches/retrievethenread.py) that frames how a question should be answered

## Comparison with commercial product announcements

Given that Mick works for Microsoft, it's interesting to compare his "basic principles" post with what is being said in Microsoft marketing about their commercial AI products under the '[CoPilot](https://news.microsoft.com/reinventing-productivity/)' brand.

One recent post (with a title that looks like it has been designed to have every buzz word) is [How Copilot in Microsoft Dynamics 365 and Power Platform delivers enterprise-ready AI built for security and privacy](https://cloudblogs.microsoft.com/dynamics365/bdm/2023/05/12/how-copilot-in-microsoft-dynamics-365-and-power-platform-delivers-enterprise-ready-ai-built-for-security-and-privacy/).

Scrolling past the puffery to the bit about "[how it works](https://hyp.is/QT_AdPPGEe2wXpMRM835hg/cloudblogs.microsoft.com/dynamics365/bdm/2023/05/12/how-copilot-in-microsoft-dynamics-365-and-power-platform-delivers-enterprise-ready-ai-built-for-security-and-privacy/)" you can see can how this relates to the same principles espoused in Mick's article:

- receives input prompt from user inside app context (e.g. Dynamics 365 or Power Apps)
- access data and documents security trimmed for the user access permitted by Microsoft Graph and Dynamics
- use this contextual information to ground the LLM query (i.e. provided context in the prompt)
- post-process the LLM response for security and compliance checks, and to generate app commands
- return a recommended response plus commands back to apps

The article also adds another reason  why you don't want to re-train a model with your personal/business data (apart from time and cost) - security and confidentiality.

## References

- [Text splitters](https://langchain.readthedocs.io/en/latest/reference/modules/text_splitter.html)
- [Example of semantic ranking search service (Bing)](https://learn.microsoft.com/en-us/azure/search/semantic-ranking)
- [Deep dive on embeddings - Towards Data Science](https://towardsdatascience.com/neural-network-embeddings-explained-4d028e6f0526)
- [Prompt Engineeering Guide](https://github.com/dair-ai/Prompt-Engineering-Guide)


[#100DaysToOffload](https://100daystooffload.com/) 32/100
