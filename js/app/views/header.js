define([
	'namespace',
	'underscore',
	'jquery',
	'backbone',
	'marionette',
	'jquery.bootstrap',
	'text!../templates/Header.html',
	'text!../templates/HeaderGroup.html',
	'text!../templates/HeaderGroupInfo.html'
], function(namespace, _, $, Backbone, Marionette, Bootstrap, HeaderTemplate, HeaderGroupTemplate, HeaderGroupInfoTemplate) {

	var TurfApp = namespace.app;

	var HeaderView = Backbone.Marionette.ItemView.extend({
		events: {
			'touchstart .Menu' : 'openMenu',
			'touchstart .Settings' : 'openSettingsMenu'
		},

		initialize: function() {
			TurfApp.vent.on('header:changeTitle', this.changeTitle, this);
		},

		getTemplate: function() {
			var page = this.model.get('page');

			if (page === 'group') {
				return _.template(HeaderGroupTemplate);
			} else if (page === 'groupinfo') {
				return _.template(HeaderGroupInfoTemplate);
			} else {
				return _.template(HeaderTemplate);
			}
		},

		onShow:function() {
			$('.Settings').dropdown();
		},

		changeTitle: function(title) {
			$('.brand .title').text(title);
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