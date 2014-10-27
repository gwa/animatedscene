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
			amd: {
				options: {
					vendor: [
						'bower_components/requirejs/require.js'
					],
					specs: [
						'tests/*.amd.test.js'
					],
					template: require('grunt-template-jasmine-requirejs'),
					templateOptions: {
						requireConfig: {
							baseUrl: './',
							paths: {
								'underscore'                 : 'bower_components/underscore/underscore',
								'Gwa.Event.Dispatcher'       : 'bower_components/gwa-event-dispatcher/dist/Dispatcher',
								'Gwa.Animation.AbstractData' : 'src/js/AbstractData',
								'Gwa.Animation.Timeline'     : 'src/js/Timeline',
								'Gwa.Animation.Scene'        : 'src/js/Scene'
							}
						}
					}
				}
			},
			globals: {
				src: 'src/js/*.js',
				options: {
					vendor: [
						'bower_components/gwa-event-dispatcher/dist/Dispatcher.js'
					],
					specs: [
						'tests/*.globals.test.js'
					]
				}
			}
		},

		copy: {
			main: {
				files: [
					{src:'src/js/Scene.js', dest:'dist/Scene.js'},
					{src:'src/js/AbstractData.js', dest:'dist/AbstractData.js'},
					{src:'src/js/Timeline.js', dest:'dist/Timeline.js'}
				]
			}
		},

		uglify: {
			main: {
				files: {
					'dist/Scene.min.js': ['src/js/Scene.js'],
					'dist/AbstractData.min.js': ['src/js/AbstractData.js'],
					'dist/Timeline.min.js': ['src/js/Timeline.js']
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask(
		'default',
		[
			'jscs',
			'jshint:src',
			'jasmine',
			'copy',
			'uglify'
		]
	);

};
