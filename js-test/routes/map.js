// site routes map
'use strict';

var map = {
	root: '/',

	// public

	public_1: '/outside',
	public_2: '/border',

	// login

	login: '/login',
	auth: {
		facebook: {
			login: '/login/facebook',
			back: '/login/facebook/back'
		},
		github: {
			login: '/login/github',
			back: '/login/github/back'
		},
		google: {
			login: '/login/google',
			back: '/login/google/back'
		},
		twitter: {
			login: '/login/twitter',
			back: '/login/twitter/back'
		}
	},
	logout: '/logout',

	// authentication required

	exclusive_1: '/border/beyond/1',
	exclusive_2: '/border/beyond/2'
};

module.exports = map;
