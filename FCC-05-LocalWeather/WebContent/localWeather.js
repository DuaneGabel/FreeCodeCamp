angular.module('localWeatherApp', []).controller('localWeatherCtrl', function($scope, $http) {
    
    // Initialization
    // *************************** 
    // set default location type
    	$scope.query = {
			type: ''
	};

    var cityName = '';
    var description = '';
    var currentTemperature = '';
    var formattedCurrentTemperature = '';
    var todaysHigh = '';
    var formattedTodaysHigh = '';
    var todaysLow = '';
    var formattedTodaysLow = '';
    var humidity = '';
    var windSpeed = '';
    var tempType = '';
	
	// don't show the progress spinner, yet, nor city / state / zip entry
	$scope.waitingForResults = false;
	$scope.enterElsewhere = false;

    // Functions
    // *************************** 
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
    	// set temperature type to Celsius coming back from service
	    tempType = 'C';

        var weatherUrl = 'https://fcc-weather-api.glitch.me/api/current?lat=' + $scope.lat + '&lon=' + $scope.lon;
        
        $http.get(weatherUrl).then(function(result) {
            cityName = result.data.name,
            description = result.data.weather[0].description ,
            currentTemperature = result.data.main.temp,
            todaysHigh = result.data.main.temp_max,
            todaysLow = result.data.main.temp_min,
            humidity = result.data.main.humidity,
            windSpeed = result.data.wind.speed,
            
            $scope.convertDegrees();
            
            $scope.waitingForResults = false;
            $scope.temperatureDetails = true;
        });
    };
    
    var populateWeatherDetails = function() {
        $scope.items = [];
        
        $scope.items.push(
            { type: 'City Name', value: cityName },
            { type: 'Description', value: description },
            { type: 'Current Temperature', value: currentTemperature + '\xB0' + tempType },
            { type: 'Today\'s High', value: todaysHigh + '\xB0' + tempType },
            { type: 'Today\'s Low', value: todaysLow + '\xB0' + tempType },
            { type: 'Humidity', value: humidity + '%' },
            { type: 'Wind Speed', value: windSpeed + ' mph' }
        );
    };
    
    $scope.convertDegrees = function() {
        
        var getFahrenheit = function(temp) {
            return Math.round(((temp * 9) / 5) + 32);
        };
        
        var getCelsius = function(temp) {
            return Math.round(((temp - 32) * 5) / 9);
        };
        
        if (tempType === 'C') {
            
            tempType = 'F';
            
            currentTemperature = getFahrenheit(currentTemperature);
            todaysHigh = getFahrenheit(todaysHigh);
            todaysLow = getFahrenheit(todaysLow);
            
        } else if (tempType === 'F') {

            tempType = 'C';
            
            currentTemperature = getCelsius(currentTemperature);
            todaysHigh = getCelsius(todaysHigh);
            todaysLow = getCelsius(todaysLow);
            
        }
        
        populateWeatherDetails();
        $scope.tempTypeString = tempType === 'C' ? 'Fahrenheit' : 'Celsius';

    };
    
    $scope.clearDetails = function() {
        $scope.temperatureDetails = false;
        $scope.city = '';
        $scope.state = '';
        $scope.zip = '';
    };
    
    $scope.showElsewhere = function() {
        $scope.enterElsewhere = true;
    };
    
    $scope.setFocus = function() {
    	 document.getElementById("cityBox").focus();
    };

});
