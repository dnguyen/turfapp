define([
	'namespace',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'async!http://maps.google.com/maps/api/js?sensor=true',
	'text!../templates/GroupInfo.html'
], function(namespace, $, _, Backbone, Marionette, googleapi, GroupInfoTemplate) {

	var GroupInfoView = Backbone.Marionette.ItemView.extend({
		template: _.template(GroupInfoTemplate),

		onShow: function() {
			var position = new google.maps.LatLng(this.model.get('latitude'), this.model.get('longitude')),
				mapOptions = {
					center: position,
					zoom: 15,
					disableDefaultUI: true,
					draggable: false
				};

			var map = new google.maps.Map(document.getElementById('map'), mapOptions);

			// note: maps api uses meters for api.
			var circle = new google.maps.Circle({
				strokeColor: '#428bca',
				strokeOpacity: 0.8,
				strokeWeight: 1,
				fillColor: '#AEDDF5',
				map: map,
				center: position,
				radius: this.model.get('radius')
			});

			_.each(this.model.get('members'), function(user) {
				$('.members-container').append('<p>' + user.username + '</p>');
			});
		}
	});

	return GroupInfoView;

});