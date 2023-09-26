/* eslint-disable func-style */
const fullName = document.querySelector('#fName');
const radios = document.querySelectorAll('input[name="gender"]');
const dateOfBirth = document.querySelector('#dateOfBirth');
const socialSecurityNumber = document.querySelector('#socialSecurityNumber');
const address = document.querySelector('#address');
const phoneNumber = document.querySelector('#phone');
const email = document.querySelector('#mail');
const checkboxes = document.querySelectorAll('.contacts');
const eId = document.querySelector('#eId');
const jobTitle = document.querySelector('#jobTitle');
const salary = document.querySelector('#salary');
const hobbies = document.querySelector('#hobbies');
const notes = document.querySelector('#notes');
const select = document.querySelector('#dept');
const inputFields = [fullName, socialSecurityNumber, address, jobTitle, hobbies, notes]
let isValid = true;
const salaryInteger = [];

generateRandom();


document.addEventListener('submit', (e) => {
  validate();
  e.preventDefault();
  checkSalary();
  if (isValid === false) {
    e.preventDefault();
    validate();
  }
});

inputFields.forEach((inputFields, index) => {
  addEventListener('input', (e) => {
    checkRepeat(inputFields, index);
  });
});



addEventListener('beforeinput', clearOnClick);
addEventListener('click', clearOnClick);

function clearOnClick() {
  for (let i = 0; i < 10; i++) {
    document.querySelectorAll('.span-error')[i].style.display = 'none';
    document.querySelectorAll('.field')[i].style.backgroundColor = '#fff';
  }

  for (let i = 0; i < 3; i++) {
    document.querySelectorAll('.span-select-error')[i].style.display = 'none';
  }
}

function clearSalaryField() {
  salary.value = '';
}

function resetField() {
  clearOnClick();

  for (let i = 0; i < 10; i++) {
    document.querySelectorAll('.field')[i].value = null;
  }
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = false;
  });

  radios.forEach(function (radio) {
    radio.checked = false;
  });

  select.selectedIndex = 0;
}

function validate() {
  checkDomain();
  isLength();
  checkAllowedInputs();
  getCheckedValue();
  isDateValid();
  getRadioValue();
  selectbox();
  isRequired();
}

function isRequired() {
  isEmpty(fullName, 0);
  isEmpty(dateOfBirth, 1);
  isEmpty(socialSecurityNumber, 2);
  isEmpty(address, 3);
  isEmpty(phoneNumber, 4);
  isEmpty(email, 5);
  isEmpty(jobTitle, 6);
  isEmpty(salary, 7);
  isEmpty(hobbies, 8);
}

function salToDecimal() {
  const numbersOnly = /^[0-9]*$/;

  const joined = [1, 2];

  salaryInteger[0] = salary.value;
  salaryInteger[1] = salary.value;
  salaryInteger[2] = '00';

  if (salary.value !== '' && salary.value.match(numbersOnly) && salary.value.length <= 10) {
    salary.value = joined.map(index => salaryInteger[index]).join('.');
  }
}

function isLength() {
  checkLength(fullName, 3, 20, 0);
  checkLength(socialSecurityNumber, 7, 9, 2);
  checkLength(phoneNumber, 7, 10, 4);
  checkLength(email, 0, 50, 5);
  checkLength(jobTitle, 3, 50, 6);
  checkLength(salary, 3, 10, 7);
  checkLength(hobbies, 3, 25, 8);
}

function isEmpty(fields, i) {
  const x = fields.value.trim();
  const index = i;

  if (x == '') {
    document.querySelectorAll('.span-error')[index].style.display = 'block';
    document.querySelectorAll('.span-error')[index].innerHTML = 'Required';
    fields.style.backgroundColor = '#FF000015';
    isValid = false;
  }
}

function checkLength(fields, min, max, index) {
  let field = fields.value.trim()
  let inputLength = field.length;

  if (fields == salaryInteger) {
    inputLength = salaryInteger[0].length;
  }

  if (inputLength < min && inputLength != 0) {
    document.querySelectorAll('.span-error')[index].style.display = 'block';
    document.querySelectorAll('.span-error')[index].innerHTML = `Minimum length is ${min}`;
    isValid = false;
    fields.style.backgroundColor = '#FF000015';
  }

  if (inputLength > max) {
    document.querySelectorAll('.span-error')[index].style.display = 'block';
    document.querySelectorAll('.span-error')[index].innerHTML = `Maximum length is ${max}`;
    isValid = false;
    fields.style.backgroundColor = '#FF000015';
  }
}

function getRadioValue() {
  const errorSpan = document.querySelectorAll('.span-select-error')[0];
  let isValid = false;

  radios.forEach((radio) => {
    if (radio.checked) {
      isValid = true;
    }
  });

  if (!isValid) {
    errorSpan.style.display = 'block';
    errorSpan.textContent = 'Required';
  } else {
    errorSpan.style.display = 'none';
  }
}

function getCheckedValue() {

  let isAnyChecked = false;

  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      isAnyChecked = true;
    }
  });

  if (!isAnyChecked) {
    document.querySelectorAll('.span-select-error')[1].style.display = 'block';
    document.querySelectorAll('.span-select-error')[1].innerHTML = 'Required';
    isValid = false;
  }

}

function selectbox() {

  if (select.value == 0) {
    document.querySelectorAll('.span-select-error')[2].style.display = 'inherit';
    document.querySelectorAll('.span-select-error')[2].innerHTML = 'Required';
    isValid = false;
  } else {
    document.querySelectorAll('.span-select-error')[2].style.display = 'none';
  }
}

