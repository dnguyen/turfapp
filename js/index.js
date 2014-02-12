/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 $(document).ready(function() {
    var app = {
        // Application Constructor
        initialize: function() {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicity call 'app.receivedEvent(...);'
        onDeviceReady: function() {
            app.receivedEvent('deviceready');
        },
        // Update DOM on a Received Event
        receivedEvent: function(id) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    console.log(position);
                    //alert('Lat: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude);
                    $.ajax({
                        type: 'GET',
                        url: 'http://192.168.0.100:3001/api/validgroups',
                        dataType: 'JSON',
                        data: {
                            position: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            }
                        },
                        success: function(data) {
                            console.log("succesS");
                            console.log(data);
                            $.each(data, function(i, group) {
                                console.log(group);
                                console.log($('.groups'));
                                $('.groups').append('<div class="group row"><div class="col-md-12"><button type="button" class="JoinBtn btn btn-primary btn-xs">Join</button> ' + group.name + '</div></div>');
                            });
                        },
                        error: function(err) {
                            alert("failed");
                        }
                    });
                },
                function(error) {
                    alert(error.message);
                },
                {enableHighAccuracy: true}
            );
        }
    };

    app.initialize();
});