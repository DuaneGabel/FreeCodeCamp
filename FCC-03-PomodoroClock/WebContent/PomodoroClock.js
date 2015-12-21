var sessionLength = 1;
var breakLength = 5;
var minutes = sessionLength - 1;
var seconds = 60;
//var interval = 	setInterval(startTimer(), 1000);

function displayTimer() {
	document.getElementById("timer").innerHTML = sessionLength + ":00";
}

function startTimer() {
	minutes = checkTime(minutes);
	seconds = checkTime(seconds);
	setInterval(function() {
		seconds--;

		document.getElementById("timer").innerHTML = minutes + ":" + seconds;
		
		if (sec == 00) {
			minutes--;
			seconds = 60;
	
			if (minutes == 0) {
				minutes = sessionLength;
			}
		}
	}, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
