// This is a JavaScript file

app.controller('MainController', ['$rootScope', '$scope', 'service', '$http', function($rootScope, $scope, service, $http) {

}]);

app.controller('MenuController', ['$rootScope', '$scope', 'service', '$http', function($rootScope, $scope, service, $http) {

    $scope.pageTitle = 'Menu';

    $scope.$on('refresh: device_features', function() {
        $scope.lights = service.lights;
        $scope.pageTitle = service.serviceName;
    });

    $scope.switchStatus = {
        true    : 'ON',
        false   : 'OFF'
    };

    var data = '';
    var requestUrl = '';
    var headerParam = {
        'Origin': 'http://manager.android.deviceconnect.org/' 
    };
    
    $scope.onSwitchChange = function(index) {
        if (index === 99) {
            if (switch_all.isChecked()) {
                requestUrl = service.baseUrl + '/light/group';
                data = 'accessToken=' + service.accessToken + '&serviceId=' + service.serviceId + '&groupId=30&color=FFFFFF';
                $http.post(requestUrl, data, { headers: headerParam }).then(
                    function(result) {
                        switch_1.setChecked(true);
                        switch_2.setChecked(true);
                        switch_3.setChecked(true);
                    }
                );
            }
            else {
                requestUrl = service.baseUrl + '/light/group' + '?accessToken=' + service.accessToken + '&serviceId=' + service.serviceId + '&groupId=30';
                $http.delete(requestUrl, { headers: headerParam }).then(
                    function(result) {
                        switch_1.setChecked(false);
                        switch_2.setChecked(false);
                        switch_3.setChecked(false);
                    }
                );
            }
            return;
        }

        requestUrl = service.baseUrl + '/light';
        data = 'accessToken=' + service.accessToken + '&serviceId=' + service.serviceId + '&lightId=' + service.lights[index].lightId + '&color=FFFFFF';
        if (index===0) {
            if (switch_1.isChecked()) {
                $http.post(requestUrl, data, { headers: headerParam });
            }
            else {
                requestUrl = service.baseUrl + '/light' + '?accessToken=' + service.accessToken + '&serviceId=' + service.serviceId + '&lightId=' + service.lights[index].lightId;
                $http.delete(requestUrl, { headers: headerParam });
            }
        }
        else if (index===1) {
            if (switch_2.isChecked()) {
                $http.post(requestUrl, data, { headers: headerParam });
            }
            else {
                requestUrl = service.baseUrl + '/light' + '?accessToken=' + service.accessToken + '&serviceId=' + service.serviceId + '&lightId=' + service.lights[index].lightId;
                $http.delete(requestUrl, { headers: headerParam });
            }
        }
        else if (index===2) {
            if (switch_3.isChecked()) {
                $http.post(requestUrl, data, { headers: headerParam });
            }
            else {
                requestUrl = service.baseUrl + '/light' + '?accessToken=' + service.accessToken + '&serviceId=' + service.serviceId + '&lightId=' + service.lights[index].lightId;
                $http.delete(requestUrl, { headers: headerParam });
            }
        }
    };
    
    $scope.onColorChange_1 = function(event, color) {
        requestUrl = service.baseUrl + '/light';
        data = 'accessToken=' + service.accessToken + '&serviceId=' + service.serviceId + '&lightId=' + service.lights[0].lightId + '&color=' + color.substr(1);
        $http.post(requestUrl, data, { headers: headerParam }).then(
            function(result) {
                switch_1.setChecked(true);
            }
        );
    };

    $scope.onColorChange_2 = function(event, color) {
        requestUrl = service.baseUrl + '/light';
        data = 'accessToken=' + service.accessToken + '&serviceId=' + service.serviceId + '&lightId=' + service.lights[1].lightId + '&color=' + color.substr(1);
        $http.post(requestUrl, data, { headers: headerParam }).then(
            function(result) {
                switch_2.setChecked(true);
            }
        );
    };

    $scope.onColorChange_3 = function(event, color) {
        requestUrl = service.baseUrl + '/light';
        data = 'accessToken=' + service.accessToken + '&serviceId=' + service.serviceId + '&lightId=' + service.lights[2].lightId + '&color=' + color.substr(1);
        $http.post(requestUrl, data, { headers: headerParam }).then(
            function(result) {
                switch_3.setChecked(true);
            }
        );
    };

    $scope.onColorChange_all = function(event, color) {
        requestUrl = service.baseUrl + '/light/group';
        data = 'accessToken=' + service.accessToken + '&serviceId=' + service.serviceId + '&groupId=30&color=' + color.substr(1);
        $http.post(requestUrl, data, { headers: headerParam }).then(
            function(result) {
                switch_1.setChecked(true);
                switch_2.setChecked(true);
                switch_3.setChecked(true);                
                switch_all.setChecked(true);
            }
        );
    };


    // Other API Services
    $scope.$on('refresh: other_services', function() {
        $scope.pageTitle = 'Other API Actions';
    });
    
    $scope.items = [
        { 
            name : 'Availability', 
            requestUrl  : '/availability',
            description : 'Availability' 
        },
        { 
            name : 'Authorization', 
            requestUrl  : '/authorization/grant',
            description : 'Authorization' 
        },
        { 
            name : 'AccessToken', 
            requestUrl  : '/authorization/accesstoken',
            description : 'AccessToken' 
        }
    ];
        
    $scope.onItemSelect = function(item, index) {
        var eventType = {
            AVAILABILITY        : 0,
            AUTHORIZATION       : 1,
            ACCESS_TOKEN        : 2,
            SERVICE_DISCOVERY   : 3,
            SERVICE_INFORMATION : 4
        };
        var requestUrl = '';
        var headerParam = {
            'Origin': 'http://manager.android.deviceconnect.org/' 
        };
        var scopes = Array("battery", "connect", "deviceorientation", "file_descriptor", "file", "media_player",
                "mediastream_recording", "notification", "phone", "proximity", "settings", "vibration", "light",
                "remote_controller", "drive_controller", "mhealth", "sphero", "dice", "temperature","camera",
                "serviceinformation", "servicediscovery");

        switch (index) {
            case eventType.AVAILABILITY:
                requestUrl = service.baseUrl + item.requestUrl;
                $http.get(requestUrl, { headers: headerParam }).then(
                    function(result) {
                        alert(result.statusText);
                    },
                    function(error) {
                        alert("Error: server not found...");
                    }
                );
                break;
                
            case eventType.AUTHORIZATION:
                requestUrl = service.baseUrl + item.requestUrl;
                $http.get(requestUrl, { headers: headerParam }).then(
                    function(result) {
                        service.clientId = result.data.clientId;
                        alert('ClientId: ' +  service.clientId);
                    },
                    function(error) {
                        alert("Error: server not found...");
                    }
                );
                break;
                
            case eventType.ACCESS_TOKEN:
                requestUrl = service.baseUrl + '/authorization/grant';
                $http.get(requestUrl, { headers: headerParam }).then(
                    function(result) {
                        service.clientId = result.data.clientId;
                        requestUrl = service.baseUrl + item.requestUrl + '?clientId=' + service.clientId + '&scope=' + scopes.join() + '&applicationName=org.deviceconnect.sample';
                        $http.get(requestUrl, { headers: headerParam }).then(
                            function(result) {
                                service.accessToken = result.data.accessToken;
                                alert('Access Token: ' +  service.accessToken);
                            }
                        );
                    },
                    function(error) {
                        alert("Error: server not found...");
                    }
                );
                break;

            default:
                break;
        }
    };

}]);

