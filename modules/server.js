//
'use strict';

var path = require ('path');
var url = require ('url');

var connectMongo = require ('connect-mongo');
var cookieParser = require ('cookie-parser');
var express = require ('express');
var expressSession = require ('express-session');
var favicon = require ('serve-favicon');
var passport = require ('passport');

var dbConfig = require ('../private/db');
var portParams = require ('../private/port');
var sessionParams = require ('../private/session');
var routesMap = require ('../routes/map');
var routesPublic = require ('../routes/public');
var routesRestricted = require ('../routes/restricted');
var content = require ('../content/common');

var auth = require ('./auth');
var db = require ('./db');
var debug = require ('./debug');

/**
 *
 */
function initServer (rootDirName) {
	var app = express ();
	var database = db.database (debug.main);

	var host = url.format (
		{
			protocol: 'http',
			hostname: 'localhost',
			port: portParams.listenPort
		}
	);

	// static server
	var staticDir = path.join (rootDirName, 'static');
	app.use (express.static (staticDir));

	// favicon
	app.use (favicon (path.join (staticDir, 'favicon.ico')));

	// cookies
	app.use (cookieParser ());

	// session
	var MongoStore = connectMongo (expressSession);
	var mongoStore = new MongoStore (
		{
			db: dbConfig.name,
			collection: dbConfig.collections.session,
			stringify: false
		}
	);
	app.use (expressSession ({
		secret: sessionParams.secret,
		store: mongoStore
	}));

	// passport
	auth.usePassport (
		host,
		passport,
		app,
		database,
		routesMap,
		debug.auth);

	// view param values
	app.use (content.init (database));
	app.use (content.navigation);

	// router
	var router = new express.Router ();
	routesPublic.setupPublicRoutes (router);
	routesRestricted.setupRestrictedRoutes (router);
	auth.setupAuthRoutes (router, passport, routesMap);
	app.use (router);

	// render view
	app.use (content.render);

	// start listen port
	var server;

	function onListen () {
		debug.main (
			'start listen on %s',
			server.address ().port
		);
	}

	server = app.listen (
		portParams.listenPort,
		onListen
	);
}

module.exports = {
	initServer: initServer
};
