// passport initialization module
'use strict';

var psaDebug = require ('debug') ('PassportSocialAuth:init');

var strategyNames = require ('./strategies');

function initPassport (config) {
	var passport = require ('passport');

	function useStrategyParams (strategyParams) {
		initStrategy (passport, strategyParams);
	}

	paramList.forEach (useStrategyParams);
	// FIXME where to return?
}

// find user in DB
// register new user
function checkUserRegister (provider, profile, done) {

}

function initStrategy (passport, params) {
	switch (params.name) {
	case 'facebook':
		passport.useStrategy (
				require ('./init/facebook') (
						passport, params, checkUserRegister)
		);
		break;

	case 'github':
		passport.useStrategy (
				require ('./init/github') (
						passport, params, checkUserRegister)
		);
		break;

	case 'google':
		passport.useStrategy (
				require ('./init/google') (
						passport, params, checkUserRegister)
		);
		break;

	case 'twitter':
		passport.useStrategy (
				require ('./init/twitter') (
						passport, params, checkUserRegister)
		);
		break;

	default:
		psaDebug ('unsupported strategy [%s]', params.name);
		return;
	}
}

function setupRoutes () {
	// TODO
}

/**
 * ConfigBuilder wrapper that stores auth config in module
 * @param module passport auth module
 * @constructor
 */
function ModuleConfigBuilder (module) {
	var ConfigBuilder = require ('./builder');
	ConfigBuilder.call (this);

	var finish = this.finish;
	this.finish = function () {
		var config = finish.apply (this, arguments);
		module.config = config;
		return config;
	};
}

function passportAuthBundle () {

	var module = {
		config: null
	};

	var passport = require ('passport');

	/**
	 * get passport auth config builder
	 * @returns {ModuleConfigBuilder}
	 * builder with chainable methods ending with .finish()
	 */
	function startConfig () {
		return new ModuleConfigBuilder (module);
	}

	/**
	 * make app use passport auth middleware
	 * after using session middleware
	 * @param app express app
	 */
	function appUsePassport (app) {
		app.use (passport.initialize ());
		app.use (passport.session ());
	}

	/**
	 * make app use passport auth middleware
	 * after using session middleware
	 * @param router router,
	 *  must conform to the common .VERB (router, callbacks...) interface
	 */
	function routerGetAuth (router) {

	}

	/**
	 * get function that redirects request to
	 */
	function nonAuthRedirector () {

	}

	module.startConfig = startConfig;
	module.appUsePassport = appUsePassport;
	module.routerGetAuth = routerGetAuth;
	module.nonAuthRedirector = nonAuthRedirector;
	module.strategies = strategyNames;

	return module;
}

module.exports = passportAuthBundle;
