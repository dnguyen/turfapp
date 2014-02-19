define([
	'namespace',
	'backbone',
	'marionette',
	'../views/login',
	'../views/register'
], function(namespace, Backbone, Marionette, LoginView, RegisterView) {

	var TurfApp = namespace.app;

	/*
		Controller for login and register views
	*/
	var AuthController = Marionette.Controller.extend({
		renderLoginView: function() {
			var loginView = new LoginView();
			TurfApp.content.show(loginView);
		},

		renderRegisterView: function() {
			var registerView = new RegisterView();
			TurfApp.content.show(registerView);
		}
	});

	return AuthController;

});