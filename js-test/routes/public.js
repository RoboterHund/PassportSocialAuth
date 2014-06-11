// router
// public area
'use strict';

var map = require ('./map');
var content = require ('../content/public');

// setup publicly accessible routes
function publicRoutes (router) {
	router.get (
			map.root,
			content.root
	);
	router.get (
			map.public_1,
			content.public_1
	);
	router.get (
			map.public_2,
			content.public_2
	);
	router.get (
			map.login,
			content.login
	);
}

module.exports = publicRoutes;

