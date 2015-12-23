var sessionLength = 1;
var breakLength = 1;
var minutes = sessionLength - 1;
var seconds = 60;
var interval;

function displayTimer() {
	document.getElementById("timer").innerHTML = "Session<br><br>" + checkTime(sessionLength) + ":00";
	getBreak();
	getSession();
}

function startTimer() {
/*	if (document.getElementByID("timer").value == "stopped") {
		// start the timer and change the button value to "started"
		document.getElementByID("timer").value = "started"
*/
		interval = setInterval(function() {
	
			if (seconds === 0 && minutes === 0) {
				clearInterval(interval);
			} else {
				seconds--;
	
				document.getElementById("timer").innerHTML = "Session<br><br>" + checkTime(minutes) + ":"
						+ checkTime(seconds);
	
				if (seconds === 0 && minutes > 0) {
					minutes--;
					seconds = 60;
				}
			}
		}, 1000);
	
/*	} else {
		// stop the timer and change the button value to "stopped"
		document.getElementByID("timer").value = "stopped"
		clearInterval(interval);
*/
}

// minutes:seconds formatting function (00:00)
function checkTime(i) {
	if (i < 10) {
		i = "0" + i
	}
	
	return i;
}

function getBreak() {
	document.getElementById("breakLength").innerHTML = breakLength;
}

function getSession() {
	document.getElementById("sessionLength").innerHTML = sessionLength;
}

function setBreak(incrOrDecr) {
	if (incrOrDecr == "incr") {
		breakLength++;
	} else if (incrOrDecr == "decr" && breakLength > 0) {
		breakLength--;
	}
	
	getBreak();
}

function setSession(incrOrDecr) {
	if (incrOrDecr == "incr") {
		sessionLength++;
	} else if (incrOrDecr == "decr" && sessionLength > 0) {
		sessionLength--;
	}
	
	getSession();
	minutes = sessionLength - 1;
	displayTimer();
}

/*
function decrement(i) {
	if (i == "break" && breakLength > 0) {
		breakLength--;
		getBreak();
	} else if (i == "session" && sessionLength > 0) {
		sessionLength--;
		getSession();
	}
	minutes = sessionLength - 1;
	displayTimer();
} 

function increment(i) {
	if (i == "brkLn") {
		breakLength++;
		getBreak();
	} else if (i == "sessLn") {
		sessionLength++;
		getSession();
	}
	minutes = sessionLength - 1;
	displayTimer();
}
*/