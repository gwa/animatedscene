define(['Gwa.Animation.Scene', 'Gwa.Animation.Timeline', 'Gwa.Animation.AbstractData'], function( Scene, Timeline, AbstractData ) {

	describe("A scene", function() {

		it("can be constructed", function() {
			var scene = new Scene(500);
			expect(scene).toBeDefined();
		});

		it("can have a timeline and go to a frame", function() {
			var scene = new Scene(500);
			var data = new AbstractData(100, 100);
			var timeline = new Timeline(data);
			timeline.addKeyFrame('foo', 0, 0);
			timeline.addKeyFrame('foo', 500, 100);
			scene.addTimeline(timeline);
			var myvar;
			scene.on('ENTER_FRAME', function() {
				myvar = data.get('foo');
			});
			scene.gotoFrame(250);
			expect(data.get('foo')).toEqual(50);
			expect(myvar).toEqual(50);
		});

	});

});
