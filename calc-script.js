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

let result = 0;
let newnumber = 0;
let x = false;
let currentInput = 0;
let previousInput = 0;
let srt = 0;


one.addEventListener('click', () => passNumber('1'));
two.addEventListener('click', () => passNumber('2'));
three.addEventListener('click', () => passNumber('3'));

four.addEventListener('click', () => passNumber('4'));
five.addEventListener('click', () => passNumber('5'));
six.addEventListener('click', () => passNumber('6'));

seven.addEventListener('click', () => passNumber('7'));
eight.addEventListener('click', () => passNumber('8'));
nine.addEventListener('click', () => passNumber('9'));

zero.addEventListener('click', () => passNumber('0'));
decimalVal.addEventListener('click', () => displayNumber('.'));


addBtn.addEventListener('click', () => passOperator('+'));
subBtn.addEventListener('click', () => passOperator('-'));
mulBtn.addEventListener('click', () => passOperator('*'));
divBtn.addEventListener('click', () => passOperator('/'));



clear.addEventListener('click', () => {
    document.getElementById("numberDisplay").innerHTML = '';
    document.getElementById('operatorDisplay').innerHTML = '';
    srt=0;
});


function displayNumber(numVal) {
    document.getElementById("numberDisplay").innerHTML += numVal;
    if (x == true) nextNum();
}

function passOperator(oprVal) {
    x = true;
    document.getElementById('operatorDisplay').innerHTML = oprVal;
    console.log(srt)
    srt += oprVal;
    return x;
}

function passNumber(feed) {
    newnumber = feed;
    displayNumber(newnumber);
    srt += newnumber;
    return srt;
}

function nextNum() {
    document.getElementById("numberDisplay").textContent = newnumber;
    document.getElementById('operatorDisplay').innerHTML = '';
    x = false;
    return x;
}

eqlBtns.addEventListener('click', () => {

    document.getElementById('operatorDisplay').innerHTML = '=';
    result = math.evaluate(srt);
    console.log(result)
    document.getElementById("numberDisplay").innerHTML=result;
    srt=0
    
});