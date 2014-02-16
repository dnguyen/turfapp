define([
	'backbone',
	'marionette'
], function(Backbone, Marionette) {
	var MainRouter = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			'' : 'homePage',
			'login' : 'loginPage',
			'logout' : 'logout',
			'groups' : 'groupsPage',
			'group/*id' : 'groupPage'
		}
	});
	return MainRouter;
});