define(['Gwa.Animation.Scene', 'Gwa.Animation.AbstractData', 'Gwa.Animation.Timeline'], function( Scene, AbstractData, Timeline ) {

	var _data, _timeline;

	describe("An Timeline", function() {

		it("can be constructed", function() {
			_data = new AbstractData(100, 100);
			_timeline = new Timeline(_data);
			expect(_timeline).toBeDefined();
		});

		it("can have keyframes added", function() {
			_timeline.addKeyFrame('x', 0, 0);
			_timeline.addKeyFrame('x', 100, 100);
		});

		it("can calculate frames", function() {
			_timeline.calculateFrames(100);
			var a = _timeline.getAnimatedProperties();
			expect(a[0]).toEqual('x');

			_timeline.gotoFrame(50);
			expect(_data.get('x')).toEqual(50);
		});

		it("can 'scale'", function() {
			_timeline.clear();

			_timeline.setBaseDimensions(100, 100);

			_timeline.addKeyFrame('scale', 0, 1);
			_timeline.addKeyFrame('scale', 100, 0.5);
			_timeline.calculateFrames(100);
			_timeline.gotoFrame(100);

			expect(_data.width()).toEqual(50);
			expect(_data.height()).toEqual(50);
		});

	});

});