app.controller('SampleController', ['$rootScope', '$scope', 'service', '$http', function($rootScope, $scope, service, $http) {

    var requestUrl = '';
    var headerParam = {
        'Origin': 'http://manager.android.deviceconnect.org/' 
    };

    $scope.devices = '';
    if (service.devices) {
        $scope.devices = service.devices;
    }

    $scope.onPluginClick = function() {
        monaca.plugin.deviceConnect.launchPlugins(successCallback, errorCallback);
    };
    
    $scope.onSearchClick = function() {
        var scopes = Array("battery", "connect", "deviceorientation", "file_descriptor", "file", "media_player",
                "mediastream_recording", "notification", "phone", "proximity", "settings", "vibration", "light",
                "remote_controller", "drive_controller", "mhealth", "sphero", "dice", "temperature","camera",
                "serviceinformation", "servicediscovery");

        requestUrl = service.baseUrl + '/authorization/grant';
        $http.get(requestUrl, { headers: headerParam }).then(
            function(result) {
                service.clientId = result.data.clientId;
                requestUrl = service.baseUrl + '/authorization/accesstoken' + '?clientId=' + service.clientId + '&scope=' + scopes.join() + '&applicationName=org.deviceconnect.sample';
                $http.get(requestUrl, { headers: headerParam }).then(
                    function(result) {
                        service.accessToken = result.data.accessToken;
                        service.showSpinner();
                        requestUrl = service.baseUrl + '/servicediscovery?accessToken=' + service.accessToken;
                        $http.get(requestUrl, { headers: headerParam }).then(
                            function(result) {
                                service.hideSpinner();
                                if (result.data.services.length > 0) {
                                    $scope.devices  = result.data.services;
                                    service.devices = result.data.services;
                                } else {
                                    ons.notification.alert( { title: 'ERROR', message: 'No device found...' } );
                                }
                            },
                            function(error) {
                                service.hideSpinner();
                                ons.notification.alert( { title: 'ERROR', message: error } );
                            }
                        );
                    }
                );
            },
            function(error) {
                ons.notification.alert( { title: 'ERROR', message: 'Server not found...' } );
            }
        );
    };

    $scope.onDeviceSelect = function(item, index) {
        requestUrl = service.baseUrl + '/light' + '?accessToken=' + service.accessToken + '&serviceId=' + item.id;
        $http.get(requestUrl, { headers: headerParam }).then(
            function(result) {
                service.lights = result.data.lights;
                service.serviceId = item.id;
                service.serviceName = item.name;
                $scope.app.slidingMenu.toggleMenu();
                $rootScope.$broadcast('refresh: device_features');

                // requestUrl = service.baseUrl + '/light/group/create';
                // var data = 'accessToken=' + service.accessToken + '&serviceId=' + service.serviceId + '&lightIds=1,2,3&groupName=asial';
                // $http.post(requestUrl, data, { headers: headerParam }).then(
                //     function(result) {
                //         service.group = result.data;
                //         $scope.app.slidingMenu.toggleMenu();
                //         $rootScope.$broadcast('refresh: device_features');
                //     }
                // );
            },
            function(error) {
                ons.notification.alert( { title: 'ERROR', message: 'Server not found...' } );
            }
        );
    };

}]);

