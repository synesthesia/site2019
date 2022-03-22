// adapted from work by Rowan Manning
// https://github.com/rowanmanning/rowanmanning.com
// https://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_GB

'use strict';

import fs from 'fs/promises';

module.exports = function saveJSON(path, data) {
	return fs.writeFile(path, JSON.stringify(data, null, '\t'));
};
