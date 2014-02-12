/*
	Use namesepace to give controllers, views, etc access to the TurfApp object.
*/
define([
	'marionette'
], function(Marionette) {
	return {
		app: new Marionette.Application()
	}
});