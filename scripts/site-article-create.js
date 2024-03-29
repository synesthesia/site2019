#!/usr/bin/env node
'use strict';

const {program} = require('commander');
const createArticle = require('./lib/action/create-article');

// Program options
program
	.name('site article:create')
    .argument('<title>', 'the title of the article')
	.option(
		'-t, --type <type>',
		'the type of article to create',
		'article'
	)
	.description('create a new article')
	.action(async (title, {type}) => {
		try {
			await createArticle(title, type);
		} catch (error) {
			console.error(error.message);
			process.exitCode = 1;
		}
	})
	.parseAsync(process.argv);