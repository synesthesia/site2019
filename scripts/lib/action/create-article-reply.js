#!/usr/bin/env node
// adapted from work by Rowan Manning
// https://github.com/rowanmanning/rowanmanning.com
// https://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_GB
'use strict';

const util = require('util');

const exec = util.promisify(require('child_process').exec);
const fetchRef = require('./fetch-ref');
const fs = require('fs/promises');
const mkdir = require('../util/mkdir');
const pad = require ('../util/pad');
const path = require('path');
const  slugify = require('slugify');

const validContentTypes = ['reply'];
const contentTypesRequiringUrl = ['reply'];

const contentDirectory = path.resolve(__dirname, '../../../content/post');

module.exports = async function createArticleReply(url, type ) {

	console.log(`type:${type} url:${url} `)
	// Check for valid type
	if (!validContentTypes.includes(type)) {
		throw new Error(`note type must be one of ${validContentTypes.join(', ')}`);
	}

	// Check for types which require a URL
	if (contentTypesRequiringUrl.includes(type) && !url) {
		throw new Error(`URL is required for post type of ${type}`);
	}

	  
	let remoteTitle;
	let remoteAuthor;

	// Fetch a reference
	if (url) {
		const webPage = await fetchRef(url);
		url = webPage.url;
		remoteTitle = webPage.title;
		remoteAuthor = webPage.author;
	}
    console.log(remoteAuthor);
	console.log(remoteTitle)
	// Create the posts directory
	await mkdir(contentDirectory);

	const postTime = new Date();
	const y = postTime.getFullYear();
	const m = pad(postTime.getMonth()+1);
	const d = pad(postTime.getDate());

	const folder = path.join(contentDirectory,`${y}`);
	const titleForSlug = `Reply to ${remoteAuthor?.name  || remoteTitle }`
	const slug = slugify(titleForSlug, {lower: true});
    const fName = `${y}-${m}-${d}-${slug}`;
	//const fName = `${slug}`;

	// Prepare environment variables
	const env = Object.assign({}, process.env, {NOTE_REF_URL: url}, {NOTE_REF_TITLE: remoteTitle}, {NOTE_REF_AUTHOR: remoteAuthor?.name});

	// Create the new post file
	await exec(`hugo new ${folder}/${fName} --kind _post/${type}`, {env});

	// Log success
	console.log('');
	console.log(`Created article ${fName} and saved it:`);
	console.log(path.join(folder, `${fName}`, 'index.md'));
};