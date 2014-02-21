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

			// Create a click event for all external url messages to open using the phone's browser.
			// Using find() might not scale well with a lot of url messages...
			var extUrlEl = $(this.el).find('.ext-url');
			if (extUrlEl.length > 0) {
				extUrlEl.on('click', function(e) {
					e.preventDefault();
					window.open(extUrlEl.attr('href'), '_system');
				});
			}
		},

		onClose: function() {
			$('.image-message').off('click');
		}
	});

	return MessageItemView;

});