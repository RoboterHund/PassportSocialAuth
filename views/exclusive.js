//
'use strict';

var A = require ('april1-html');

var params = require ('./params');

var exclusiveContent = A.template (
	A.p (
		'Username: ',
		A.insert (params.username),
		' (',
		A.insert (params.authProvider),
		')'
	),
	A.p (
		'Look at this: ⑨!'
	)
);

module.exports = {
	exclusiveContent: exclusiveContent
};
