// test server
'use strict';

var debugs = require ('./debug');

// TODO replace
var passportAuth = require ('../js/main') ();
//var passportAuth = require ('passport-social-auth');

// start express server
function startExpressServer () {
	var express = require ('express');
	var app = express ();
	var passportConfig = getPassportConfig (passportAuth);

	app.use (getStaticServer (express));

	app.use (getCookieParser ());
	app.use (getExpressSession ());

	passportAuth.appUsePassport (app);

	var router = new express.Router ();
	require ('./routes/public') (router);
	passportAuth.routerGetAuth (router);
	require ('./routes/restricted') (router);
	app.use (router);

	var server;

	function listenCallback () {
		onListen (server);
	}

	server = app.listen (
			getListenPort (),
			listenCallback
	);
}

// get cookie parser
function getCookieParser () {
	var cookieParser = require ('cookie-parser');
	return cookieParser ();
}

// get express sessions
function getExpressSession () {
	var sessionParams = require ('./private/session');
	var expressSession = require ('express-session');

	var connectMongo = require ('connect-mongo');
	var MongoStore = connectMongo (expressSession);
	var mongoStore = new MongoStore (
			{
				db: sessionParams.db,
				collection: sessionParams.collection,
				stringify: false
			}
	);

	return expressSession (
			{
				secret: sessionParams.secret,
				store: mongoStore
			}
	);
}

// get passport configuration
function getPassportConfig (passportAuth) {
	var authParams = require ('./private/auth');

	var url = require ('url');
	var host = getHost ();

	var routesMap = require ('./routes/map');
	var facebookRoutes = routesMap.auth.facebook;

	return new passportAuth.startConfig ()

			.provider (passportAuth.strategies.facebook)
			.apiToken (authParams.facebook.token)
			.secret (authParams.facebook.secret)
			.loginRoute (url.resolve (host, facebookRoutes.login))
			.callbackUrl (facebookRoutes.back)
			.callbackRoute (url.resolve (host, facebookRoutes.back))

			.authSuccessRedirect (routesMap.public_2)
			.authFailureRedirect (routesMap.public_1)

			.finish ();
}

// get static server
function getStaticServer (express) {
	var path = require ('path');
	return express.static (path.join (__dirname, 'static'));
}

// get host
function getHost () {
	return require ('url').parse (
			{
				protocol: 'http',
				hostname: 'localhost',
				port: getListenPort ()
			}
	);
}

// get listen port
function getListenPort () {
	//noinspection JSUnresolvedVariable
	return process.env.PORT || 8080;
}

// listen start callback
function onListen (server) {
	debugs.main ('start listen on %s', server.address ().port);
}

// start server
startExpressServer ();
