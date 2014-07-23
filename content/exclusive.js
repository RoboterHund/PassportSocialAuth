// exclusive content
'use strict';

var dbConfig = require ('../private/db');
var exclusiveViews = require ('../views/exclusive');
var params = require ('../views/params');

var authCollection = dbConfig.collections.auth;

function exclusive (debug) {
	return function getExclusive (req, res, next) {
		req.AParams [params.pageTitle] = 'Exclusive content';
		req.AParams [params.content] =
			exclusiveViews.exclusiveContent;
		var userId = req.session.passport.user;
		req.db.collection (authCollection).findOne (
			{
				_id: userId
			},
			accessUserFound (req, next, userId, debug)
		);
	};
}

/**
 *
 * @param req
 * @param next
 * @param id
 * @param debug
 * @returns {Function}
 */
function accessUserFound (req, next, id, debug) {
	return function onAccessUserFound (err, user) {
		if (err) {
			debug ('failed to find user ' + id);
			next (err);
		} else {
			req.AParams [params.username] = user.data.displayName;
			req.AParams [params.authProvider] = user.from;
			next ();
		}
	};
}

module.exports = {
	exclusive: exclusive
};
