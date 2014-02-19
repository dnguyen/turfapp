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
			TurfApp.vent.off('groups:geolocationSuccess')
		},

		getPosition: function() {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                	cache.store('geolocation', position);
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
	        });
		}
	});

	return GroupsController;

});