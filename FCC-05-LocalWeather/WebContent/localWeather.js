angular.module('localWeatherApp', []).controller('localWeatherCtrl', function($scope, $http, $q) {
    
    // set default location type
    	$scope.query = {
			type: ''
	};

    // functions
    $scope.getLatLong = function(location) {
        
        // reset details
        $scope.temperatureDetails = false;
        
        if ($scope.query.type === 'current') {
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
            
        $http.get(weatherUrl).then(function(result) {
            $scope.cityName = result.data.name;
            $scope.todaysDate = result.data.dt;
            $scope.description = result.data.weather[0].description;
            $scope.temp = result.data.main.temp;
            $scope.humidity = result.data.main.humidity;
            $scope.temp_min = result.data.main.temp_min;
            $scope.temp_max = result.data.main.temp_max;
            $scope.windSpeed = result.data.wind.speed + ' mph';
            $scope.chanceOfRain = result.data.rain; //need to fix this
            $scope.clouds = result.data.clouds.all;
            $scope.sunrise = result.data.sys.sunrise;
            $scope.sunset = result.data.sys.sunset;
            
            $scope.tempatureDetails = true;
        });
    };
    
    $scope.clearDetails = function() {
        $scope.tempatureDetails = false;
        $scope.city = '';
        $scope.state = '';
        $scope.zip = '';
    }

});
