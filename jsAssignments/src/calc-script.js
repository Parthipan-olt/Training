/* eslint-disable func-style */
const one = document.getElementById('btnOne');
const two = document.getElementById('btnTwo');
const three = document.getElementById('btnThree');
const four = document.getElementById('btnFour');
const five = document.getElementById('btnFive');
const six = document.getElementById('btnSix');
const seven = document.getElementById('btnSeven');
const eight = document.getElementById('btnEight');
const nine = document.getElementById('btnNine');
const zero = document.getElementById('btnZero');
const decimalVal = document.getElementById('decimalBtn');

const add = document.getElementById('addBtn');
const sub = document.getElementById('subBtn');
const mul = document.getElementById('mulBtn');
const div = document.getElementById('divBtn');

const eqlBtns = document.getElementById('eqlBtn');
const clear = document.getElementById('clrBtn');

let operator = 0;

let result ;

let temp;

let inputNumber = 0;

let expression = 0;

let foundOperator = false;

let pressedEqual = false;

let count = 0;

let lastChar;

one.addEventListener('click', () => getNumber('1'));
two.addEventListener('click', () => getNumber('2'));
three.addEventListener('click', () => getNumber('3'));

four.addEventListener('click', () => getNumber('4'));
five.addEventListener('click', () => getNumber('5'));
six.addEventListener('click', () => getNumber('6'));

seven.addEventListener('click', () => getNumber('7'));
eight.addEventListener('click', () => getNumber('8'));
nine.addEventListener('click', () => getNumber('9'));

zero.addEventListener('click', () => getNumber('0'));
decimalVal.addEventListener('click', () => getNumber('.'));

addBtn.addEventListener('click', () => getOperator('+'));
subBtn.addEventListener('click', () => getOperator('-'));
mulBtn.addEventListener('click', () => getOperator('*'));
divBtn.addEventListener('click', () => getOperator('/'));

clear.addEventListener('click', () => {
  document.getElementById('numberDisplay').innerHTML = '';
  document.getElementById('operatorDisplay').innerHTML = '';
  expression = 0;
  result = 0;
});

eqlBtns.addEventListener('click', () => {
  document.getElementById('operatorDisplay').innerHTML = '=';
  result = math.evaluate(expression);
  document.getElementById('numberDisplay').innerHTML = result;
  console.log(result);
  operator = 0;
  count = 0;
  expression = 0;
  expression += result;
  result = 0;
  pressedEqual = true;
  return result;
});

function getOperator(oprVal) {
  foundOperator = true;

  if (!pressedEqual) {
    lastChar = expression.charAt(expression.length - 1);
    pressedEqual = true;
    if (lastChar === '.') {
      document.getElementById('numberDisplay').innerHTML = expression.charAt(expression.length - 2);
      expression.slice(expression.length - 1);
    }
  }

  document.getElementById('operatorDisplay').innerHTML = oprVal;
  if (operator != oprVal) {
    operator = oprVal;
    expression += operator;
    count = 0;
  }
}

function getNumber(num) {
  if (num === '.') {
    count++;
  }

  if (num === '.' && inputNumber.includes('.') || count > 1) {
    console.log('decimal count overload');
    count = 1;
    return;
  }

  inputNumber = num;
  console.log(inputNumber);
  displayNumber(inputNumber);
  expression += inputNumber;
  console.log(expression);
  operator = 0;
}

function displayNumber(numberValue) {
  clr();
  document.getElementById('numberDisplay').innerHTML += numberValue;
  if (foundOperator == true) nextNum();
}

function nextNum() {
  document.getElementById('numberDisplay').textContent = inputNumber;
  document.getElementById('operatorDisplay').innerHTML = '';
  foundOperator = false;
}

function clr() {
  if (pressedEqual == true) {
    document.getElementById('numberDisplay').textContent = '';
    document.getElementById('operatorDisplay').innerHTML = '';
  }
  pressedEqual = false;
  // eslint-disable-next-line eol-last
}