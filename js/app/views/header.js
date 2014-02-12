define([
	'namespace',
	'jquery',
	'backbone',
	'marionette',
	'text!../templates/Header.html'
], function(namespace, $, Backbone, Marionette, HeaderTemplate) {

	var HeaderView = Backbone.Marionette.ItemView.extend({
		template: _.template(HeaderTemplate),
		events: {
			'click .Menu' : 'openMenu'
		},

		onShow:function() {
			console.log("onShow header view");
			console.log($('body'));

		},

		openMenu: function(e) {
			if ($('#main-navigation').attr('data-opened')) {
				$('#main-navigation').removeAttr('data-opened');
				window.location = "#";
			} else {
				window.location = "#main-navigation";
				$('#main-navigation').attr('data-opened', 'true');
			}
		}
	});

	return HeaderView;

});