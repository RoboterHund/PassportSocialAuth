// debug targets
'use strict';

var debug = require ('debug');

/**
 *
 * @param name
 * @returns {Function}
 */
function newDebug (name) {
	return debug ('PassportSocialAuth:' + name);
}

/**
 *
 */
var debugs = {
	main: newDebug ('main'),
	auth: newDebug ('auth')
};

module.exports = debugs;
