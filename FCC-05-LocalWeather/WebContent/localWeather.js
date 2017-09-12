angular.module('localWeatherApp', []).controller('localWeatherCtrl', function($scope, $http) {
    
    // set default location type
    	$scope.query = {
			type: ''
	};
	
	// set default temperature type (Celsius, Fahrenheit)
	$scope.tempType = 'C';
	
	// don't show the progress spinner, yet, nor city / state / zip entry
	$scope.waitingForResults = false;
	$scope.enterElsewhere = false;

    // Functions
    // Wrapper function
    $scope.getLatLong = function(location) {
        
        // reset details each time
        $scope.temperatureDetails = false;
        $scope.waitingForResults = true;
        
        if ($scope.query.type === 'current') {
            $scope.enterElsewhere = false;
            getBrowserLatLong();
            
        } else if ($scope.query.type === 'userEntered') {
            var address = '';
            
            if ($scope.city && $scope.state) {
                address = $scope.city + ', ' + $scope.state;
            } else if ($scope.zip) {
                address = $scope.zip;
            }
            getUserEnteredLatLong(address);
        }
    };
    
    var getBrowserLatLong = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition);
        };
        
        function getPosition(position) {
            $scope.lat = position.coords.latitude;
            $scope.lon = position.coords.longitude;

            getWeather();
        };
    };
    
    var getUserEnteredLatLong = function(address) {
        var googleUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=false';
        
        $http.get(googleUrl).then(function(result) {
            $scope.lat = result.data.results[0].geometry.location.lat;
            $scope.lon = result.data.results[0].geometry.location.lng;
            
            getWeather();
        });
    };

    var getWeather = function() {
        var weatherUrl = 'https://fcc-weather-api.glitch.me/api/current?lat=' + $scope.lat + '&lon=' + $scope.lon;
        
        $scope.items = [];
        
        $http.get(weatherUrl).then(function(result) {
            $scope.items.push(
                { type: 'City Name', value: result.data.name },
                { type: 'Description', value: result.data.weather[0].description },
                { type: 'Current Temperature', value: $scope.convertDegrees(result.data.main.temp) },
                { type: 'Today\'s High', value: $scope.convertDegrees(result.data.main.temp_max) },
                { type: 'Today\'s Low', value: $scope.convertDegrees(result.data.main.temp_min) },
                { type: 'Humidity', value: result.data.main.humidity + '%' },
                { type: 'Wind Speed', value: result.data.wind.speed + ' mph' }
            );
            
            $scope.waitingForResults = false;
            $scope.tempatureDetails = true;
        });
    };
    
    $scope.clearDetails = function() {
        $scope.tempatureDetails = false;
        // $scope.enterElsewhere = false;
        $scope.city = '';
        $scope.state = '';
        $scope.zip = '';
    };
    
    $scope.convertDegrees = function(temperature, type) {
        if (type = 'C') {
            type = 'F';
            return Math.round(((temperature * 9) / 5) + 32) + '\xB0 F';
            
        } else if (type = 'F') {
            type = 'C';
            return Math.round(((temperature -32) * 5) / 9) + '\xB0 C';
        }

    };
    
    $scope.showElsewhere = function() {
        $scope.enterElsewhere = true;
        // $scope.setFocus();
    };
    
    $scope.setFocus = function() {
    	 document.getElementById("cityBox").focus();
    };

});

// // outside Angular scope
// var setFocus = function() {
// 	 document.getElementById("cityBox").focus();
// };

