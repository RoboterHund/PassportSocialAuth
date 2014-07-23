// router
// restricted area
'use strict';

var map = require ('./map');
var content = require ('../content/exclusive');

// redirect unauthenticated requests
function redirectUnauthenticated (req, res, next) {
	if (req.isAuthenticated ()) {
		next ();
	} else {
		res.redirect (map.root.login.ROUTE);
	}
}

// setup routes that require authentication
function setupRestrictedRoutes (router) {
	router.get (
		map.root.exclusive.ROUTE,
		redirectUnauthenticated,
		content.exclusive ()
	);
}

module.exports = {
	setupRestrictedRoutes: setupRestrictedRoutes
};
