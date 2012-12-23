/*!
 * Snowball JavaScript Library v0.4
 * http://snowball.tartarus.org/
 * https://github.com/mazko/jssnowball
 *
 * Copyright Nov 25 2012, Oleg Mazko
 * http://www.opensource.org/licenses/bsd-license.html
 */

function Among(s, substring_i, result, method) {
	if ((!s && s != "") || (!substring_i && (substring_i != 0)) || !result)
		throw ("Bad Among initialisation: s:" + s + ", substring_i: "
				+ substring_i + ", result: " + result);
	this.s_size = s.length;
	this.s = (function() {
		var sLength = s.length, charArr = new Array(sLength);
		for (var i = 0; i < sLength; i++)
			charArr[i] = s.charCodeAt(i);
		return charArr;})();
	this.substring_i = substring_i;
	this.result = result;
	this.method = method;
}
