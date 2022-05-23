// adapted from work by Rowan Manning
// https://github.com/rowanmanning/rowanmanning.com
// https://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_GB
'use strict';

import { crypto } from 'crypto';

module.exports = function md5(string) {
	return crypto.createHash('md5').update(string).digest('hex');
};
