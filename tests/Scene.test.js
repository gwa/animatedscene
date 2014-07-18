define(['Gwa.Animation.Scene', 'Gwa.Animation.Animatable'], function( Scene, Animatable ) {

	describe("A scene", function() {

		it("can be constructed", function() {
			var scene = new Scene(500);
			expect(scene).toBeDefined();
		});

	});

});
