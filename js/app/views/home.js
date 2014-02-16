define([
	'backbone',
	'marionette',
	'text!../templates/Home.html'
], function(Backbone, Marionette, HomeTemplate) {

	var HomeView = Backbone.Marionette.ItemView.extend({
		template: _.template(HomeTemplate)

	});

	return HomeView;

});