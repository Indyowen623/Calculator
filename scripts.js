// Select display
const display = document.querySelector(".display");

// Variables to track values
let firstNumber = "";
let operator = "";
let displayValue = "";

// Function to update display
function updateDisplay(value) {
    display.textContent = value;
}

// Function tohandle number button clicks
function handleNumberClick(event) {
    if (displayValue.length >= 10) return;
    displayValue += event.target.textContent;
    updateDisplay(displayValue);
}

// Function to handle operator button clicks
function handleOperatorClick(event) {
    if (displayValue === "") return;

    if (firstNumber !== "") {
        firstNumber = operate(operator, firstNumber, displayValue);
        updateDisplay(firstNumber);
    } else {
        firstNumber = displayValue;
    }

    operator = event.target.textContent;
    displayValue = "";
}

// Function to handle equals button
function handleEqualsClick() {
    if (firstNumber === "" || displayValue === "") return;

    firstNumber = operate(operator, firstNumber, displayValue);
    updateDisplay(roundResult(firstNumber));

    displayValue = "";
    operator = "";
}

// Function to handle clear button
function handleClearClick() {
    firstNumber = "";
    displayValue = "";
    operator = "";
    updateDisplay("0");
}

// Function to round result & remove trailing zeros
function roundResult(value) {
    return parseFloat(parseFloat(value).toFixed(10).toString());
}

// Basic math operations
const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => b !== 0 ? a / b : "Error"
};

// Function to perform calculation
function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return operations[operator] ? operations[operator](a, b) : "Error";
}

// Add event listeners to buttons
document.querySelectorAll(".numberbuttons").forEach(button =>
    button.addEventListener("click", handleNumberClick)
);

document.querySelectorAll(".operatorbuttons").forEach(button =>
    button.addEventListener("click", handleOperatorClick)
);

document.getElementById("btnEquals").addEventListener("click", handleEqualsClick);
document.getElementById("btnClear").addEventListener("click", handleClearClick);

//Initialize Display
updateDisplay("0");