define(['Gwa.Animation.Scene', 'Gwa.Animation.AbstractData', 'Gwa.Animation.Animatable'], function( Scene, AbstractData, Animatable ) {

	var _data, _ani;

	describe("An Animatable", function() {

		it("can be constructed", function() {
			_data = new AbstractData(100, 100);
			_ani = new Animatable(_data);
			expect(_ani).toBeDefined();
		});

		it("can have keyframes added", function() {
			_ani.addKeyFrame('x', 0, 0);
			_ani.addKeyFrame('x', 100, 100);
		});

		it("can calculate frames", function() {
			_ani.calculateFrames(100);
			var a = _ani.getAnimatedProperties();
			expect(a[0]).toEqual('x');

			_ani.gotoFrame(50);
			expect(_data.get('x')).toEqual(50);
		});

		it("can be scaled", function() {
			_ani.clear();

			_ani.addKeyFrame('scale', 0, 1);
			_ani.addKeyFrame('scale', 100, 0.5);
			_ani.calculateFrames(100);
			_ani.gotoFrame(100);

			expect(_data.width()).toEqual(50);
			expect(_data.height()).toEqual(50);
		});

	});

});
