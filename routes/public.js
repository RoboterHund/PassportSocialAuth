// router
// public area
'use strict';

var map = require ('./map');
var content = require ('../content/public');

// setup publicly accessible routes
function setupPublicRoutes (router) {
	var root = map.root;

	router.get (
		root.ROUTE,
		content.root
	);
	router.get (
		root.public.ROUTE,
		content.public
	);
	router.get (
		root.authFail.ROUTE,
		content.authFail
	);
	router.get (
		root.login.ROUTE,
		content.login
	);
}

module.exports = {
	setupPublicRoutes: setupPublicRoutes
};

