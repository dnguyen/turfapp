define([
	'namespace',
	'jquery',
	'backbone',
	'marionette',
	'jquery.bootstrap',
	'text!../templates/Header.html'
], function(namespace, $, Backbone, Marionette, Bootstrap, HeaderTemplate) {

	var HeaderView = Backbone.Marionette.ItemView.extend({
		template: _.template(HeaderTemplate),
		events: {
			'touchstart .Menu' : 'openMenu',
			'touchstart .Settings' : 'openSettingsMenu'
		},

		onShow:function() {
			console.log("onShow header view");
			console.log($('body'));
			$('.Settings').dropdown();
		},

		openMenu: function(e) {
			e.preventDefault();
			if ($('#main-navigation').attr('data-opened')) {
				$('#main-navigation').removeAttr('data-opened');
			} else {
				$('#main-navigation').attr('data-opened', 'true');
			}
		},

		openSettingsMenu: function(e) {
			e.preventDefault();
			console.log('open settings menu');
			$('.Settings').dropdown('toggle');
		}
	});

	return HeaderView;

});