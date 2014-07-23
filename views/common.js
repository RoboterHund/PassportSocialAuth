//
'use strict';

var A = require ('april1-html');

var map = require ('../routes/map');

var AX = require ('./april1.extend');
var params = require ('./params');

/**
 * @var {TemplateHead}
 */
var template =
	A.template (
		A.DOCTYPE,
		A.html (
			A.lang ('en'),
			A.head (
				A.title (
					A.insert (params.pageTitle)
				)
			),
			A.body (
				A.h1 ('PassportSocialAuth test server'),
				A.insert (params.content),
				navigation (),
				A.hr (),
				A.p ('© 2014 RoboterHund')
			)
		)
	);

/**
 *
 * @returns {Array}
 */
function navigation () {
	return A.div (
		A.id ('nav'),
		A.ul (
			navigationItem (
				map.root.ROUTE,
				'root',
				'Home'
			),
			A.insert (params.navLogin),
			navigationItem (
				map.root.exclusive.ROUTE,
				'exclusive content',
				'Juice ☺!'
			),
			navigationItem (
				map.root.public.ROUTE,
				'public content',
				'About'
			),
			A.insert (params.navLogout)
		)
	);
}

/**
 *
 * @param href
 * @param title
 * @param text
 * @returns {Array}
 */
function navigationItem (href, title, text) {
	return A.li (
		A.a (
			A.href (href),
			AX.inTitle (title),
			text
		)
	);
}

/**
 *
 */
var navigationLogin =
	A.string (
		A.template (
			navigationItem (
				map.root.login.ROUTE,
				'login with provider',
				'Login'
			)
		)
	);

/**
 *
 */
var navigationLogout =
	A.string (
		A.template (
			navigationItem (
				map.root.logout.ROUTE,
				'logout',
				'Logout'
			)
		)
	);

module.exports = {
	template: template,
	navigationLogin: navigationLogin,
	navigationLogout: navigationLogout
};
