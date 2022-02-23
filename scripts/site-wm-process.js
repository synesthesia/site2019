#!/usr/bin/env node
// adapted from work by Rowan Manning
// https://github.com/rowanmanning/rowanmanning.com
// https://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_GB

'use strict';

const processWebmentions = require('./lib/action/process-webmentions.js');
const {program} = require('commander');

// Program options
program
	.name('site wm:process')
	.description('process raw webmentions')
	.action(async () => {
		try {
			await processWebmentions();
		} catch (error) {
			console.error(error.message);
			process.exitCode = 1;
		}
	})
	.parseAsync(process.argv);