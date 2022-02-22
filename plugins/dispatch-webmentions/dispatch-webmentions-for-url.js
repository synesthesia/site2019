/*
Copyright (C) 2021 Mark S. Everitt, https://github.com/qubyte/qubyte-codes
Modifications (C) 2022 Julian Elve https://github.com/synesthesia/site2019

This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { readFile, lstat} from 'node:fs/promises';
import { join as pathJoin, sep as pathSep } from 'node:path';
import { pathToFileURL } from 'node:url';
import linkHeader from 'http-link-header';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

const IGNORED_HOSTNAMES = [
  'localhost',
  'webmention.io',
  'twitter.com',
  'github.com',
  'www.w3.org',
  'paypal.me',
  'www.synesthesia.co.uk'
];
const ALLOWED_PROTOCOLS = [
  'https:',
  'http:'
];

/** @param {Document} document */
function* getValidUrlsFromDocument(content, url) {
  const { window } = new JSDOM(content, { url });

  /** @type NodeListOf<HTMLAnchorElement> */
  const anchors = window.document.querySelectorAll('.h-entry a[href]');

  for (const { href } of anchors) {
    try {
      const url = new URL(href);

      if (ALLOWED_PROTOCOLS.includes(url.protocol) && !IGNORED_HOSTNAMES.includes(url.hostname)) {
        yield url;
      }
    } catch {
      continue;
    }
  }
}

/**
 * https://www.w3.org/TR/webmention/#h-sender-discovers-receiver-webmention-endpoint
 * @param {URL} url
 */
async function getEndpoint(url) {
  const res = await fetch(url);
  const [webmention] = linkHeader.parse(res.headers.link || '').rel('webmention');

  // Link header takes precedence.
  if (webmention) {
    return new URL(webmention.uri, res.url);
  }

  if (!res.ok) {
    throw new Error(`Unexpected status: ${res.status}`);
  }

  const { window } = new JSDOM(await res.text(), { url: res.url });

  // If no webmention link header is discovered, the first webmention link or
  // anchor is picked (if any).

  const href = window.document.querySelector('link[href][rel~="webmention"], a[href][rel~="webmention"]')?.href;

  try {
    return href ? new URL(href) : null;
  } catch {
    return null;
  }
}

/**
 * @param {string|URL} endpoint
 * @param {string|URL} source
 * @param {string|URL} target
 */
async function dispatchMention(endpoint, source, target) {
  const res = await fetch(endpoint, {
    method: 'POST',
    body: new URLSearchParams({ source, target })
  });

  if (!res.ok) {
    throw new Error(`Unexpected status from webmention endpoint: ${res.status}, source: ${source}, target: ${target}`);
  }
}

function pathDirToUrl(path) {
  const pathUrl = pathToFileURL(path);

  if (!pathUrl.href.endsWith('/')) {
    pathUrl.href += '/';
  }

  return pathUrl;
}

/**
 * @param {string} url
 * @param {string} baseUrl
 * @param {string} publicDir Must end with a path separator!
 */
export async function dispatchWebmentionsForUrl(url, baseUrl, publicDir) {
  if (!url.startsWith(baseUrl)) {
    throw new Error(`URL mismatch: ${url} - ${baseUrl}`);
  }

  const { pathname } = new URL(url);
  // The path must not start with a / because we want a relative resolution from
  // the public dir.
  var resolvedUrl = new URL(pathname.slice(1), pathDirToUrl(publicDir));

  // hugo page bundle
  if ( (await lstat(resolvedUrl)).isDirectory()) {
    const newPath =  pathJoin(pathname.slice(1), 'index.html');
    resolvedUrl = new URL(newPath, pathDirToUrl(publicDir));
  }
  
  const content = await readFile(resolvedUrl, 'utf8');

  for (const targetUrl of getValidUrlsFromDocument(content, url)) {
    // Note; assumes that the targetUrl is the canonical URL.
    let endpoint;

    try {
      endpoint = await getEndpoint(targetUrl);
    } catch (error) {
      console.warn('FAILED TO GET ENDPOINT:', targetUrl, error);
      continue;
    }

    if (!endpoint) {
      continue;
    }

    console.log('DISPATCHING MENTION endpoint:', endpoint.href, 'source:', url, 'target:', targetUrl.href);

    try {
      await dispatchMention(endpoint, url, targetUrl);
      console.log('DISPATCHED MENTION for target:', targetUrl.href);
    } catch (e) {
      console.error('FAILED:', e);
    }
  }
}