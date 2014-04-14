window.gwa = window.gwa || {};

/**
 * @class AnimatedScene
 * @namespace  gwa
 * @constructor
 */
(function( ns, $ ) { // jshint ignore:line

	ns.AnimatedScene = function( numframes, framerate )
	{
		var
			_isrendered = false,
			_doloop     = false,
			_numloops,
			_numframes  = numframes,
			_cframe     = 0,
			_int,
			_intspeed   = Math.round(1000 / framerate),
			_objects    = [],
			_listeners  = {},

		_dispatchEvent = function( event ) {
			var args = [], i, len;
			for (i = 1, len = arguments.length; i < len; i++) {
				args.push(arguments[i]);
			}
			if (_listeners[event]) {
				for (i in _listeners[event]) {
					if (typeof(_listeners[event][i]) === 'function') {
						_listeners[event][i].apply(this, args);
					}
				}
			}
		};

		return {

			addObject: function( obj ) {
				_objects.push(obj);
			},

			render: function() {
				for (var a in _objects) {
					_objects[a].calculateFrames(_numframes);
				}
				_isrendered = true;
			},

			gotoFrame: function( frame ) {
				var a;
				frame = Math.min(_numframes, Math.max(0, frame));
				if (!_isrendered) {
					this.render();
				}
				this.stop();
				for (a in _objects) {
					_objects[a].gotoFrame(frame);
				}
				_dispatchEvent('onenterframe', frame);
			},

			play: function() {
				var func;
				if (!_isrendered) {
					this.render();
				}
				_numloops = 0;
				func = function() {
					for (var a in _objects) {
						_objects[a].gotoFrame(_cframe);
					}
					_cframe++;
					if (_cframe > _numframes) {
						if (_doloop) {
							_cframe = 0;
							_dispatchEvent('onloop', _numloops);
							_numloops++;
						} else {
							this.stop();
						}
					}
				};
				clearInterval(_int);
				_int = setInterval(
					func,
					_intspeed
				);
				_dispatchEvent('onplay');
			},

			stop: function() {
				clearInterval(_int);
				_dispatchEvent('onstop');
			},

			gotoAndPlay: function( frame ) {
				frame = Math.max(0, Math.min(frame, _numframes));
				_cframe = frame;
				this.play();
			},

			doLoop: function( bool ) {
				_doloop = bool === true ? true : false;
			},

			addEventListener: function( event, func ) {
				if (!_listeners[event]) {
					_listeners[event] = [];
				}
				_listeners[event].push(func);
			},

			removeEventListener: function( event, func ) {
				var i, len;
				for (i = 0, len = _listeners[event].length; i < len; i++) {
					if (_listeners[event][i] === func) {
						_listeners[event][i] = null;
					}
				}
			}

		};
	};

}(window.gwa, typeof(jQuery) === 'function' ? jQuery : null));
