#!/usr/bin/env node
'use strict';

const {program} = require('commander');
const createArticleReply = require('./lib/action/create-article-reply');

// Program options
program
	.name('site article:createreply')
    .argument('<url>', 'the URL that the article replies to')
	.option(
		'-t, --type <type>',
		'the type of article to create',
		'article'
	)
	.description('create a new article-based reply')
	.action(async (url, {type}) => {
		try {
			await createArticleReply(url, type);
		} catch (error) {
			console.error(error.message);
			process.exitCode = 1;
		}
	})
	.parseAsync(process.argv);