describe("A Timeline", function() {

	it("can be constructed", function() {
		var data = new gwa.AnimationAbstractData(100, 100),
			timeline = new gwa.AnimationTimeline(data);
		expect(timeline).toBeDefined();
	});

});
