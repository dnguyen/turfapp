define([
	'namespace',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'socket.io',
	'validator',
	'../views/group'
], function(namespace, $, _, Backbone, Marionette, io, validator, GroupView) {

	var TurfApp = namespace.app,
		socket = namespace.socket;

	function formatMessage(message) {
		//console.log('formatting: ' + message);
		if (validator.isURL(message)) {
			//console.log('isurl');
			var fileExt = message.split('.').pop();
			if (fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'png' || fileExt === 'gif') {
				//console.log('File extension: ' + fileExt);
				return '<div class="medium-thumb"><a class="ext-url" href="' + message + '" target="_system"><img src="' + message +'"/></a></div>';
			} else {
				return '<a class="ext-url" href="' + message + '">' + message + '</a>';
			}
		} else {
			return message;
		}
	};

	var GroupController = Marionette.Controller.extend({

		initialize: function(options) {

			console.log("initialize group controller: " + options.id);
			var that = this,
				userData = JSON.parse(localStorage.getItem('userData'));

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
				_.each(data.attributes.messages, function(message) {
					var newMessageModel = new Backbone.Model({
						type: (message.user.uid === userData.uid) ? 'reply' : 'recv',
						username: message.user.username,
						message: formatMessage(message.message)
					});

					that.model.get('messages').add(newMessageModel);
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

			socket.on('new_message', function(data) {
				console.group('Recv: new_message');
				console.log(data);
				console.groupEnd();
				var newMessageModel = new Backbone.Model({
					type: (data.user.uid === userData.uid) ? 'reply' : 'recv',
					username: data.user.username,
					message: data.message
				});
				that.model.get('messages').add(newMessageModel);
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

				TurfApp.vent.trigger('renderActionBar', {
					title: group.name,
					page : 'group',
					groupid: group.id
				});

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

				TurfApp.vent.trigger('header:changeTitle', group.name);

				that.render();
			});
		},

		render: function() {
			var groupView = new GroupView({ model : this.model });
			groupView.controller = this;
			TurfApp.content.show(groupView);
		},

		onShow: function() {
		},

		onClose: function() {
			console.log('GroupController being closed');
			// Clean up socket events. removeListener doesn't seem to work..so just remove all of them.
			socket.removeAllListeners();
		},

		sendMessage: function(data) {
			console.group('sending message');
			console.log(data);
			console.groupEnd();

			socket.emit('send_message', {
				uid: JSON.parse(localStorage.getItem('userData')).uid,
				groupid: this.model.get('id'),
				message: data
			});
		}

	});

	return GroupController;

});