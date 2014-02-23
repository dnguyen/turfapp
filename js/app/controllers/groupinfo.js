define([
	'namespace',
	'backbone',
	'marionette',
	'../views/groupinfo'
], function(namespace, Backbone, Marionette, GroupInfoView) {

	var TurfApp = namespace.app,
		config = namespace.config;

	var GroupInfoController = Marionette.Controller.extend({

		initialize: function(options) {
			var that = this;

			this.model = new Backbone.Model({
				id: options.id
			});

			TurfApp.vent.trigger('renderActionBar', {
				title: 'Group Info',
				page : 'groupinfo',
				groupid: options.id
			});

			var groupDataReq = $.ajax({
				type: 'GET',
				url: config.server + 'api/groups/' + this.model.get('id')
			});

			$.when(groupDataReq).then(function(data) {
				console.log('got group data');
				console.log(data);
				that.model.set({
					name: data.name,
					latitude: data.latitude,
					longitude: data.longitude,
					radius: data.radius,
					members: data.members
				});
				that.render();
			});
		},

		render: function() {
			var newGroupInfoView = new GroupInfoView({ model : this.model });
			TurfApp.content.show(newGroupInfoView);
		}

	});

	return GroupInfoController;

});