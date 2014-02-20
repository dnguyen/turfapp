define([
	'backbone',
	'marionette',
	'text!../templates/ErrorMessage.html'
], function(Backbone, Marionette, ErrorTemplate) {

	var ErrorView = Backbone.Marionette.ItemView.extend({
		className: 'container--centered',
		template: _.template(ErrorTemplate)

	});

	return ErrorView;

});