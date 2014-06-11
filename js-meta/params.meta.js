// template field key set
'use strict';

function generateKeysCode (line) {

	var keys = [
		'content',
		'authProviders',
		'authProvider',
		'authRoute',
		'username'
	];

	//  *   *   *   *

	line ('// template field key set');
	line ("'use strict';");
	line ();
	line ('var keys = {};');
	line ();

	var iKey, nKeys = keys.length;
	var key;
	for (iKey = 0; iKey < nKeys; iKey++) {
		key = keys [iKey];
		line ('keys.' + key + " = '" + key + "';");
	}

	line ();
	line ('module.exports = keys;');

	//  *   *   *   *

}

require ('./generate') (generateKeysCode);
