define([
	'namespace',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../templates/Login.html'
], function(namespace, $, _, Backbone, Marionette, LoginTemplate) {

	var LoginView = Backbone.Marionette.ItemView.extend({

		template: _.template(LoginTemplate),
		events: {
			'touchstart .LogIn' : 'login'
		},

		login: function(e) {
			console.log('login click');
			var loginReq = $.ajax({
				type: 'GET',
				url: 'http://192.168.0.100:3001/login',
				data: {
					username: $('#username').val(),
					password: $('#password').val()
				}
			});

			// Store user data from server in localStorage for future use.
			// Redirect to groups view on successful login.
			$.when(loginReq).then(function(data) {
				console.log(data);
				localStorage.setItem('userData', JSON.stringify(data));
				namespace.socket.emit('connect_', {
					uid: data.uid,
					token: data.token
				});
				window.location = "#/groups";
			}).fail(function(err, status, data) {
				console.error('failed login');
			});
		}
	});

	return LoginView;

});