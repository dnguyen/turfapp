define([
	'namespace',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'views/messageItem',
	'text!../templates/Group.html'
], function(namespace, $, _, Backbone, Marionette, MessageItemView, GroupTemplate) {

	var GroupView = Backbone.Marionette.ItemView.extend({
		className: 'room-container',
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
			$('.message-input').val('');
		},

		addMembers: function(model) {
			//$('.members').append('<p>' + model.get('username') + '</p>');
		},

		addMessages: function(model) {
			//$('.messages').append('<p>' + model.get('username') + ':</p><p>' + model.get('message') + '</p>');
			var messageItemModel = new Backbone.Model({
				type: model.get('type'),
				username: model.get('username'),
				message: model.get('message')
			});
			var messageItemView = new MessageItemView({ model: messageItemModel });
			$('.messages').append(messageItemView.render().el);
			window.scrollTo(0, document.body.scrollHeight);
		},

		onClose: function() {
			console.group('GroupView being closed');
			console.groupEnd();
			this.controller.close();
		}

	});

	return GroupView;

});