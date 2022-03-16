# adapted from work by Rowan Manning
# https://github.com/rowanmanning/rowanmanning.com
# https://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_GB


# Reusable Makefile
# ------------------------------------------------------------------------
# This section of the Makefile should not be modified, it includes
# commands from Rowan's reusable Makefile: https://github.com/rowanmanning/make
# include node_modules/@rowanmanning/make/javascript/index.mk
# [edit below this line]
# ------------------------------------------------------------------------

start:
	@hugo server

start-dev:
	@hugo server --buildFuture --buildDrafts --disableFastRender


fetch-webmentions:
	@./scripts/site.js wm:fetch --api-key $(WEBMENTIONS_TOKEN)

process-webmentions:
	@./scripts/site.js wm:process

build-functions:
	@./node_modules/.bin/netlify-lambda build src/functions

build: process-webmentions
	@./node_modules/.bin/netlify-lambda build src/functions
	@hugo --gc --minify --environment production -b $(URL)

build-content: process-webmentions
	@hugo --gc --minify --environment production -b $(URL)


build-staging: process-webmentions
	@./node_modules/.bin/netlify-lambda build src/functions
	@hugo --gc --minify --buildFuture --buildDrafts --environment staging -b $(DEPLOY_PRIME_URL)

build-preview-content: process-webmentions
	@hugo --gc --minify --buildFuture --environment staging -b $(DEPLOY_PRIME_URL)

new-article:
	@./scripts/site.js article:create "$(TITLE)"

new-worknote:
	@./scripts/site.js article:create --type worknote "$(TITLE)"


new-reply:
	@./scripts/site.js article:create-reply --type reply $(URL)

# new-weeknote:
# 	@./scripts/site.js weeknote:create
# 

new-note:
	@./scripts/site.js note:create --type note

new-bookmark:
	@./scripts/site.js note:create --type bookmark $(URL)
 
new-note-like:
	@./scripts/site.js note:create --type like $(URL)
 
new-note-reply:
	@./scripts/site.js note:create --type reply $(URL)
 
new-note-repost:
	@./scripts/site.js note:create --type repost $(URL)
