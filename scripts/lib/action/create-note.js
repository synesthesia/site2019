#!/usr/bin/env node
'use strict';

const util = require('util');

const exec = util.promisify(require('child_process').exec);
const fetchRef = require('./fetch-ref');
const fs = require('fs/promises');
const mkdir = require('../util/mkdir');
const path = require('path');

const validNoteTypes = ['bookmark', 'like', 'note', 'reply', 'repost'];
const noteTypesRequiringUrl = ['bookmark', 'like', 'reply', 'repost'];

const contentDirectory = path.resolve(__dirname, '../../../content/stream');

module.exports = async function createNote(type, url) {

	// Check for valid type
	if (!validNoteTypes.includes(type)) {
		throw new Error(`note type must be one of ${validNoteTypes.join(', ')}`);
	}

	// Check for types which require a URL
	if (noteTypesRequiringUrl.includes(type) && !url) {
		throw new Error(`URL is required for note type of ${type}`);
	}

	let remoteTitle;
	// Fetch a reference
	if (url) {
		const webPage = await fetchRef(url);
		url = webPage.url;
		remoteTitle = webPage.title;
	}

	// Create the notes directory
	await mkdir(contentDirectory);

	// Read existing notes to work out the next number in sequence
	const existingNotes = (await fs.readdir(contentDirectory))
		.filter(note => !note.includes('.'))
		.map(note => Number(note))
		.filter(number => !isNaN(number));
	const lastNote = (existingNotes.length ? Math.max(...existingNotes) : 0);
	const nextNote = lastNote + 1;

	// Prepare environment variables
	const env = Object.assign({}, process.env, {NOTE_REF_URL: url},  {NOTE_REF_TITLE: remoteTitle});

	// Create the new note file
	await exec(`hugo new stream/${nextNote} --kind _stream_/${type}`, {env});

	// Log success
	console.log('');
	console.log(`Created note ${nextNote} and saved it:`);
	console.log(path.join(contentDirectory, `${nextNote}`, 'index.md'));
};