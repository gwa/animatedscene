window.gwa = window.gwa || {};

/**
 * @class AnimatedObject
 * @namespace  gwa
 * @constructor
 */
(function( ns, $ ) { // jshint ignore:line

	ns.AnimatedObject = function( jq )
	{
		var
			_keyframes = [],
			_calculated,
			_numframes,
			_width     = jq.width(),
			_height    = jq.height();

		/* jshint ignore:start */
		// EASING FUNCTIONS
		// t: current time, b: begInnIng value, c: change In value, d: duration
		function _easeInOutCubic( t, b, c, d ) {
			if ((t /= d / 2) < 1) {
				return c / 2 * t * t * t + b;
			}
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		}

		function _easeInCubic( t, b, c, d ) {
			return c * (t /= d) * t * t + b;
		}

		function _easeOutCubic( t, b, c, d ) {
			return c * ((t = t / d - 1) * t * t + 1) + b;
		}

		function _easeLinear( t, b, c, d ) {
			return c * t / d + b;
		}
		/* jshint ignore:end */

		function _addKeyFrame( property, frame, value, easing ) {
			var easein = false, easeout = false;
			if (typeof(_keyframes[property]) === 'undefined') {
				_keyframes[property] = [];
			}
			if (easing === 'in') {
				easein = true;
				easeout = false;
			} else if (easing === 'out') {
				easein = false;
				easeout = true;
			} else if (easing === 'inout') {
				easein = true;
				easeout = true;
			}
			_keyframes[property].push(
				{
					frame: frame,
					value: value,
					easein: easein,
					easeout: easeout
				}
			);
		}

		function _calculateFrames( numframes ) {
			var i;
			_sortAllFrames();
			_calculated = [];
			for (var prop in _keyframes) {
				_calculated[prop] = [];
				var pkf = _getPreviousKeyFrame(prop, 0),
				nkf = _getNextKeyFrame(prop, 0);
				if (!pkf && !nkf) {
					continue;
				}
				if (!nkf) {
					for (i = 0; i <= numframes; i++) {
						_calculated[prop][i] = pkf.value;
					}
					continue;
				}
				for (i = 0; i <= numframes; i++) {
					if (!pkf) {
						_calculated[prop][i] = nkf.value;
					} else if (!nkf) {
						_calculated[prop][i] = pkf.value;
					} else {
						_calculated[prop][i] = _calculateFrameValue(i, pkf, nkf);
					}
					if (nkf && i === nkf.frame) {
						pkf = nkf;
						nkf = _getNextKeyFrame(prop, i);
					}
				}
			}
			_numframes = numframes;
		}

		function _getPreviousKeyFrame( property, frame ) {
			var kf, pkf;
			for (kf in _keyframes[property]) {
				if (_keyframes[property][kf].frame <= frame) {
					pkf = _keyframes[property][kf];
				} else {
					return pkf;
				}
			}
			return pkf;
		}

		function _getNextKeyFrame( property, frame ) {
			for (var kf in _keyframes[property]) {
				if (_keyframes[property][kf].frame > frame) {
					return _keyframes[property][kf];
				}
			}
			return null;
		}

		function _calculateFrameValue( frame, pkf, nkf ) {
			var easefunc;
			if (pkf.easeout && nkf.easein) {
				easefunc = _easeInOutCubic; /* jshint ignore:line */
			} else if (pkf.easeout) {
				easefunc = _easeInCubic; /* jshint ignore:line */
			} else if (nkf.easein) {
				easefunc = _easeOutCubic; /* jshint ignore:line */
			} else {
				easefunc = _easeLinear; /* jshint ignore:line */
			}
			if (typeof(pkf.value) === 'object') {
				var arr = [];
				for (var a in pkf.value) {
					arr[a] = easefunc(
						frame - pkf.frame, // current frame
						pkf.value[a], // initial value
						nkf.value[a] - pkf.value[a], // change in value
						nkf.frame - pkf.frame // duration in frames
					);
				}
				return arr;
			}
			return easefunc(
				frame - pkf.frame, // current frame
				pkf.value, // initial value
				nkf.value - pkf.value, // change in value
				nkf.frame - pkf.frame // duration in frames
			);
		}

		function _sortAllFrames() {
			for (var prop in _keyframes) {
				_sortByFrame(_keyframes[prop]);
			}
		}

		function _sortByFrame( arr ) {
			var f = function(a, b) {
				if (a.frame < b.frame) {
					return -1;
				}
				if (a.frame > b.frame) {
					return 1;
				}
				return 0;
			};
			arr.sort(f);
		}

		function _gotoFrame( frame ) {
			if (frame > _numframes) {
				frame = _numframes;
			}
			var v;
			for (var prop in _calculated) {
				v = _calculated[prop][frame];
				switch (prop) {
					case 'scale' :
						jq.width(_width * v).height(_height * v);
						break;
					default :
						jq.css(prop, v);
				}
			}
		}

		function _getJq() {
			return jq;
		}

		function _getProperties() {
			var a, arr = [];
			for (a in _calculated) {
				arr.push(a);
			}
			return arr;
		}

		function _getFrameDataForProperty( prop, frame ) {
			return _calculated[prop][frame];
		}

		return {
			addKeyFrame: _addKeyFrame,
			calculateFrames: _calculateFrames,
			gotoFrame: _gotoFrame,
			getAnimatedProperties: _getProperties,
			getFrameDataForProperty: _getFrameDataForProperty,
			jq: _getJq
		};
	};

}(window.gwa, typeof(jQuery) === 'function' ? jQuery : null));
