// site routes map
'use strict';

var root = {
	ROUTE: '/',

	public: {
		ROUTE: '/public'
	},

	authFail: {
		ROUTE: '/auth-fail'
	},

	login: {
		ROUTE: '/login',
		facebook: {
			ROUTE: '/login/facebook',
			back: {
				ROUTE: '/login/facebook/back'
			}
		},
		github: {
			ROUTE: '/login/github',
			back: {
				ROUTE: '/login/github/back'
			}
		},
		google: {
			ROUTE: '/login/google',
			back: {
				ROUTE: '/login/google/back'
			}
		},
		twitter: {
			ROUTE: '/login/twitter',
			back: {
				ROUTE: '/login/twitter/back'
			}
		}
	},

	logout: {
		ROUTE: '/logout'
	},

	exclusive: {
		ROUTE: '/exclusive'
	}
};

module.exports = {
	root: root
};
