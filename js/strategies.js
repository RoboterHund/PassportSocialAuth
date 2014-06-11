// supported passport strategies
'use strict';

var supportedStrategies = [
	'facebook',
	'github',
	'google',
	'twitter'
];

var strategies = {};
function setMap (name) {
	strategies[name] = name;
}
supportedStrategies.forEach (setMap);

module.exports = strategies;
