define([
	'namespace',
	'jquery',
	'backbone',
	'marionette',
	'socket.io'
], function(namespace, $, Backbone, Marionette, io) {

	var GroupController = Marionette.Controller.extend({

		initialize: function(options) {
			console.log("initialize group controller: " + options.id);
			this.model = new Backbone.Model({
				id: options.id
			});

			// Request group data from server, if successful try to create a socket to server.
			var groupDataReq = $.ajax({
				type: 'GET',
				url: 'http://192.168.0.100:3001/api/groups/' + this.model.get('id'),
				dataType: 'JSON'
			});
			$.when(groupDataReq).then(function(data) {
				console.log(data);
				var groupId = data[0].id;
				var socket = io.connect('http://192.168.0.100:3001');
				socket.emit('join_group', {
					id: groupId,
					username: 'Lithica'
				});
			});
		},

		render: function() {

		}

	});

	return GroupController;

});