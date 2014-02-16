define([
	'namespace',
	'backbone',
	'marionette',
	'../views/login'
], function(namespace, Backbone, Marionette, LoginView) {

	var TurfApp = namespace.app;

	/*
		Controller for login and register views
	*/
	var AuthController = Marionette.Controller.extend({
		renderLoginView: function() {
			var loginView = new LoginView();
			TurfApp.content.show(loginView);
		}
	});

	return AuthController;

});