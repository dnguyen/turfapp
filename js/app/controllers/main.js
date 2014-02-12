define([
	'namespace',
	'backbone',
	'marionette'
], function(namespace, Backbone, Marionette) {
	var TurfApp = namespace.app;

	var MainController = Marionette.Controller.extend({
		homePage: function() {
			console.log('homePage route controller');
			var groupsControllerRoute = require(['controllers/groups'], function(GroupsController) {
				var groupsController = new GroupsController();
				//groupsController.render();
			});
		},

		groupPage: function(id) {
			console.log('groupPage route');
			var groupControllerRoute = require(['controllers/group'], function(GroupController) {
				var groupController = new GroupController({
					id: id
				});

			});
		}
	});

	return MainController;

});