var sessionLength;
var breakLength;
var minutes;
var	seconds;
var secondsPerMinute = 60; // Default
var interval;
var timerName;

// Initialize defaults to start a standard 25- minute
// session and a 5-minute break
function setDefaults() {
	// stop the timer if it's running
	if (document.getElementById("timer").value === "started") {
		clearInterval(interval);
	}
	document.getElementById("timer").value = "start";
	sessionLength = 25;
	breakLength = 5;
	timerName = "Session";
	getSession();
	getBreak();
	setTime();
	getTime();
}

// Display session length
function getSession() {
	document.getElementById("sessionLength").innerHTML = sessionLength;
}

// Display break length
function getBreak() {
	document.getElementById("breakLength").innerHTML = breakLength;
}

function getTime() {
	var length;
	if (timerName === "Session") {
		length = sessionLength;
	} else if (timerName === "Break!") {
		length = breakLength;
	}
	document.getElementById("timer").innerHTML = timerName + "<br><br>" + length + ":00";
}

/*
 Adjust session length, and if the session is active AND
 the timer is stopped, reset the session (both minutes /
 seconds), display it within the countdown timer, and start over.

 Otherwise allow the session length to be reset without interrupting
 the break countdown

 Do not allow negative break length
*/
function setSession(incrOrDecr) {
	function incrDecrSess() {
		if (incrOrDecr === "incr") {
			sessionLength++;
		} else if (incrOrDecr === "decr" && sessionLength > 0) {
			sessionLength--;
		}
	}
	if (timerName !== "Session") {
		incrDecrSess();
		getSession();
	} else if (timerName === "Session" && document.getElementById("timer").value === "start") {
		incrDecrSess();
		getSession();
		setTime();
		getTime();
	}
}

/*
 Adjust break length, and if the break is active AND
 the timer is stopped, reset the break (both minutes /
 seconds), display it within the countdown timer, and start over.

 Otherwise allow the break length to be reset without interrupting
 the session countdown

 Do not allow negative break length
*/
function setBreak(incrOrDecr) {
	function incrDecrBrk() {
		if (incrOrDecr === "incr") {
			breakLength++;
		} else if (incrOrDecr === "decr" && breakLength > 0) {
			breakLength--;
		}
	}
	if (timerName !== "Break!") {
		incrDecrBrk();
		getBreak();
	} else if (timerName === "Break!" && document.getElementById("timer").value === "start") {
		incrDecrBrk();
		getBreak();
		setTime();
		getTime();
	}
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
}

// Timer functions
function startSession() {
	timerName = "Session";
	getSession();
	setTime();
	getTime();
	document.getElementById("timer").value = "start";
	runTimer();
}

function startBreak() {
	timerName = "Break!";
	getBreak();
	setTime();
	getTime();
	document.getElementById("timer").value = "start";
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