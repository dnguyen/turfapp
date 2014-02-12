define([
	'namespace',
	'backbone',
	'marionette',
	'router',
	'jquery',
	'jquery.bootstrap',
	'controllers/main',
	'controllers/header'
], function(namespace, Backbone, Marionette, MainRouter, $, bootstrap, MainController, HeaderController) {

	var TurfApp = namespace.app;

	TurfApp.addRegions({
		header: '#header',
		content: '#content'
	});

	TurfApp.on("initialize:after", function() {
		console.log("after initialize");
        if (Backbone.history) {
            Backbone.history.start();
        }
	});

	TurfApp.addInitializer(function() {
		console.log("Initializer");

		var headerController = new HeaderController();
		headerController.render();

		TurfApp.Router = new MainRouter({
			controller: new MainController()
		});
	});

	return TurfApp;

});