#!/usr/bin/env node
// adapted from work by Rowan Manning
// https://github.com/rowanmanning/rowanmanning.com
// https://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_GB

'use strict';

const {program} = require('commander');
const fetchWebmentions = require('./lib/action/fetch-webmentions');

// Program options
program
	.name('site wm:fetch')
	.requiredOption(
		'-a, --api-key <apiKey>',
		'the Webmention.io API key'
	)
	.description('fetch raw webmentions')
	.action(async ({apiKey}) => {
		try {
			await fetchWebmentions(apiKey);
		} catch (error) {
			console.error(error.message);
			process.exitCode = 1;
		}
	})
	.parseAsync(process.argv);