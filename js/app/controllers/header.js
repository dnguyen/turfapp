define([
	'namespace',
	'backbone',
	'marionette',
	'../views/header'
], function(namespace, Backbone, Marionette, HeaderView) {

	var TurfApp = namespace.app;

	var HeaderController = Marionette.Controller.extend({
		render: function() {
			var headerView = new HeaderView();
			TurfApp.header.show(headerView);
		}
	});

	return HeaderController;

});