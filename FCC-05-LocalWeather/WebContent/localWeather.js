var x = document.getElementById("demo");

var latitude = "";
var longitude = "";

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;

    // latitude = position.coords.latitude;
    // longitude = position.coords.longitude; 
}

// console.log("Latitude: " + latitude);
// console.log("Longitude: " + longitude);

