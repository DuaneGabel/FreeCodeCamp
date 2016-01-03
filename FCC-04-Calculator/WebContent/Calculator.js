var displayNum = "0";
var runningTotal = 0;
var lastOp;

function getDisplay() {
    document.getElementById("display").innerHTML = Number(displayNum);
}

function setDisplay(num) {
        displayNum = displayNum.concat(num);
}

function allClear() {
    displayNum = "0";
    runningTotal = 0;
}

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
                runningTotal /= Number(displayNum);
                break;
        }
    } else {
        runningTotal = Number(displayNum);
    }
    lastOp = op;
    displayNum = "0";
}

function equals() {
    operation(lastOp);
    displayNum = runningTotal;
}