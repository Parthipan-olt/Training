/* eslint-disable func-style */
const fullName = document.getElementById('fName');
const dateOfBirth = document.getElementById('dateOfBirth');
const socialSecurityNumber = document.getElementById('socialSecurityNumber');
const address = document.getElementById('address');
const phoneNumber = document.getElementById('phone');
const eMail = document.getElementById('mail');
const contacts = document.getElementsByName('contacts');
const eId = document.getElementById('eId');
const jobTitle = document.getElementById('jobTitle');
const salary = document.getElementById('salary');
const hobbies = document.getElementById('hobbies');
const notes = document.getElementById('notes');

generateRandom();

addEventListener('submit', () => {
  validate();
  salToDecimal();

  if (isValid == false) {
    event.preventDefault();
    return false;
  }
});

salary.addEventListener('click', () => {
  salary.value = '';
});

dateOfBirth.addEventListener('click', () => {
  dateOfBirth.value = '';
});

addEventListener('reset', () => {
  for (let i = 0; i < 10; i++) {
    document.getElementsByClassName('span-error')[i].style.display = 'none';
    document.getElementsByName('field')[i].style.backgroundColor = '#fff';
  }

  for (let i = 0; i < 3; i++) {
    document.getElementsByClassName('span-select-error')[i].style.display = 'none';
  }
});

addEventListener('click', () => {
  for (let i = 0; i < 10; i++) {
    document.getElementsByClassName('span-error')[i].style.display = 'none';
    document.getElementsByName('field')[i].style.backgroundColor = '#fff';
  }

  for (let i = 0; i < 3; i++) {
    document.getElementsByClassName('span-select-error')[i].style.display = 'none';
  }
});

function validate() {
  isGmailOrYahoo();
  isLength();
  checkAllowedInputs();
  getCheckedValue();
  getRadioValue();
  selectbox();
  isDateValid();
  isRequired();
}

function isRequired() {
  isEmpty(fullName, 0);
  isEmpty(dateOfBirth, 1);
  isEmpty(socialSecurityNumber, 2);
  isEmpty(address, 3);
  isEmpty(phoneNumber, 4);
  isEmpty(eMail, 5);
  isEmpty(jobTitle, 6);
  isEmpty(salary, 7);
  isEmpty(hobbies, 8);
}

// convert salary from integer to decimal

function salToDecimal() {
  const salaryValue = salary.value;

  if (salaryValue != '') {
    const decimalSalary = parseFloat(salaryValue);

    if (!isNaN(decimalSalary)) {
      salary.value = decimalSalary.toFixed(2);
    }
  }
}

function isLength() {
  checkLength(fullName, 3, 20, 0);
  checkLength(socialSecurityNumber, 7, 9, 2);
  checkLength(phoneNumber, 7, 10, 4);
  checkLength(eMail, 0, 50, 5);
  checkLength(jobTitle, 3, 50, 6);
  checkLength(salary, 3, 10, 7);
  checkLength(hobbies, 3, 25, 8);
}

// check if the fields are not filled

function isEmpty(fields, i) {
  const x = fields.value.trim();
  const index = i;

  if (x == '') {
    document.getElementsByClassName('span-error')[index].style.display = 'block';
    document.getElementsByClassName('span-error')[index].innerHTML = 'Required';
    fields.style.backgroundColor = '#FF000015';
    isValid = false;
  }
}

// check length of inputs

function checkLength(field, min, max, index) {
  field = field.value.trim();
  const inputLength = field.length;

  if (inputLength < min && inputLength != 0) {
    document.getElementsByClassName('span-error')[index].style.display = 'block';
    document.getElementsByClassName('span-error')[index].innerHTML = `minimum length is ${min}`;
    isValid = false;
    return isValid;
  }

  if (inputLength > max) {
    document.getElementsByClassName('span-error')[index].style.display = 'block';
    document.getElementsByClassName('span-error')[index].innerHTML = `maximum length is ${max}`;
    isValid = false;
    return isValid;
  }
  return;
}

// check if the radio buttons are checked or not

function getRadioValue() {
  const radios = document.getElementsByName('gender');

  if (!radios[0].checked && !radios[1].checked) {
    document.getElementsByClassName('span-select-error')[0].style.display = 'block';
    document.getElementsByClassName('span-select-error')[0].innerHTML = 'Required';
    isValid = false;
    return isValid;
  } else {
    document.getElementsByClassName('span-select-error')[0].style.display = 'none';
  }
}

// check if the check buttons are checked or not

function getCheckedValue() {
  const checkboxes = contacts;

  const checkboxesChecked = [];

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxesChecked.push(checkboxes[i]);
    }
  }

  if (checkboxesChecked == '') {
    document.getElementsByClassName('span-select-error')[1].style.display = 'block';
    document.getElementsByClassName('span-select-error')[1].innerHTML = 'Required';
    isValid = false;
  } else {
    document.getElementsByClassName('span-select-error')[1].style.display = 'none';
  }
}

// check if the select box is selected

