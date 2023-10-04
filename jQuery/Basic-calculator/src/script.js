let operator = 0;
let result;
let inputNumber = 0;
let expression = 0;
let foundOperator = false;
let pressedEqual = false;
let count = 0;
let lastChar;
const maxLength = 20; // Maximum length for input

// Event handlers for number buttons
$('.input-number').click(function () {
    getNumber($(this).val());
});

// Event handlers for operator buttons
$('.operators').click(function () {
    getOperator($(this).val());
});

// Event handler for the "=" button
$('#result').click(function () {
    $('#operatorDisplay').html('=')
    $('#numberDisplay').html(checkResult());
    operator = 0;
    count = 0;
    expression = 0;
    expression += result;
    result = 0;
    pressedEqual = true;
    return result;
});

// Event handler for the "Clear" button
$('#clrBtn').click(function () {
    $('#numberDisplay').html('')
    $('#operatorDisplay').html('')
    expression = 0;
    result = 0;
});

// Function to handle operator input
function getOperator(oprVal) {
    foundOperator = true;
    if (!pressedEqual) {
        lastChar = expression.charAt(expression.length - 1);
        pressedEqual = true;
        if (lastChar === '.') {
            $('#numberDisplay').html(expression.charAt(expression.length - 2));
            expression.slice(expression.length - 1);
        }
    }
    $('#operatorDisplay').html(oprVal);

    if (operator != oprVal) {
        operator = oprVal;
        expression += operator;
        count = 0;
    }
}

// Function to handle number input and "."
function getNumber(num) {
    if (num === '.') {
        count++;
    }
    if ((num === '.' && expression.toString().indexOf('.') !== -1) || count > 1) {
        count = 1;
        return;
    }
    inputNumber = num;
    displayNumber(inputNumber);
    expression += inputNumber;
    operator = 0;
}

// Function to display the entered number
function displayNumber(numberValue) {
    clr();
    if ($('#numberDisplay').text().length < maxLength) {
        $('#numberDisplay').html($('#numberDisplay').html() + numberValue);
    }
    if (foundOperator == true) {
        nextNum();
    }
}

// Function to handle displaying the next number
function nextNum() {
    $('#numberDisplay').html(inputNumber);
    $('#operatorDisplay').html('');
    foundOperator = false;
}
// Function to clear the display
function clr() {
    if (pressedEqual == true) {
        $('#numberDisplay').html('')
        $('#operatorDisplay').html('')
    }
    pressedEqual = false;
}

// Function to evaluate the expression and format the result
function checkResult() {
    result = math.evaluate(expression);
    if (!isNaN(result) && result % 1 !== 0) {
        result = result.toFixed(11);
        result = result.replace(/(\.[0-9]*[1-9])0+$/, '$1');
    }
    return result;
}