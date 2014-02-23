define([
	'backbone'
], function(Backbone) {

	var HeaderModel = Backbone.Model.extend({
		defaults: {
			title: 'Turf'
		}
	});

	return HeaderModel;
});