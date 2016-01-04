var displayNum = "0";
var runningTotal = 0;
var lastOp;

function getDisplay() {
    document.getElementById("display").innerHTML = Number(displayNum);
}

// change color when key clicked
function activeKey(x) {
    x.style.background = "#A0A0A0";
}

// change color back when mouse off
function inactiveKey(x) {
//    alert("mouseup");
    x.style.background = "black";
}

// current number is initially a string so that numbers selected
// can be concatenated together before the next operation
// is pressed
function setDisplay(num) {
        displayNum = displayNum.concat(num);
}

function allClear() {
    displayNum = "0";
    runningTotal = 0;
    lastOp = "";
}

// just clear the current entry; leave the running total
// intact
function clearEntry() {
    displayNum = "0";
}

// transforms the current entry into a percent (divides it by 100)
// and then multiplies that percentage by the running total
function percent() {
    displayNum = runningTotal * (displayNum / 100);
}

// if this is the first operation selected (i.e., running total = 0),
// this sets the running total = current number
// otherwise:
// modifies the running total based on the last operation selected
// BEFORE the current number
function operation(op) {
    if (runningTotal > 0) {
        switch (lastOp) {
            case "+":
                runningTotal += Number(displayNum);
                break;
            case "-":
                runningTotal -= Number(displayNum);
                break;
            case "x":
                runningTotal *= Number(displayNum);
                break;
            case "/":
                if (Number(displayNum) === 0) {
                    alert("Cannot divide by zero!");
                    allClear();
                } else {
                    runningTotal /= Number(displayNum);
                }
                break;
        }
    } else {
        runningTotal = Number(displayNum);
    }
    lastOp = op;
    displayNum = "0";
}

// first calls operation (last operation) to modify running total
// by the current number, and then displays the final running total
function equals() {
    operation(lastOp);
    displayNum = runningTotal;
    lastOp = "";
}