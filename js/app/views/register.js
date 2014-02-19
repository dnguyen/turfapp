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
			password.length < 5 || username.length < 3) {
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


		}
	});

	return RegisterView;

});