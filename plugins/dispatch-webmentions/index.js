import { join as pathJoin, sep as pathSep } from 'node:path';

import fetchOldFeedToUrls from '../lib/fetch-old-feed-to-urls.js';
import readNewFeedToUrls from '../lib/read-new-feed-to-urls.js';
import { dispatchWebmentionsForUrl } from './dispatch-webmentions-for-url.js';

// This is probably unnecessary since each method in this module will only be
// invoked once (and even then only in sequence).
const oldUrlsForBuild = new Map();
const pageRegex = new RegExp('^https://www.synesthesia.co.uk/.+');

export async function onPreBuild({ utils }) {
  const feedUrl = `${process.env.URL}/index.xml`;

  try {
    const oldUrls = await fetchOldFeedToUrls(feedUrl);
    oldUrlsForBuild.set(process.env.BUILD_ID, oldUrls);
    console.log('Number of old URLs:', oldUrls.size);
  } catch (error) {
    utils.build.failPlugin('Error making feed request.', { error, feedUrl });
  }
}

export async function onSuccess({ constants }) {
  const oldUrls = oldUrlsForBuild.get(process.env.BUILD_ID);
  const newUrls = await readNewFeedToUrls(pathJoin('.', constants.PUBLISH_DIR, 'index.xml'));

  console.log('Number of new URLs:', newUrls.size);

  // URLs are checked and mentions dispatched in sequence deliberately to make
  // logs more comprehensible. It will be uncommon for more than one URL to be
  // new at a time anyway.
  for (const url of newUrls) {
    if (pageRegex.test(url) && !oldUrls.has(url)) {
      const path = pathJoin('.', constants.PUBLISH_DIR, pathSep);
      console.log('Dispatching webmentions for:', url, ' in:', path);

       try {
        await dispatchWebmentionsForUrl(url, process.env.URL, path);
        console.log('Done dispatching webmentions for:', url);
      } catch (error) {
        console.error(`Error dispatching webmentions for ${url}: ${error.stack || error.message}`);
      }
    }
  }
}

export function onEnd() {
  oldUrlsForBuild.delete(process.env.BUILD_ID);
}