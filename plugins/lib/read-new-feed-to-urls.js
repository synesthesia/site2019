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

import { createReadStream } from 'node:fs';
import parseFeedToUrls from './parse-feed-to-urls.js';

export default function readNewSitemap(path) {
  const stream = createReadStream(path, { encoding: 'utf8' });

  return parseFeedToUrls(stream);
}