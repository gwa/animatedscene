/* global define */
(function( root, factory ) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else {
		// Browser globals
		root.gwa = typeof root.gwa === 'undefined' ? {} : root.gwa;
		root.gwa.EventDispatcher = factory();
	}
}(this, function() {

	return function() {

		var
		_listeners = [],
		_listenerids = [],
		_instance = {

			/**
			 * @method on
			 * @param  {String} event
			 * @param  {Function} func
			 * @param  {Object} obj
			 * @param  {Boolean} once
			 * @return {Number} listener index
			 */
			on: function( event, func, obj, once ) {
				var id;
				if (!_listeners[event]) {
					_listeners[event] = [];
					_listenerids[event] = 0;
				}
				id = ++_listenerids[event];
				_listeners[event][id] = {func: func, obj: obj, once: once};
				return id;
			},

			/**
			 * @method on
			 * @param  {String} event
			 * @param  {Function} func
			 * @param  {Object} obj
			 * @return {Number} listener index
			 */
			once: function( event, func, obj ) {
				return _instance.on(event, func, obj, true);
			},

			/**
			 * @method on
			 * @param  {String} event
			 * @param  {Function|Number} func
			 */
			off: function( event, func ) {
				var i;
				if (typeof(func) === 'number') {
					if (typeof(_listeners[event][func]) !== 'undefined') {
						delete _listeners[event][func];
						return true;
					}
					return false;
				}
				if (typeof(func) === 'undefined') {
					_listeners[event] = [];
					// do not reset ids
					return true;
				}
				for (i in _listeners[event]) {
					if (_listeners[event][i].func === func) {
						delete _listeners[event][i];
						return true;
					}
				}
				return false;
			},

			/**
			 * @method offAll
			 */
			offAll: function() {
				_listeners = {};
			},

			/**
			 * @method dispatch
			 * @param {String} event
			 * @return {Number} Number of listeners affected.
			 */
			dispatch: function( event ) {
				var args = [], i, len, l, c = 0;
				for (i = 1, len = arguments.length; i < len; i++) {
					args.push(arguments[i]);
				}
				if (_listeners[event]) {
					for (i in _listeners[event]) {
						l = _listeners[event][i];
						if (typeof(l) !== 'object') {
							continue;
						}
						if (typeof(l.func) === 'function') {
							l.func.apply(l.obj, args);
							c++;
						}
						if (l.once) {
							delete _listeners[event][i];
						}
					}
				}
				return c;
			},

			/**
			 * @method getListeners
			 * @return {Array}
			 */
			getListeners: function() {
				return _listeners;
			}

		};

		return _instance;

	};

}));
