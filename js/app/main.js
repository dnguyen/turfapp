require.config({
    paths : {
        backbone : '../lib/backbone/backbone-min',
        underscore : '../lib/underscore/underscore-min',
        jquery : '../lib/jquery-2.1.0.min',
        marionette : "../lib/backbone.marionette/lib/core/amd/backbone.marionette",
        "backbone.wreqr" : "../lib/backbone.wreqr/lib/backbone.wreqr.min",
        "backbone.babysitter" : "../lib/backbone.babysitter/lib/backbone.babysitter.min",
        text : "../lib/requirejs-text/text",
        'jquery.bootstrap' : "../lib/bootstrap.min",
        'socket.io' : '../lib/socket.io/node_modules/socket.io-client/dist/socket.io.min',
        validator: '../lib/validator/validator.min'
    },
    shim : {
        jquery : {
            exports : 'jQuery'
        },

        'jquery.bootstrap': {
            deps: ['jquery']
        },

        underscore : {
            exports : '_'
        },

        backbone : {
            deps : ['jquery', 'underscore'],
            exports : 'Backbone'
        },

        'backbone.wreqr' : {
            deps: [
                'backbone'
            ]
        },

        'backbone.babysitter' : {
            deps : [
                'backbone'
            ]
        },

        marionette : {
            deps : ['backbone.wreqr', 'backbone.babysitter'],
            exports : 'Marionette'
        }
    }
}, require(["TurfApp"], function(TurfApp) {
    function onDeviceReady() {
        console.log("Device is ready");
        return TurfApp.start();
    }

    document.addEventListener('deviceready', onDeviceReady, false);

}));