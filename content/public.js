// public content
'use strict';

var publicViews = require ('../views/public');
var params = require ('../views/params');

/**
 *
 * @param req
 * @param res
 * @param next
 */
function root (req, res, next) {
	req.AParams [params.pageTitle] = 'Passport Social Auth test';
	req.AParams [params.content] = publicViews.rootTemplate;
	next ();
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
function contentPublic (req, res, next) {
	req.AParams [params.pageTitle] = 'About';
	req.AParams [params.content] = publicViews.about;
	next ();
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
function authFail (req, res, next) {
	req.AParams [params.pageTitle] = 'Login failed';
	req.AParams [params.content] = publicViews.authFail;
	next ();
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
function login (req, res, next) {
	req.AParams [params.pageTitle] = 'Login with Passport';
	req.AParams [params.content] = publicViews.login;
	next ();
}

module.exports = {
	root: root,
	public: contentPublic,
	authFail: authFail,
	login: login
};
