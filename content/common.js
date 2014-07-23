//
'use strict';

var A = require ('april1-html');

var commonViews = require ('../views/common');
var params = require ('../views/params');

/**
 *
 * @param db
 * @returns {Function}
 */
function init (db) {
	return function doInit (req, res, next) {
		req.db = db;
		req.AParams = {};
		next ();
	};
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
function navigation (req, res, next) {
	var login, logout;
	if (req.isAuthenticated ()) {
		login = '';
		logout = commonViews.navigationLogout;

	} else {
		login = commonViews.navigationLogin;
		logout = '';
	}

	req.AParams [params.navLogin] = login;
	req.AParams [params.navLogout] = logout;

	next ();
}

/**
 *
 * @param req
 * @param res
 */
function render (req, res) {
	res.send (
		A.string (
			commonViews.template,
			req.AParams
		)
	);
}

module.exports = {
	init: init,
	navigation: navigation,
	render: render
};
