var sessionLength;
var breakLength;
var minutes;
var	seconds;
var secondsPerMinute = 5; // Default
var length;
var interval;
var timerName;

// Initialize defaults to start a standard 25- minute
// session and a 5-minute break
function setDefaults() {
	sessionLength = 2;
	breakLength = 2;
	timerName = "Session";
	setTime();
	getSession();
	getBreak();
}

// Display session length, and if the session is active,
// also display it within the countdown timer
function getSession() {
	document.getElementById("sessionLength").innerHTML = sessionLength;
	if (timerName === "Session") {
		document.getElementById("timer").innerHTML = timerName + "<br><br>" + sessionLength + ":00";
	}
}

// Display break length, and if the break is active,
// also display it within the countdown timer
function getBreak() {
	document.getElementById("breakLength").innerHTML = breakLength;
	if (timerName === "Break!") {
		document.getElementById("timer").innerHTML = timerName + "<br><br>" + breakLength + ":00";
	}
}

// Adjust session length, and if the session is active,
// reset the session (both minutes / seconds), display
// it within the countdown timer, and start over.
// Do not allow negative session length
function setSession(incrOrDecr) {
	if (incrOrDecr === "incr") {
		sessionLength++;
	} else if (incrOrDecr === "decr" && sessionLength > 0) {
		sessionLength--;
	}
	if (timerName === "Session") {
		setTime();
	}
	getSession();
}

// Adjust break length, and if the break is active,
// reset the break (both minutes / seconds), display
// it within the countdown timer, and start over.
// Do not allow negative break length
function setBreak(incrOrDecr) {
	if (incrOrDecr === "incr") {
		breakLength++;
	} else if (incrOrDecr === "decr" && breakLength > 0) {
		breakLength--;
	}
	if (timerName === "Break!") {
		setTime();
	}
	getBreak();
}

// Initialize minutes and seconds
function setTime() {
	if (timerName === "Session" && sessionLength > 0) {
		minutes = sessionLength - 1;
		seconds = secondsPerMinute;
	} else if (timerName === "Break!" && breakLength > 0) {
		minutes = breakLength - 1;
		seconds = secondsPerMinute;
	} else {
		minutes = 0;
		seconds = 0;
	}
	document.getElementById("timer").value = "start";
}

// Timer functions
function startSession() {
	timerName = "Session";
	setTime();
	getSession();
	runTimer();
}

function startBreak() {
	timerName = "Break!";
	setTime();
	getBreak();
	runTimer();
}

function runTimer() {
	// On mouse click, start the timer
	if (document.getElementById("timer").value === "start") {
		document.getElementById("timer").value = "started";
		
		interval = setInterval(function() {
			if (seconds === 0 && minutes === 0) {
				clearInterval(interval);
				// continuously alternate between sessions and breaks
				if (timerName === "Session") {
					startBreak();
				} else if (timerName === "Break!") {
					startSession();
				}
			} else {
				if (seconds === 0 && minutes > 0) {
					minutes--;
					seconds = secondsPerMinute;
				}
				seconds--;
				document.getElementById("timer").innerHTML = timerName + "<br><br>" + checkTime(minutes) + ":"
						+ checkTime(seconds);
			}
		}, 1000);
	} else {
		// On mouse click, pause the timer
		clearInterval(interval);
		document.getElementById("timer").value = "start";
	}
}

// minutes:seconds formatting (00:00)
function checkTime(i) {
	if (i < 10) {
		i = "0" + i
	}
	return i;
}

