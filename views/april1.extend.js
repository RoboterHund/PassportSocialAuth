//
'use strict';

var core = require ('april1');
var A = require ('april1-html');

/**
 *
 * @param title
 * @returns {Array}
 */
function inTitle (title) {
	return core.spec.specNode (
		A.types.ATTR,
		'title',
		title
	);
}

module.exports = {
	inTitle: inTitle
};
