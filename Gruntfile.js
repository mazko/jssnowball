// Travis CI task.

module.exports = function(grunt) {
	grunt.initConfig({
	    qunit: {
	        files: [
	        "js_snowball/tests/armenianTests.html"
,
			"js_snowball/tests/basqueTests.html"
,
			"js_snowball/tests/catalanTests.html"
,
			"js_snowball/tests/czechTests.html"
,
			"js_snowball/tests/danishTests.html"
,
			"js_snowball/tests/dutchTests.html"
,
			"js_snowball/tests/englishTests.html"
,
			"js_snowball/tests/finnishTests.html"
,
			"js_snowball/tests/frenchTests.html"
,
			"js_snowball/tests/germanTests.html"
,
			"js_snowball/tests/hungarianTests.html"
,
			"js_snowball/tests/italianTests.html"
,
			"js_snowball/tests/irishTests.html"
,
			"js_snowball/tests/norwegianTests.html"
,
			"js_snowball/tests/porterTests.html"
,
			"js_snowball/tests/portugueseTests.html"
,
			"js_snowball/tests/romanianTests.html"
,
			"js_snowball/tests/russianTests.html"
,
			"js_snowball/tests/spanishTests.html"
,
			"js_snowball/tests/sloveneTests.html"
,
			"js_snowball/tests/swedishTests.html"
,
			"js_snowball/tests/turkishTests.html"
	        ]
	    }
	});

    // Load plugin
    grunt.loadNpmTasks('grunt-contrib-qunit');

	// Task to run tests
	grunt.registerTask('travis', ['qunit']);
}