function selectbox() {
  select = document.getElementById('dept');

  if (select.value == 0) {
    document.getElementsByClassName('span-select-error')[2].style.display = 'inherit';
    document.getElementsByClassName('span-select-error')[2].innerHTML = 'Required';
    isValid = false;
  } else {
    document.getElementsByClassName('span-select-error')[2].style.display = 'none';
  }
}

// generate random value for eID

function generateRandom() {
  const eIdRandom = Math.round(Math.random() * (10 - 1) + 1);

  eId.value = eIdRandom;
}

// check if the email is valid or not

function isGmailOrYahoo() {
  const mail = eMail.value.trim();
  const res = /^[a-zA-Z]$/;

  first = mail.charAt(0);

  if (!mail.endsWith('@gmail.com') && !mail.endsWith('@yahoo.com')) {
    document.getElementsByClassName('span-error')[5].style.display = 'block';
    // eslint-disable-next-line max-len
    document.getElementsByClassName('span-error')[5].innerHTML = 'only @gmail.com or @yahoo.com are allowed';
    isValid = false;
  }

  if (!res.test(String(first))) {
    document.getElementsByClassName('span-error')[5].style.display = 'block';
    // eslint-disable-next-line max-len
    document.getElementsByClassName('span-error')[5].innerHTML = 'Enter a valid email';
    isValid = false;
  }
  return isValid;
}

// Check if the inputs are valid

function checkAllowedInputs() {
  const alphaSpaces = /^[a-zA-Z\s][a-zA-Z\s]*$/;

  const numberHyphens = /^[0-9-]*$/;

  const numbersOnly = /^[0-9.]*$/;

  const numbersDate = /^[0-9/]*$/;

  const alphaNumericSpacePeriods = /^[a-zA-Z,.]*$/;

  const alphaCommaHyphen = /^[a-zA-Z,-]*$/;

  const alphaSpaceCommaHyphen = /^[a-zA-Z\s,-]*$/;

  if (!fullName.value.match(alphaSpaces)) {
    document.getElementsByClassName('span-error')[0].style.display = 'block';
    document.getElementsByClassName('span-error')[0].innerHTML = 'Alphabets and spaces only';
    isValid = false;
  }

  if (!jobTitle.value.match(alphaSpaces)) {
    document.getElementsByClassName('span-error')[6].style.display = 'block';
    document.getElementsByClassName('span-error')[6].innerHTML = 'Alphabets and spaces only';
    isValid = false;
  }

  if (!socialSecurityNumber.value.match(numberHyphens)) {
    document.getElementsByClassName('span-error')[2].style.display = 'block';
    document.getElementsByClassName('span-error')[2].innerHTML = 'Numbers and hyphens only';
    isValid = false;
  }

  if (!phoneNumber.value.match(numbersOnly)) {
    document.getElementsByClassName('span-error')[4].style.display = 'block';
    document.getElementsByClassName('span-error')[4].innerHTML = 'Numbers only';
    isValid = false;
  }

  if (!salary.value.match(numbersOnly)) {
    document.getElementsByClassName('span-error')[7].style.display = 'block';
    document.getElementsByClassName('span-error')[7].innerHTML = 'Numbers only';
    isValid = false;
  }

  if (!dateOfBirth.value.match(numbersDate)) {
    document.getElementsByClassName('span-error')[1].style.display = 'block';
    document.getElementsByClassName('span-error')[1].innerHTML = 'Numbers only';
    document.getElementById('dateOfBirth').value = '';
    isValid = false;
  }

  if (!hobbies.value.match(alphaCommaHyphen)) {
    document.getElementsByClassName('span-error')[8].style.display = 'block';
    document.getElementsByClassName('span-error')[8].innerHTML = 'Alphabets,commas and hyphens only';
    isValid = false;
  }

  if (!notes.value.match(alphaNumericSpacePeriods)) {
    document.getElementsByClassName('span-error')[9].style.display = 'block';
    // eslint-disable-next-line max-len
    document.getElementsByClassName('span-error')[9].innerHTML = 'Alphanumeric characters with spaces, commas and dots only';
    isValid = false;
  }

  if (!address.value.match(alphaSpaceCommaHyphen)) {
    document.getElementsByClassName('span-error')[3].style.display = 'block';
    document.getElementsByClassName('span-error')[3].innerHTML = 'Alphabets,spaces,commas and hyphens only';
    isValid = false;
  }
  return isValid;
}

function dateFormat() {
  if (!dateOfBirth.value == '') {
    const date = new Date(dateOfBirth.value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    dateOfBirth.value = `${year}/${month}/${day}`;
  }
}

dateOfBirth.addEventListener('blur', () => {
  dateFormat();
});

function isDateValid() {
  const birth = new Date(dateOfBirth.value.trim());
  const birthYear = birth.getFullYear();
  const current = new Date();
  const currentYear = current.getFullYear();
  const age = currentYear - birthYear;

  if (age < 18 || age > 100) {
    document.getElementsByClassName('span-error')[1].style.display = 'block';
    document.getElementsByClassName('span-error')[1].innerHTML = 'Age should be between 18 and 100';
    isValid = false;
  }
}
