/*
	Use namesepace to give controllers, views, etc access to the TurfApp object.
*/
define([
	'marionette',
	'socket.io'
], function(Marionette, io) {
	return {
		app: new Marionette.Application(),
		// Create a socket to the server as soon as we launch.
		socket: io.connect('http://192.168.0.100:3001'),

		config : {
			server: 'http://192.168.0.100:3001/'
		},

		cache: {
			storage : { },

			store: function(key, data) {
				this.storage[key] = {
					time: Date.now(),
					data: data
				}
			},

			get: function(key) {
				return this.storage[key];
			}
		}
	}
});