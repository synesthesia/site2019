#!/usr/bin/env node
'use strict';

const manifest = require('../package.json');
const {program} = require('commander');

program
	.version(manifest.version)
    /*
	.command('weeknote:create', 'create a new weeknote', {
		executableFile: 'site-weeknote-create'
	})
	.command('note:create', 'create a new note', {
		executableFile: 'site-note-create'
	})
	.command('ref:fetch', 'fetch a URL and save information about it as JSON', {
    		executableFile: 'site-ref-fetch'
	})
	*/
	.command('article:create', 'create a new article', {
		executableFile: 'site-article-create'
	})
	.command('wm:fetch', 'fetch raw webmentions', {
		executableFile: 'site-wm-fetch'
	})
	.command('wm:process', 'process raw webmentions', {
		executableFile: 'site-wm-process'
	})
	.parse(process.argv);