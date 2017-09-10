angular.module('localWeatherApp', []).controller('localWeatherCtrl', function($scope, $http, $q) {
    
    // don't show weather results until after the API call
    $scope.temperatureDetails = false;
        
    // functions
    var getWeather = function() {
        var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + $scope.lat + "&lon=" + $scope.lon;
            
        $http.get(url).then(function(result) {
            $scope.todaysDate = result.data.dt;
            $scope.description = result.data.weather[0].description;
            $scope.temp = result.data.main.temp;
            $scope.humidity = result.data.main.humidity;
            $scope.temp_min = result.data.main.temp_min;
            $scope.temp_max = result.data.main.temp_max;
            $scope.windSpeed = result.data.wind.speed + " mph";
            $scope.chanceOfRain = result.data.rain; //need to fix this
            $scope.clouds = result.data.clouds.all;
            $scope.sunrise = result.data.sys.sunrise;
            $scope.sunset = result.data.sys.sunset;
            
            $scope.tempatureDetails = true;
    
        });
        
    };

    $scope.getBrowserLatLong = function() {
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition);
        };
        
        function getPosition(position) {
            
            $scope.lat = position.coords.latitude;
            $scope.lon = position.coords.longitude;

            getWeather();
        };
        
    };
    
});