function generateRandom() {
  const eIdRandom = Math.round(Math.random() * (10 - 1) + 1);
  eId.value = eIdRandom;
}

function checkDomain() {
  const mail = email.value.trim();
  const regEx = /^[a-zA-Z]$/;
  let first = mail.charAt(0);

  if (!mail.endsWith('@gmail.com') && !mail.endsWith('@yahoo.com')) {
    document.querySelectorAll('.span-error')[5].style.display = 'block';
    document.querySelectorAll('.span-error')[5].innerHTML =
      'only @gmail.com or @yahoo.com are allowed';
    isValid = false;
    email.style.backgroundColor = '#FF000015';
  }

  if (!regEx.test(String(first))) {
    document.querySelectorAll('.span-error')[5].style.display = 'block';
    document.querySelectorAll('.span-error')[5].innerHTML =
      'Enter a valid email';
    isValid = false;
    email.style.backgroundColor = '#FF000015';
  }
}

function checkAllowedInputs() {
  const alphaSpaces = /^[a-zA-Z\s][a-zA-Z\s]*$/;
  const numberHyphens = /^[0-9-]+$/;
  const numbersOnly = /^[0-9]*$/;
  const numbersDate = /^[0-9/]*$/;
  const alphaNumericSpacePeriods = /^[a-zA-Z,.\s]*$/;
  const alphaCommaHyphen = /^[a-zA-Z,-]*$/;
  const alphaSpaceCommaHyphen = /^[a-zA-Z\s,-]*$/;
  const alphaSpacesError = 'Alphabets and Spaces Only';
  const numberHyphensError = 'Numbers and Hyphens Only';
  const numbersOnlyError = 'Numbers Only';
  const alphaNumericSpacePeriodsError = 'Alphanumeric Characters with Spaces, Commas and Periods Only';
  const alphaCommaHyphenError = 'Alphabets,Commas and Hyphens only';
  const alphaSpaceCommaHyphenError = 'Alphabets,Spaces,Commas and Hyphens Only';

  isAllowed(fullName, alphaSpaces, 0, alphaSpacesError);
  isAllowed(jobTitle, alphaSpaces, 6, alphaSpacesError);
  isAllowed(socialSecurityNumber, numberHyphens, 2, numberHyphensError);
  isAllowed(phoneNumber, numbersOnly, 4, numbersOnlyError);
  isAllowed(dateOfBirth, numbersDate, 1, numbersOnlyError);
  isAllowed(hobbies, alphaCommaHyphen, 8, alphaCommaHyphenError);
  isAllowed(notes, alphaNumericSpacePeriods, 9, alphaNumericSpacePeriodsError);
  isAllowed(address, alphaSpaceCommaHyphen, 3, alphaSpaceCommaHyphenError);
}

function isAllowed(element, expression, index, message) {
  let elements = element.value.trim();
  if (!elements.match(expression)) {
    document.querySelectorAll('.span-error')[index].style.display = 'block';
    document.querySelectorAll('.span-error')[index].innerHTML = message;
    element.style.backgroundColor = '#FF000015';
    isValid = false;
  }
}


function isDateValid() {
  const birth = new Date(dateOfBirth.value);
  const birthYear = birth.getFullYear();
  const current = new Date();
  const currentYear = current.getFullYear();
  const age = currentYear - birthYear;

  if (age > 100 || age < 18 || isNaN(age)) {
    document.querySelectorAll('.span-error')[1].style.display = 'block';
    document.querySelectorAll('.span-error')[1].innerHTML = 'Age Should be Between 18 and 100';
    isValid = false;
    dateOfBirth.style.backgroundColor = '#FF000015';
  }

  if (!dateFormat(dateOfBirth.value) || dateOfBirth.value.includes('0000')) {
    document.querySelectorAll('.span-error')[1].style.display = 'block';
    document.querySelectorAll('.span-error')[1].innerHTML = 'Not Valid';
    dateOfBirth.style.backgroundColor = '#FF000015';
    return false;
  }
}

function dateFormat(dateString) {
  const datePattern = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
  return datePattern.test(dateString);
}

function trimSalary(inputString) {
  inputString = inputString.value;
  const integerNumber = parseInt(floatingNumber);
  salary.value = integerNumber;
}


function checkRepeat(inputString, index) {
  const characters = ['--', '  ', ',,', '..'];
  if (characters.some(substring => inputString.value.includes(substring))) {
    document.querySelectorAll('.valid-input')[index].style.display = 'block';
    document.querySelectorAll('.valid-input')[index].innerHTML = 'Not Valid';
    inputString.style.backgroundColor = '#FF000015';

    isValid = false;
    return;
  } else {
    document.querySelectorAll('.valid-input')[index].style.display = 'none';
  }
}


function checkSalary() {
  regEx = /^[0-9]*$/;
  let sal = salaryInteger[0]
  document.querySelectorAll('.span-error')[7].style.display = 'block';

  if (sal.length < 3 && sal.length != '') {
    document.querySelectorAll('.span-error')[7].innerHTML = 'Minimum Length is 3';
    salary.style.backgroundColor = '#FF000015';
  }
  if (sal.length > 10) {
    document.querySelectorAll('.span-error')[7].innerHTML = 'Maximum Length is 10';
    salary.style.backgroundColor = '#FF000015';
  }
  if (!regEx.test(sal)) {
    document.querySelectorAll('.span-error')[7].innerHTML = 'Numbers Only';
    salary.style.backgroundColor = '#FF000015';
  }

  if (parseInt(sal) < 100) {
    document.querySelectorAll('.span-error')[7].innerHTML = 'Mininmum amount is 100';
  }

}