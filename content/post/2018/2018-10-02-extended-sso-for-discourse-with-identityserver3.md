---
title: Extended SSO for Discourse with IdentityServer3
author: Julian
type: syn_worknote
date: 2018-10-02T18:30:40+00:00
url: /worknotes/extended-sso-for-discourse-with-identityserver3/

---
**Background**

In our business we operate a number of customer-facing web services which use an <a href="https://identityserver.github.io/Documentation/" rel="noopener" target="_blank">IdentityServer3 identity provider</a> as the single source of identity. We have customised our setup to allow two sources of federated identity, and to pull certain claims from our CRM.

We have a new requirement to integrate a hosted instance of the excellent <a href="https://www.discourse.org/" rel="noopener" target="_blank">Discourse</a> discussion forum, also using the same single source of identity.
  
Discourse does not support OpenId Connect, rather its <a href="https://meta.discourse.org/t/official-single-sign-on-for-discourse-sso/13045" rel="noopener" target="_blank">own particular form of SSO</a>.

**Using IdentityServer3 as SSO source for Discourse**

John Korsnes wrote the core of this approach, documented in his <a href="https://blogg.blank.no/enabling-sso-for-discourse-with-identityserver3-7da2aca64bab" rel="noopener" target="_blank">Medium article</a> and <a href="https://github.com/blankoslo/idsrv.discourse" rel="noopener" target="_blank">on Github</a>. In his article he gives a good overview of how the Discourse SSO works, and explains his approach:

  * a custom endpoint on the IdentityServer, running in the same Owin context as the main IdP
  * configure Discourse to redirect a login to the custom endpoint
  * in the custom endpoint check if the user has a current authenticated session with IdentityServer
  * if they have, generate a Discourse SSO payload from the user properties, and return to Discourse
  * if they haven&#8217;t, display a simple login form, and once they have authenticated, generate and return the Discourse SSO payload as before

**Our modifications**

From our perspective the only drawback of John&#8217;s approach was that it only allowed for user authentication against the local IdentityServer accounts (username / password). Although that covers most of our customer accounts, we have extended our IdP with federated identity against our own company Office365 (Azure AD), and against Google, as some of our customers use Google Apps corporately.

To extend John&#8217;s approach we modified it so that instead of displaying a local login form we:

  * register an application in our IdentityServer as a proxy for Discourse
  * carry out an (almost) standard Authorization Code authentication process from our custom controller against the Identity Server
  * the only difference is that because we are running inside the IdentityServer web piipeline we don&#8217;t need to redeem the authorization code agaisnt the token endpoint, but can ignore any generated tokens and query the Owin Context in the same way John does.

Our version is shown below