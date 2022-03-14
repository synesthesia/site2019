
'use strict';

module.exports = function pad(n) {
	let str = String(n);
    while (str.length < 2){
        str = `0${str}`;
    }
    return str;
};