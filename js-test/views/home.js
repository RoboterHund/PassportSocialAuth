// shared root page template
'use strict';

var A = require ('april1');
var keys = require ('./params');

var title = 'Passport Social Auth Test';

var hr = A.tag ('hr');

var homeTemplate = A.template (
		A.doctype (),
		A.html (
				A.head (
						A.title (title)
				),
				A.body (
						A.h1 (title),
						A.include (keys.content),
						hr,
						A.p ('© 2014 RoboterHund')
				)
		)
);

module.exports = homeTemplate;