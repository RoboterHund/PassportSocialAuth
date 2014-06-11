// debug targets
'use strict';

var debug = require ('debug');

function newDebug (name) {
	return debug ('PassportSocialAuth:test:' + name);
}

var debugs = {
	main: newDebug ('main'),
	auth: newDebug ('auth')
};

module.exports = debugs;
