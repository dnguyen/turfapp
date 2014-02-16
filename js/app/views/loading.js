define([
	'underscore',
	'backbone',
	'marionette',
	'text!../templates/Loading.html'
], function(_, Backbone, Marionette, LoadingTemplate) {

	var LoadingView = Backbone.Marionette.ItemView.extend({
		className: 'spinner-container',
		template: _.template(LoadingTemplate)
	});

	return LoadingView;

});