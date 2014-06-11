// user logged in template
'use strict';

var A = require ('april1');
var keys = require ('./params');

var userTemplate = A.template (
		A.p (
				'Login with:'
		),
		A.ul (
				A.list (
						keys.authProviders,
						A.template (
								A.li (
										A.a (
												A.href (A.include (keys.authRoute)),
												A.include (keys.authProvider)
										)
								)
						)
				)
		)
);

module.exports = userTemplate;
