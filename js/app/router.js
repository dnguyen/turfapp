define([
	'backbone',
	'marionette'
], function(Backbone, Marionette) {
	var MainRouter = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			'' : 'homePage',
			'login' : 'loginPage',
			'register' : 'registerPage',
			'logout' : 'logout',
			'groups' : 'groupsPage',
			'group/*id/info' : 'groupInfoPage',
			'group/*id' : 'groupPage',
			'newgroup' : 'newGroupPage'
		}
	});
	return MainRouter;
});