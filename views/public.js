//
'use strict';

var A = require ('april1-html');

var map = require ('../routes/map');

var params = require ('./params');

/**
 * @var {TemplateHead}
 */
var rootTemplate =
	A.template (
		A.p ('This is the main page.')
	);

var about = A.string (
	A.template (
		A.p ('This little project is intended to ',
			'show one way to integrate ',
			A.em ('express'),
			', ',
			A.em ('passport'),
			', ',
			A.em ('mongoskin'),
			' and ',
			A.em ('april1-html'),
			'.')
	),
	{}
);

var authFail = A.string (
	A.template (
		A.p (
			'Authentication failed.'
		),
		A.p (
			A.a (
				A.href (map.root.login.ROUTE),
				'Back'
			)
		)
	),
	{}
);

function login () {
	var providers = {};
	providers [params.authProviders] = [
		provider (
			map.root.login.facebook.ROUTE,
			'Facebook'
		),
		provider (
			map.root.login.github.ROUTE,
			'GitHub'
		),
		provider (
			map.root.login.google.ROUTE,
			'Google'
		),
		provider (
			map.root.login.twitter.ROUTE,
			'Twitter'
		)
	];
	return A.string (
		A.template (
			A.p (
				'Login with:'
			),
			A.ul (
				A.list (
					params.authProviders,
					A.li (
						A.a (
							A.href (A.insert (params.authRoute)),
							A.insert (params.authProvider)
						)
					)
				)
			)
		),
		providers
	);
}

function provider (route, name) {
	var provParams = {};
	provParams [params.authRoute] = route;
	provParams [params.authProvider] = name;
	return provParams;
}

module.exports = {
	rootTemplate: rootTemplate,
	about: about,
	authFail: authFail,
	login: login ()
};
