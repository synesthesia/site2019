#!/usr/bin/env node
// adapted from work by Rowan Manning
// https://github.com/rowanmanning/rowanmanning.com
// https://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_GB
'use strict';

import { md5 } from './md5';
import { mkdir } from './mkdir';
import { path } from 'path';
import { saveJSON } from './save-json';
import { WebPage } from './web-page';
import GitHub from '../micropub/github'

const refsDirectory = path.resolve(__dirname, '../../../data/refs');

module.exports = async function fetchRef(refUrl, remote = false) {

	// Fetch the web page
	const webPage = await WebPage.get(refUrl)
	const canonicalUrl = webPage.url
	const hash = md5(canonicalUrl)

	// Create the refs directory
	await mkdir(refsDirectory)

	// Save the ref as a JSON file
	const filePath = path.join(refsDirectory, `${hash}.json`)
    if (remote) {
        await GitHub.createFile(filePath, webPage)
    } else {
        await saveJSON(filePath, webPage)
    }

	// Log success
	console.log(`Fetched URL ${canonicalUrl} |  '${webPage.title}' and saved as JSON:`)
	console.log(filePath)

	// Return the web page instance
	return webPage
};
