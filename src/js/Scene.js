/* global define */
define(['Gwa.Event.Dispatcher'], function( Dispatcher ) {

	return function( numframes, framerate ) {
		var _isrendered = false,
			_doloop     = false,
			_numloops,
			_numframes  = numframes,
			_cframe     = 0,
			_int,
			_intspeed   = Math.round(1000 / framerate),
			_objects    = [],
			_instance   = {},
			_dispatcher = new Dispatcher();

		_instance.on = function( ev, func, obj, once ) {
			return _dispatcher.on(ev, func, obj, once);
		};

		_instance.off = function( ev, func ) {
			_dispatcher.off(ev, func);
		};

		_instance.addObject = function( obj ) {
			_objects.push(obj);
		};

		_instance.render = function() {
			for (var a in _objects) {
				_objects[a].calculateFrames(_numframes);
			}
			_isrendered = true;
		};

		_instance.gotoFrame = function( frame ) {
			var a;
			frame = Math.min(_numframes, Math.max(0, frame));
			if (!_isrendered) {
				this.render();
			}
			this.stop();
			for (a in _objects) {
				_objects[a].gotoFrame(frame);
			}
			this.dispatch('ENTER_FRAME', frame);
		};

		_instance.play = function() {
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
						this.dispatch('LOOP', _numloops);
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
			this.dispatch('PLAY');
		};

		_instance.stop = function() {
			clearInterval(_int);
			this.dispatch('STOP');
		};

		_instance.gotoAndPlay = function( frame ) {
			frame = Math.max(0, Math.min(frame, _numframes));
			_cframe = frame;
			this.play();
		};

		_instance.doLoop = function( bool ) {
			_doloop = bool === true ? true : false;
		};

		return _instance;
	};

});
