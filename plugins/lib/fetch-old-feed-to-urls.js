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

import retry from 'p-retry';
import parseFeedToUrls from './parse-feed-to-urls.js';
import fetch from 'node-fetch';

async function fetchOldFeed(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Unexpected response from ${url}: ${res.status} ${await res.text()}`);
  }

  return parseFeedToUrls(res.body);
}

export default function (url) {
  return retry(() => fetchOldFeed(url), { retries: 5 });
}