define([
	'namespace',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../templates/Group.html'
], function(namespace, $, _, Backbone, Marionette, GroupTemplate) {

	var GroupView = Backbone.Marionette.ItemView.extend({

		template: _.template(GroupTemplate),
		events: {
			'click .Send': 'sendMessage'
		},

		initialize: function() {
			this.model.get('members').on('add', this.addMembers, this);
			this.model.get('messages').on('add', this.addMessages, this);
		},

		onShow: function() {
			console.log('rendering groupView');
		},

		sendMessage: function(e) {
			var message = $('.message-input').val();
			this.model.trigger('sendMessage', message);
		},

		addMembers: function(model) {
			$('.members').append('<p>' + model.get('username') + '</p>');
		},

		addMessages: function(model) {
			$('.messages').append('<p>' + model.get('username') + ':</p><p>' + model.get('message') + '</p>');

		},

		onClose: function() {
			console.group('GroupView being closed');
			console.groupEnd();
			this.controller.close();
		}

	});

	return GroupView;

});