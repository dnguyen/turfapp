define([
	'namespace',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'socket.io',
	'../views/group'
], function(namespace, $, _, Backbone, Marionette, io, GroupView) {

	var TurfApp = namespace.app,
		socket = namespace.socket;

	var GroupController = Marionette.Controller.extend({

		initialize: function(options) {

			console.log("initialize group controller: " + options.id);
			var that = this;

			socket.on('join_room', function(data) {
				console.group('Recv: join_room confirmation');
				console.log(data);
				console.groupEnd();
				_.each(data.attributes.members, function(user) {
					var newUserModel = new Backbone.Model({
						uid: user.uid,
						username: user.username
					});
					that.model.get('members').add(newUserModel);
				});
			});

			socket.on('user_joined_room', function(data) {
				//alert('a new user joined the room');
				console.group('Recv: user_joined_room');
				console.log(data);
				console.groupEnd();
				var newUserModel = new Backbone.Model({
					uid: data.uid,
					username: data.username
				});
				that.model.get('members').add(newUserModel);
			});

			this.model = new Backbone.Model({
				id: options.id,
				members: new Backbone.Collection(),
				messages: new Backbone.Collection()
			});
			this.model.on('sendMessage', this.sendMessage, this);

			// Request group data from server
			var groupDataReq = $.ajax({
				type: 'GET',
				url: 'http://192.168.0.100:3001/api/groups/' + this.model.get('id'),
				dataType: 'JSON'
			});
			$.when(groupDataReq).then(function(group) {
				socket.emit('join_room', {
					groupid: group.id,
					uid: JSON.parse(localStorage.getItem('userData')).uid
				});

				that.model.set({
					id: group.id,
					latitude: group.latitude,
					longitude: group.longitude,
					name: group.name,
					radius: group.radius
				});

				that.render();
			});
		},

		render: function() {
			var groupView = new GroupView({ model : this.model });
			groupView.controller = this;
			TurfApp.content.show(groupView);
		},

		onClose: function() {
			console.log('GroupController being closed');
			// Clean up socket events. removeListener doesn't seem to work..so just remove all of them.
			socket.removeAllListeners();
		},

		sendMessage: function(data) {
			console.group('sending message');
			console.log(data);
			console.log(this);
			console.groupEnd();

			this.socket.emit('chat_message', {
				id: this.model.get('id'),
				message: data
			});
		}

	});

	return GroupController;

});