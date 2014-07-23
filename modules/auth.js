//
'use strict';

var url = require ('url');

var FacebookStrategy = require ('passport-facebook').Strategy;
var GithubStrategy = require ('passport-github').Strategy;
var GoogleStrategy = require ('passport-google').Strategy;
var TwitterStrategy = require ('passport-twitter').Strategy;

var authParams = require ('../private/auth');
var dbConfig = require ('../private/db');

var authCollection = dbConfig.collections.auth;

/**
 *
 * @param host
 * @param passport
 * @param {e.Express} app
 * @param db
 * @param map
 * @param debug
 */
function usePassport (host, passport, app, db, map, debug) {
	app.use (passport.initialize ());
	app.use (passport.session ());

	passport.serializeUser (serializeUser ());
	passport.deserializeUser (deserializeUser (db, debug));

	var check = checkUser (db, debug);
	useFacebookStrategy (host, passport, map, check);
	useGithubStrategy (host, passport, map, check);
	useGoogleStrategy (host, passport, map, check);
	useTwitterStrategy (host, passport, map, check);
}

/**
 *
 * @param host
 * @param passport
 * @param map
 * @param check
 */
function useFacebookStrategy (host, passport, map, check) {
	passport.use (
		new FacebookStrategy (
			{
				clientID: authParams.facebook.id,
				clientSecret: authParams.facebook.secret,
				callbackURL: url.resolve (
					host,
					map.root.login.facebook.back.ROUTE
				)
			},
			function (accessToken, refreshToken, profile, done) {
				check ('Facebook', profile, done);
			}
		)
	);
}

/**
 *
 * @param host
 * @param passport
 * @param map
 * @param check
 */
function useGithubStrategy (host, passport, map, check) {
	passport.use (
		new GithubStrategy (
			{
				clientID: authParams.github.id,
				clientSecret: authParams.github.secret,
				callbackURL: url.resolve (
					host,
					map.root.login.github.back.ROUTE
				)
			},
			function (accessToken, refreshToken, profile, done) {
				check ('GitHub', profile, done);
			}
		)
	);
}

/**
 *
 * @param host
 * @param passport
 * @param map
 * @param check
 */
function useGoogleStrategy (host, passport, map, check) {
	passport.use (
		new GoogleStrategy (
			{
				returnURL: url.resolve (
					host,
					map.root.login.google.back.ROUTE
				),
				realm: host
			},
			function (identifier, profile, done) {
				check ('Google', profile, done);
			}
		)
	);

}

/**
 *
 * @param host
 * @param passport
 * @param map
 * @param check
 */
function useTwitterStrategy (host, passport, map, check) {
	passport.use (
		new TwitterStrategy (
			{
				consumerKey: authParams.twitter.key,
				consumerSecret: authParams.twitter.secret,
				callbackURL: url.resolve (
					host,
					map.root.login.twitter.back.ROUTE
				)
			},
			function (accessToken, refreshToken, profile, done) {
				check ('Twitter', profile, done);
			}
		)
	);
}

/**
 *
 * @returns {Function}
 */
function serializeUser () {
	return function doSerializeUser (user, done) {
		done (null, user._id);
	};
}

/**
 *
 * @param db
 * @param debug
 * @returns {Function}
 */
function deserializeUser (db, debug) {
	return function doDeserializerUser (id, done) {
		db.collection (
			authCollection
		).findOne (
			{
				_id: id
			},
			userFound (id, done, debug)
		);
	};
}

/**
 *
 * @param id
 * @param done
 * @param debug
 * @returns {Function}
 */
function userFound (id, done, debug) {
	return function onUserFound (err, user) {
		if (err) {
			debug ('failed to find user ' + id);
			done (err, null);
		} else {
			done (null, user);
		}
	};
}

/**
 *
 * @param db
 * @param debug
 * @returns {Function}
 */
function checkUser (db, debug) {
	return function doCheckUser (from, profile, done) {
		db.collection (
			authCollection
		).findOne (
			{
				from: from,
				authId: profile.id
			},
			registerUser (db, from, profile, done, debug)
		);
	};
}

/**
 *
 * @param db
 * @param from
 * @param profile
 * @param done
 * @param debug
 * @returns {Function}
 */
function registerUser (
	db, from, profile, done, debug) {

	return function doRegisterUser (err, user) {
		if (err) {
			debug (err);

		} else {
			if (user !== null) {
				done (null, user);

			} else {
				db.collection (
					authCollection
				).insert (
					{
						from: from,
						authId: profile.id,
						created: Date.now (),
						data: profile
					},
					userInserted (profile, done, debug)
				);
			}
		}
	};
}

/**
 *
 * @returns {Function}
 */
function userInserted (profile, done, debug) {
	return function onUserInserted (err, result) {
		if (err) {
			debug (err);
			done (err, null);
		} else {
			debug (
				"user added; id: '%s', name; '%s' result: '%s'",
				profile.id,
				profile.displayName,
				JSON.stringify (result)
			);
			done (null, result[0]);
		}
	};
}

/**
 *
 * @param router
 * @param passport
 * @param map
 */
function setupAuthRoutes (router, passport, map) {
	var loginRoute = map.root.login;
	var successRedirect = redirectAuthenticated (map);

	setupAuthStrategyRoutes (
		router, passport, map,
		loginRoute.facebook,
		'facebook',
		successRedirect
	);

	setupAuthStrategyRoutes (
		router, passport, map,
		loginRoute.github,
		'github',
		successRedirect
	);

	setupAuthStrategyRoutes (
		router, passport, map,
		loginRoute.google,
		'google',
		successRedirect
	);

	setupAuthStrategyRoutes (
		router, passport, map,
		loginRoute.twitter,
		'twitter',
		successRedirect
	);

	router.get (
		map.root.logout.ROUTE,
		function (req, res) {
			req.logout ();
			res.redirect (map.root.ROUTE);
		}
	);
}

/**
 *
 * @param router
 * @param passport
 * @param map
 * @param loginRoute
 * @param provider
 * @param successRedirect
 */
function setupAuthStrategyRoutes (
	router, passport, map, loginRoute, provider, successRedirect) {

	router.get (
		loginRoute.ROUTE,
		passport.authenticate (provider),
		nop
	);

	router.get (
		loginRoute.back.ROUTE,
		passport.authenticate (
			provider,
			{
				failureRedirect: map.root.authFail.ROUTE
			}
		),
		successRedirect
	);
}

/**
 * nop
 */
function nop () {
}

/**
 *
 * @param map
 * @returns {Function}
 */
function redirectAuthenticated (map) {
	return function doRedirectAuthenticated (req, res) {
		res.redirect (map.root.exclusive.ROUTE);
	};
}

module.exports = {
	usePassport: usePassport,
	setupAuthRoutes: setupAuthRoutes
};
