define([
	'namespace',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'views/groupItem',
	'text!../templates/Groups.html'
], function(namespace, $, _, Backbone, Marionette, GroupItemView, GroupsTemplate) {

	var TurfApp = namespace.app;

	var GroupsView = Backbone.Marionette.ItemView.extend({
		tagName: 'div',
		className: 'groups',
		template: _.template(GroupsTemplate),

		onShow: function() {
			var groupsFragment = document.createDocumentFragment();
			//console.log(this.model.get('groups'));
			for (var i = 0; i < 30; i++) {
			this.model.get('groups').forEach(function(group) {
				var groupItemView = new GroupItemView({ model : group });
				groupsFragment.appendChild(groupItemView.render().el);
			});
		}

			$(this.el).append(groupsFragment);
		}
	});

	return GroupsView;

});