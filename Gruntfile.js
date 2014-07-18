module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// tasks
		jscs: {
			"options": {
				"config": "bower_components/gwa-codestyle/rc/.jscsrc"
			},
			"src": "src/js/*.js"
		},

		jshint: {
			"options": {
				"jshintrc": "bower_components/gwa-codestyle/rc/.jshintrc"
			},
			"src": [
				"src/js/*.js"
			]
		},

		jasmine: {
			mytask: {
				options: {
					vendor: [
						'bower_components/requirejs/require.js'
					],
					specs: [
						'tests/Animatable.test.js'
					],
					template: require('grunt-template-jasmine-requirejs'),
					templateOptions: {
						requireConfig: {
							baseUrl: './',
							paths: {
								'underscore'                 : 'bower_components/underscore/underscore',
								'Gwa.Event.Dispatcher'       : 'bower_components/gwa-event-dispatcher/dist/Dispatcher',
								'Gwa.Animation.AbstractData' : 'src/js/AbstractData',
								'Gwa.Animation.Animatable'   : 'src/js/Animatable',
								'Gwa.Animation.Scene'        : 'src/js/Scene'
							}
						}
					}
				}
			}
		},

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs-checker');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask(
		'default',
		[
			'jscs',
			'jshint:src',
			'jasmine'
		]
	);

};
