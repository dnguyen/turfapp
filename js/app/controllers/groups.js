define([
	'namespace',
	'underscore',
	'backbone',
	'marionette',
	'../views/groups'
], function(namespace, _, Backbone, Marionette, GroupsView) {

	var TurfApp = namespace.app,
		cache = namespace.cache;

	var GroupsController = Marionette.Controller.extend({
		initialize: function() {
			console.group("Initializing new GroupsController");
			TurfApp.vent.trigger('startLoadingView');

			TurfApp.vent.on("groups:geolocationSuccess", this.successfulGeolocation, this);
			TurfApp.vent.on('groups:joinGroup', this.joinGroup, this);

			this.model = new Backbone.Model();

	        console.groupEnd();
	        this.getPosition();
		},

		render: function() {
			console.log("groupsController render");
			console.log('rendering model');
			var newGroupsView = new GroupsView({ model: this.model });
			newGroupsView.controller = this;
        	TurfApp.content.show(newGroupsView);
		},

		onClose: function() {
			console.log('Closing GroupsController');
			TurfApp.vent.off('groups:geolocationSuccess');
		},

		joinGroup: function(data) {
			navigator.geolocation.getCurrentPosition(
				function(position) {
					var authPositionReq = $.ajax({
						type: 'GET',
						url: namespace.config.server + 'api/groups/' + data.groupid + '/valid',
						data: {
							groupid: data.groupid,
							longitude: position.coords.longitude,
							latitude: position.coords.latitude
						}
					});

					$.when(authPositionReq)
					.then(function() {
						window.location = '#/group/' + data.groupid;
					})
					.fail(function() {
						window = '#/groups';
					});
				},
				function(error) {
					alert(error.message);
				},
				{
					maximumAge: 60000
				}
			);
		},

		getPosition: function() {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                	TurfApp.vent.trigger("groups:geolocationSuccess", position);
                },
                function(error) {
                    alert(error.message);
                },
                {
                	maximumAge: 60000
                	// Disable high accuracy for now, caused really long load times.
                	// will need to do more testing with different locations later.
                	//enableHighAccuracy: true
                }
            );
		},

		successfulGeolocation: function(position) {
			console.group('Successful Geolocation');
	        console.log(position);
	        console.groupEnd();
	        var that = this;
	        //alert('Lat: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude);
	        var groupsReq = $.ajax({
	            type: 'GET',
	            url: 'http://192.168.0.100:3001/api/validgroups',
	            dataType: 'JSON',
	            data: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
	            }
	        });
	        // After fetching the valid chat groups, create model to pass to view.
	        $.when(groupsReq).then(function(data) {

	        	TurfApp.vent.trigger('closeLoadingView');

	        	console.log('fetched valid groups');
	        	var groupsCollection = new Backbone.Collection();
	        	_.each(data, function(group) {
	        		groupsCollection.add(group);
	        	});
	        	that.model.set('groups', groupsCollection);
	        	that.render();
	        })
	        .fail(function(err) {
	        	console.log('failed');
	        	TurfApp.vent.trigger('closeLoadingView');
	        	//TurfApp.vent.trigger('showErrorView', { message: "We couldn't find any rooms near you. Try increasing your search radius." });
	        	var reqErrorView = require(['views/errorMessage'], function(ErrorMessageView) {
	        		var errorModel = new Backbone.Model({ message: "We couldn't find any rooms near you. Try increasing your search radius." }),
	        			newErrorMessage = new ErrorMessageView({ model: errorModel });
	        		TurfApp.content.show(newErrorMessage);
	        	});
	        });
		}
	});

	return GroupsController;

});