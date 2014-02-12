define([
	'namespace',
	'underscore',
	'backbone',
	'marionette',
	'../views/groups'
], function(namespace, _, Backbone, Marionette, GroupsView) {

	var TurfApp = namespace.app;

	var GroupsController = Marionette.Controller.extend({
		initialize: function() {

			TurfApp.vent.on("groups:geolocationSuccess", this.successfulGeolocation, this);
			this.model = new Backbone.Model();

            navigator.geolocation.getCurrentPosition(
                function(position) {
                	TurfApp.vent.trigger("groups:geolocationSuccess", position);
                },
                function(error) {
                    alert(error.message);
                },
                {enableHighAccuracy: true}
            );
		},

		render: function() {
			console.log("groupsController render");
			console.log('rendering model');
        	TurfApp.content.show(new GroupsView({ model: this.model }));
		},

		successfulGeolocation: function(position) {
	        console.log(position);
	        var that = this;
	        //alert('Lat: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude);
	        var groupsReq = $.ajax({
	            type: 'GET',
	            url: 'http://192.168.0.100:3001/api/validgroups',
	            dataType: 'JSON',
	            data: {
	                position: {
	                    latitude: position.coords.latitude,
	                    longitude: position.coords.longitude
	                }
	            }
	        });
	        // After fetching the valid chat groups, create model to pass to view.
	        $.when(groupsReq).then(function(data) {
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