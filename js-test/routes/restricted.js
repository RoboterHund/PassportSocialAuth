// router
// restricted area
'use strict';

var map = require ('./map');
var content = require ('../content/exclusive');

// redirect non-authenticated requests to login
function redirectUnauthenticated (req, res, next) {
	if (req.isAuthenticated ()) {
		next ();
	} else {
		res.redirect (map.login);
	}
}

// setup routes that require authentication
function restrictedRoutes (router) {
	router.get (
			map.exclusive_1,
			redirectUnauthenticated,
			content.exclusive_1
	);
	router.get (
			map.exclusive_2,
			redirectUnauthenticated,
			content.exclusive_2
	);
}

module.exports = restrictedRoutes;
