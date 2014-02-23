define([
	'namespace',
	'backbone',
	'marionette',
	'../models/header',
	'../views/header'
], function(namespace, Backbone, Marionette, HeaderModel, HeaderView) {

	var TurfApp = namespace.app;

	var HeaderController = Marionette.Controller.extend({
		render: function(data) {
			this.model = new HeaderModel({
				title: data.title,
				page: data.page
			});

			var headerView = new HeaderView({ model: this.model });
			TurfApp.header.show(headerView);
		}
	});

	return HeaderController;

});