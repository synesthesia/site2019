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

# Run the theme tests using mocha
# test-theme:
# 	@if [ -d themes/rowanmanning/test/integration ]; then make _test-theme-run && $(TASK_DONE); fi
# _test-theme-run:
# 	@if [ -x $(NPM_BIN)/mocha ]; then make _test-theme-run-mocha; fi
# _test-theme-run-mocha:
# 	@mocha "themes/rowanmanning/test/integration/**/*.test.js" --recursive --timeout $(INTEGRATION_TIMEOUT) --slow $(INTEGRATION_SLOW) $(INTEGRATION_TEST_MOCHA_FLAGS)
# 
new-article:
	@./scripts/site.js article:create

# new-weeknote:
# 	@./scripts/site.js weeknote:create
# 
# new-bookmark:
# 	@./scripts/site.js note:create --type bookmark $(URL)
# 
# new-like:
# 	@./scripts/site.js note:create --type like $(URL)
# 
# new-note:
# 	@./scripts/site.js note:create --type note
# 
# new-reply:
# 	@./scripts/site.js note:create --type reply $(URL)
# 
# new-repost:
# 	@./scripts/site.js note:create --type repost $(URL)
