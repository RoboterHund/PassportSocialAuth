// user logged in template
'use strict';

var A = require ('april1');
var keys = require ('./params');

var routesMap = require ('../routes/map');

var userStyle =
		'.user {'
		+ ' padding: 0 4dp;'
		+ ' background-color: rgba (255, 255, 0, 0.25);'
		+ ' }';

var userTemplate = A.template (
		A.style (
				userStyle
		),
		A.p (
				'Hello, ',
				A.span (
						A.class_attr ('user'),
						A.include (keys.username)
				),
				'. Behold this exclusive, secluded area.'
		),
		A.p (
				A.a (
						A.href (routesMap.logout),
						'Logout')
		)
);

module.exports = userTemplate;
