angular.module('localWeatherApp', []).controller('localWeatherCtrl', function($scope, $http) {
    
    // *************************** 
    // Initialization
    // *************************** 
    // location type (current or elswhere)
	$scope.query = {
		type: ''
	};

    var cityName = '';
    var description = '';
    var currentTemperature = '';
    var todaysHigh = '';
    var todaysLow = '';
    var humidity = '';
    var windSpeed = '';
    var tempType = '';
	
	// don't show the progress spinner, yet, nor city / state / zip entry
	$scope.waitingForResults = false;
	$scope.enterElsewhere = false;
	$scope.showError = false;

    // *************************** 
    // Functions
    // *************************** 
    // Wrapper function
    $scope.getLatLong = function(location) {
        
        // reset view each time
        $scope.temperatureDetails = false;
        $scope.waitingForResults = true;
        
        // if using current position, go ahead and get lat/long
        if ($scope.query.type === 'current') {
            $scope.enterElsewhere = false;
            $scope.showError = false;
            getBrowserLatLong();
        
        // otherwise, wait for entry of city/state or zip before getting lat/long    
        } else if ($scope.query.type === 'userEntered') {
            $scope.showError = false;
            var address = '';
            
            if ($scope.city && $scope.state) {
                    address = $scope.city + ', ' + $scope.state;
                } else if ($scope.zip) {
                    address = $scope.zip;
                } else {
                    $scope.errorMessage = "You must enter either a city and state, or zip!"
                    $scope.showError = true;
                }

            try {
                getUserEnteredLatLong(address);
            } catch(err) {
                console.log(err);
            }
        }
    };
    
    var getBrowserLatLong = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition);
        } else {
            alert('Geolocation is not available in this browser!');
        };
        
        function getPosition(position) {
            $scope.lat = position.coords.latitude;
            $scope.lon = position.coords.longitude;
            
            // Attempt to get full formatted City, State, & Country from Google reverse geocoder
            getFormattedAddress($scope.lat, $scope.lon);
        };
    };
    
    var getUserEnteredLatLong = function(address) {
        var googleUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=false';
        
        $http.get(googleUrl).then(function(result) {
            
            $scope.formattedAddress = result.data.results[0].formatted_address;
            $scope.lat = result.data.results[0].geometry.location.lat;
            $scope.lon = result.data.results[0].geometry.location.lng;
        
            if (result.data.status === 'OK') {
                getWeather();
            } else {
                console.log('Google API error: ' + result.data.error_message);
            }
        });
    };
    
    var getFormattedAddress = function(lat, lon) {
        var googleUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&sensor=false';
        $scope.formattedAddress = '';

        $http.get(googleUrl).then(function(result) {
            
            console.log('Reverse geocoder API status: ' + result.data.status);
            
            if (result.data.status === 'OK') {
                $scope.formattedAddress = result.data.results[0].address_components[3].short_name + ', ' + result.data.results[0].address_components[5].short_name + ', ' + result.data.results[0].address_components[6].short_name;
            }
            
            // then get weather details
            getWeather();

        });
    };

    var getWeather = function() {
    	// set temperature type to Celsius coming back from service
    	
	    tempType = 'C';

        var weatherUrl = 'https://fcc-weather-api.glitch.me/api/current?lat=' + $scope.lat + '&lon=' + $scope.lon;
        
        $http.get(weatherUrl).then(function(result) {

            cityName = $scope.formattedAddress !== '' ? $scope.formattedAddress : result.data.name;
            description = result.data.weather[0].description;
            currentTemperature = result.data.main.temp;
            todaysHigh = result.data.main.temp_max;
            todaysLow = result.data.main.temp_min;
            humidity = result.data.main.humidity;
            windSpeed = result.data.wind.speed;
            $scope.weatherIcon = result.data.weather[0].icon;
            
            // first convert service-provided temp to Fahrenheit
            $scope.convertDegrees();
            
            // and update the view
            $scope.waitingForResults = false;
            $scope.temperatureDetails = true;
        });
    };
    
    var populateWeatherDetails = function() {
        $scope.items = [];
        
        $scope.items.push(
            { type: 'City Name', value: cityName },
            { type: 'Description', value: toTitleCase(description) },
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
        
        // take given temp and tempType, and then convert both
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

        // change display on the button
        $scope.tempTypeString = tempType === 'C' ? 'Fahrenheit' : 'Celsius';

        // then populate weather details
        populateWeatherDetails();
    };
    
    $scope.clearDetails = function() {
        $scope.temperatureDetails = false;
    	$scope.waitingForResults = false;
        $scope.city = '';
        $scope.state = '';
        $scope.zip = '';
        $scope.formattedAddress = '';
    };
    
    $scope.showElsewhere = function() {
        $scope.enterElsewhere = true;
    };
    
    var toTitleCase = function(str) {
        var strArray = str.split(" ");
    
        var newStr = "";
        
        for (var i = 0; i < strArray.length; i++) {
            for (var j = 0; j < strArray[i].length; j++) {
                if (j === 0) {
                    newStr += strArray[i][j].toUpperCase();
                } else {
                    newStr += strArray[i][j].toLowerCase();
                }
            }
            
            if (i !== strArray.length - 1) {
                newStr += " ";        
            }
        }
        
        return newStr;
    };
    
    // $scope.setFocus = function() {
    // 	 document.getElementById("cityBox").focus();
    // };

});
