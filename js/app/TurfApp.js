define([
	'namespace',
	'backbone',
	'marionette',
	'router',
	'jquery',
	'jquery.bootstrap',
	'controllers/main',
	'controllers/header',
	'views/loading'
], function(namespace, Backbone, Marionette, MainRouter, $, bootstrap, MainController, HeaderController, LoadingView) {

	var TurfApp = namespace.app,
		socket = namespace.socket;

	// Show loading icon
	TurfApp.vent.on('startLoadingView', function() {
		$('#content').html('');
		TurfApp.loadingView = new LoadingView();
		$('#content').append(TurfApp.loadingView.render().el);
	});

	// Remove loading icon
	TurfApp.vent.on('closeLoadingView', function() {
		TurfApp.loadingView.close();
	});

	TurfApp.vent.on('renderActionBar', function(data) {
		TurfApp.headerController.render(data);
	});

	socket.on('connect_', function(data) {
		console.log('connect_');
		alert(data);
	});

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

		TurfApp.headerController = new HeaderController();
		TurfApp.headerController.render({ title: 'Turf', page: 'groups' });

		TurfApp.Router = new MainRouter({
			controller: new MainController()
		});
	});

	return TurfApp;

});