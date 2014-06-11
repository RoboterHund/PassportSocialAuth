// lines-to-file writer
'use strict';

/**
 * @callback LineWriter
 * @param {string} text
 */

/**
 * @callback LinesGenerator
 * @param {LineWriter} line
 */

/**
 * write lines to file
 * @param {LinesGenerator} linesGenerator
 */
function write (linesGenerator) {
	var fs = require ('fs');
	var stream = fs.createWriteStream ('../js-test/views/params.js');

	var lineWriter = function writeLine (text) {
		stream.write (text || '');
		stream.write ('\n');
	};

	linesGenerator (lineWriter);

	stream.end ();
}

module.exports = write;