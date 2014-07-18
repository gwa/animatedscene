/* global define */
define([], function() {

	return function( w, h ) {
		var _w = w,
			_h = h,
			_settings = [],
			_instance = {};

		_instance.width = function( w ) {
			if (typeof w === 'undefined') {
				return _w;
			}
			_w = w;
			return this;
		};

		_instance.height = function( h ) {
			if (typeof h === 'undefined') {
				return _h;
			}
			_h = h;
			return this;
		};

		_instance.css = function( prop, val ) {
			_settings[prop] = val;
		};

		_instance.get = function( prop ) {
			return _settings[prop];
		};

		return _instance;
	};

});