app.controller('DConnectController', ['$rootScope', '$scope', 'service', '$http', function($rootScope, $scope, service, $http) {

    $scope.actions = [
        {icon: 'link', desc: 'Launch DeviceConnect'},
        {icon: 'cog', desc: 'Show Settings Page'},
        {icon: 'support', desc: 'Show Plugins Page'},
        {icon: 'play', desc: 'Start DC Service'},
        {icon: 'stop', desc: 'Stop DC Service'},
        {icon: 'fa-ellipsis-h', desc: 'Other Services'}
    ];

    var successCallback = function() {
        alert('Success');
    };
    var errorCallback = function() {
        alert('Error');
    };
    
    $scope.onItemSelect = function(item, index) {
        switch(index) {
            case 0:
                monaca.plugin.deviceConnect.launchDeviceConnect(successCallback, errorCallback);
                break;
            case 1:
                monaca.plugin.deviceConnect.launchSetting(successCallback, errorCallback);
                break;
            case 2:
                monaca.plugin.deviceConnect.launchPlugins(successCallback, errorCallback);
                break;
            case 3:
                monaca.plugin.deviceConnect.startService(successCallback, errorCallback);
                break;
            case 4:
                service.devices = '';
                monaca.plugin.deviceConnect.stopService(successCallback, errorCallback);
                break;
            case 5:
                $scope.app.slidingMenu.toggleMenu();
                $rootScope.$broadcast('refresh: other_services');
                break;
            default:
        }
    };
    
}]);





