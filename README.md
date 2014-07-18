Animated Scene
==============

Abstract timeline and keyframe-based animation.

## Timeline

An Timeline instance accepts a single Object that is to be animated.

Different properties of the object can be animated on the timeline.

~~~~~~~~.js
// obj has a set function that accepts a single value
var obj = {
	myval: null,
	set: function( val ) {
		this.myval = val;
	}
};

var tl = new Timeline(obj, 'set', 0, 0);

// it can have key frames
// - at frame 0 `prop` should be `100`
tl.addKeyFrame('prop', 0, 100);

// - at frame 50 `prop` should be `50`
tl.addKeyFrame('prop', 50, 50);

// frames values must be pre-calculated
// frames 1 to 50 will be calculates
tl.calculateFrames(50);

// use `gotoFrame` to move to a specific frame
tl.gotoFrame(25);

console.log(obj.myval); // 25
~~~~~~~~

## Scene

An scene contains one or more timelines.

~~~~~~~~.js
// obj has a set function that accepts a single value
var obj = {
	myval: null,
	set: function( val ) {
		this.myval = val;
	}
};
var tl = new Timeline(obj, 'set');
tl.addKeyFrame('prop', 0, 100);
tl.addKeyFrame('prop', 50, 50);

var scene = new Scene(100);
scene.addTimeline(tl);
scene.render(); // optional
scene.gotoFrame(25);

console.log(obj.myval); // 25
~~~~~~~~
