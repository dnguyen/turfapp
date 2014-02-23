define([
	'namespace',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'validator',
	'async!http://maps.google.com/maps/api/js?sensor=true',
	'text!../templates/NewGroup.html'
], function(namespace, $, _, Backbone, Marionette, validator, googleapi, NewGroupTemplate) {

	function unitsConversion(input, unit) {

		switch (unit) {
			case 'ft':
				input /= 3.28084;
				break;
			case 'mi':
				input *= 1609.34;
				break;
			case 'km':
				input *= 1000;
		}

		return input;
	}

	function validateName(name) {
		if (name !== '' && name.length <= 50 && name.length > 0 ) {
			return true;
		} else {
			return false;
		}
	}

	function validateRadius(radius) {
		if (radius !== '' && validator.isNumeric(radius) && radius > 0) {
			return true;
		} else {
			return false;
		}
	}

	var NewGroupView = Backbone.Marionette.ItemView.extend({
		template: _.template(NewGroupTemplate),
		events: {
			'click .create' : 'createGroup',
			'blur #name' : 'blurName',
			'blur #radius' : 'blurRadius',
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

			this.mapObj.circle.setMap(null);
			this.mapObj.circle.radius = parseInt(unitsConversion(radiusInput, unitsInput));
			this.mapObj.circle.setMap(this.mapObj.map);
		},

		blurName: function(e) {
			var target = $(e.currentTarget);

			if (!validateName(target.val())) {
				target.parent().addClass('has-error');
			} else {
				$('.name-alert').remove();
				target.parent().removeClass('has-error');
				target.parent().addClass('has-success');
			}
		},

		blurRadius: function(e) {
			var target = $(e.currentTarget);

			if (!validateRadius(target.val())) {
				target.parent().addClass('has-error');
			} else {
				$('.radius-alert').remove();
				target.parent().removeClass('has-error');
				target.parent().addClass('has-success');
			}
		},

		createGroup: function(e) {
			var nameInput = $('#name').val(),
				radiusInput = $('#radius').val(),
				unitsInput = $('#units').val(),
				errors = false;

			$('.errors').children().remove();

			if (!validateName(nameInput)) {
				errors = true;
				$('.errors').append('<div class="name-alert alert alert-danger">You must enter a group name less than 50 characters.</div>');
			}

			if (!validateRadius(radiusInput)) {
				errors = true;
				$('.errors').append('<div class="radius-alert alert alert-danger">You must enter a radius greater than 0.</div>');
			}

			if (!errors) {
				var createReq = $.ajax({
					type: 'POST',
					url: namespace.config.server + 'api/groups',
					data: {
						uid: JSON.parse(localStorage.getItem('userData')).uid,
						name: nameInput,
						latitude: this.model.get('latitude'),
						longitude: this.model.get('longitude'),
						radius: unitsConversion(radiusInput, unitsInput)
					}
				});

				$.when(createReq).then(function(data) {
					window.location = '#/group/' + data.groupid;
				});
			}
		}
	});

	return NewGroupView;

});