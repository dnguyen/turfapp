define([
	'backbone',
	'marionette'
], function(Backbone, Marionette) {
	var MainRouter = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			'' : 'homePage',
			'group/*id' : 'groupPage'
		}
	});
	return MainRouter;
});