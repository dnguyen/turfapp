define([
	'backbone',
	'marionette',
	'text!../templates/MessageItem.html',
], function(Backbone, Marionette, MessageItem) {

	var MessageItemView = Backbone.Marionette.ItemView.extend({
		className: 'message',
		template: _.template(MessageItem),
		events: {
		},

		initialize: function() {
		},

		onRender: function() {
			$(this.el).addClass(this.model.get('type'));
		}
	});

	return MessageItemView;

});