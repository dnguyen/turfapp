define([
	'backbone',
	'marionette',
	'text!../templates/GroupItem.html'
], function(Backbone, Marionette, GroupItemTemplate) {

	var GroupItemView = Backbone.Marionette.ItemView.extend({
		template: _.template(GroupItemTemplate),
		events: {
			'click .Join' : 'join'
		},

		join: function(e) {
			var groupId = $(e.currentTarget).attr('data-group-id');
			window.location = '#/group/' + groupId;
		}
	});

	return GroupItemView;

});