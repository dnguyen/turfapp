define([
	'namespace',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../templates/Register.html'
], function(namespace, $, _, Backbone, Marionette, RegisterTemplate) {

	function validate() {
		var	username = $('#username').val(),
			password = $('#password').val();

		if (typeof username === 'undefined' || username === '' ||
			typeof password === 'undefined' || password === '' ||
			password.length < 4 || username.length < 3) {
			$('.Register').attr('disabled', 'disabled');
		} else {
			$('.Register').removeAttr('disabled');
		}
	};

	var RegisterView = Backbone.Marionette.ItemView.extend({
		template: _.template(RegisterTemplate),
		events: {
			'touchstart .Register' : 'register',
			'blur #username' : 'blurUsername',
			'keypress #password' : 'validatePassword'
		},

		blurUsername: function(e) {
			validate();
		},

		validatePassword: function(e) {
			validate();
		},

		register: function(e) {
			var username = $('#username').val(),
				password = $('#password').val();

			var registerReq = $.ajax({
				type: 'POST',
				url: namespace.config.server + 'api/users',
				data: {
					username : username,
					password: password
				}
			});

			// When register is finished, move to groups page. (Server should have automatically logged them in)
			$.when(registerReq).done(function(data) {
				console.log(data);
				localStorage.setItem('userData', JSON.stringify(data));
				namespace.socket.emit('connect_', {
					uid: data.uid,
					token: data.token
				});
				window.location = "#/groups";
			});
		}
	});

	return RegisterView;

});