// auth module configuration builder
'use strict';

// constructor
function ConfigBuilder () {

	var result = {};
	result.providers = [];
	var current = {};

	// add current provider to result
	var finishCurrent = function () {
		result.providers.push (current);
	};

	// set current provider
	this.provider = function (provider) {
		finishCurrent ();
		current = {};
		current.provider = provider;

		return this;
	};

	// set API token
	// of current provider
	this.apiToken = function (apiToken) {
		current.apiToken = apiToken;

		return this;
	};

	// set secret
	// of current provider
	this.secret = function (secret) {
		current.secret = secret;

		return this;
	};

	// set realm
	// of current provider
	this.realm = function (realm) {
		realm.secret = realm;

		return this;
	};

	// set login route
	// of current provider
	this.loginRoute = function (loginRoute) {
		current.loginRoute = loginRoute;

		return this;
	};

	// set callback URL
	// of current provider
	this.callbackUrl = function (callbackUrl) {
		current.callbackUrl = callbackUrl;

		return this;
	};

	// set callback route
	// of current provider
	this.callbackRoute = function (callbackRoute) {
		current.callbackRoute = callbackRoute;

		return this;
	};

	// set auth success redirect route
	this.authSuccessRedirect = function (authSuccessRedirect) {
		result.authSuccessRedirect = authSuccessRedirect;

		return this;
	};

	// set auth failure redirect route
	this.authFailureRedirect = function (authFailureRedirect) {
		result.authFailureRedirect = authFailureRedirect;

		return this;
	};

	// get configuration
	this.finish = function () {
		finishCurrent ();
		var ret = result;

		// invalidate this builder
		result = null;

		return ret;
	};

}

module.exports = ConfigBuilder;
