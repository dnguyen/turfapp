define([
	'namespace',
	'backbone',
	'marionette',
	'../views/newGroup'
], function(namespace, Backbone, Marionette, NewGroupView) {

	var TurfApp = namespace.app;

	var NewGroupController = Marionette.Controller.extend({

		initialize: function() {
			var that = this;
			this.model = new Backbone.Model();

			navigator.geolocation.getCurrentPosition(
				function(position) {
					that.model.set('latitude', position.coords.latitude);
					that.model.set('longitude', position.coords.longitude);
					that.render();
				},
				function(error) {
					alert(error.message);
				},
				{
					maximumAge: 60000
				}
			);
		},

		render: function() {
			var newGroupView = new NewGroupView( { model : this.model });
			TurfApp.content.show(newGroupView);
		}
	});

	return NewGroupController;

});