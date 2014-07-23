//
'use strict';

var url = 'mongodb://localhost:THE_PORT/';
var dbName = 'THE_DB_NAME';

module.exports = {
	url: url,
	name: dbName,
	connection: url + dbName,
	collections: {
		auth: 'THE_USERS_COLLECTION',
		session: 'THE_SESSIONS_COLLECTION'
	}
};
