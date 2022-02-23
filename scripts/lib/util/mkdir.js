// adapted from work by Rowan Manning
// https://github.com/rowanmanning/rowanmanning.com
// https://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_GB

'use strict';

const fs = require('fs/promises');

module.exports = function mkdir(path) {
	return fs.mkdir(path, {recursive: true});
};