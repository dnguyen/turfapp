define([
	'namespace',
	'jquery',
	'backbone',
	'marionette'
], function(namespace, $, Backbone, Marionette) {
	var TurfApp = namespace.app;
	var socket = namespace.socket;
	var MainController = Marionette.Controller.extend({

		// Determine which view to render based on their login status
		// User is logged in when userid+token exists in localStorage, and is authenticated by the server
		//		-> Redirect to groups page
		// userid and token don't exist in localStorage
		//		-> Render home page view
		homePage: function() {
			console.log('homePage route controller');
			var userData = localStorage.getItem('userData');
			if (userData === null) {
				console.log('userData null');
				//window.location = "#/home";
				require(['views/home'], function(HomeView) {
					var homeView = new HomeView();
					TurfApp.content.show(homeView);
				});
			} else {
				userData = JSON.parse(userData);
				var loginReq = $.ajax({
					type: 'GET',
					url: 'http://192.168.0.100:3001/auth',
					data: {
						uid: userData.uid,
						token: userData.token
					}
				});

				$.when(loginReq).then(function(data) {
					console.log('successful auth with token and user id');
					namespace.socket.emit('connect_', {
						uid: userData.uid,
						token: userData.token
					});
					window.location = "#/groups";
				}).fail(function(err, status, data) {
					console.log('Failed to auth token and user id');
				});
			}
		},

		groupsPage: function() {
			var groupsControllerRoute = require(['controllers/groups'], function(GroupsController) {
				console.group('groupsPage Route');
				console.groupEnd();
				var groupsController = new GroupsController();
			});
		},

		groupPage: function(id) {
			console.log('groupPage route');
			var groupControllerRoute = require(['controllers/group'], function(GroupController) {
				var groupController = new GroupController({
					id: id
				});

			});
		},

		newGroupPage: function() {
			var newGroupControllerRoute = require(['controllers/newGroupController'], function(NewGroupController) {
				var groupController = new NewGroupController();
				//groupController.render();
			});
		},

		loginPage: function() {
			var AuthControllerRoute = require(['controllers/auth'], function(AuthController) {
				var authController = new AuthController();
				authController.renderLoginView();
			});
		},

		registerPage: function() {
			var AuthControllerRoute = require(['controllers/auth'], function(AuthController) {
				var authController = new AuthController();
				authController.renderRegisterView();
			});
		},

		logout: function() {
			localStorage.removeItem('userData');
			//socket.disconnect();
		}
	});

	return MainController;

});