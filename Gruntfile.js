// Travis CI task.

module.exports = function(grunt) {
	grunt.initConfig({
	    qunit: {
	    	options: { timeout: 50000},
	        files: ["js_snowball/tests/composite.html"]
	    }
	});

    // Load plugin
    grunt.loadNpmTasks('grunt-contrib-qunit');

	// Task to run tests
	grunt.registerTask('travis', ['qunit']);
}