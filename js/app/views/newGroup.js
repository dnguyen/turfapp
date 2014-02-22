define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'async!http://maps.google.com/maps/api/js?sensor=true',
	'text!../templates/NewGroup.html'
], function($, _, Backbone, Marionette, googleapi, NewGroupTemplate) {

	var NewGroupView = Backbone.Marionette.ItemView.extend({
		template: _.template(NewGroupTemplate),
		events: {
			'click .create' : 'createGroup',
			'keyup #radius' : 'changedRadius'
		},

		initialize: function() {
		},

		onShow: function() {
			var position = new google.maps.LatLng(this.model.get('latitude'), this.model.get('longitude')),
				mapOptions = {
					center: position,
					zoom: 15,
					disableDefaultUI: true,
					draggable: false
				};
			console.log(document.getElementById('map'));
			var map = new google.maps.Map(document.getElementById('map'), mapOptions);
			/*var marker = new google.maps.Marker({
				position: position,
				map: map,
				title: 'Your position'
			});*/

			// note: maps api uses meters for api.
			var circle = new google.maps.Circle({
				strokeColor: '#428bca',
				strokeOpacity: 0.8,
				strokeWeight: 1,
				fillColor: '#AEDDF5',
				map: map,
				center: position,
				radius: 0
			});

			// Store the map objects so we can change the circle later.
			this.mapObj = {
				map: map,
				//marker: marker,
				circle: circle
			};
		},

		changedRadius: function(e) {
			var radiusInput =  $('#radius').val(),
				unitsInput = $('#units').val();

			// do unit conversion to meters
			switch (unitsInput) {
				case 'ft':
					radiusInput /= 3.28084;
					break;
				case 'mi':
					radiusInput *= 1609.34;
					break;
				case 'km':
					radiusInput *= 1000;
			}

			// Redraw the radiuds circle on the map
			console.log(radiusInput + ' in ' + unitsInput);
			this.mapObj.circle.setMap(null);
			this.mapObj.circle.radius = parseInt(radiusInput);
			this.mapObj.circle.setMap(this.mapObj.map);
		},

		createGroup: function(e) {

		}
	});

	return NewGroupView;

});