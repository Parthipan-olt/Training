/* eslint-disable func-style */
/* eslint-disable eol-last */
let Name;

let dateOfBirth;

let socialSecurityNumber;

let address;

let phoneNumber;

let eMail;

let contact;

let eId;

let jobTitle;

let salary;

let hobbies;

let notes;

generateRandom();

function getValues() {
  Name = document.getElementById('fName');
  dateOfBirth = document.getElementById('dateOfBirth');
  socialSecurityNumber = document.getElementById('socialSecurityNumber');
  address = document.getElementById('address');
  phoneNumber = document.getElementById('phone');
  eMail = document.getElementById('mail');
  jobTitle = document.getElementById('jobTitle');
  salary = document.getElementById('salary');
  hobbies = document.getElementById('hobbies');
  notes = document.getElementById('notes');
}

addEventListener('submit', () => {
  validate();
  salToDecimal();
  if (isValid == false) {
    event.preventDefault();
    return false;
  }
});

addEventListener('reset', () => {
  for (let i = 0; i < 10; i++) {
    document.getElementsByName('span-validation')[i].style.display = 'none';
    document.getElementsByName('field')[i].style.backgroundColor = '#fff';
  }
  for (let i = 0; i < 3; i++) {
    document.getElementsByName('span-buttons-validation')[i].style.display = 'none';
  }
});

addEventListener('input', () => {
  for (let i = 0; i < 10; i++) {
    document.getElementsByName('span-validation')[i].style.display = 'none';
    document.getElementsByName('field')[i].style.backgroundColor = '#fff';
  }
  for (let i = 0; i < 3; i++) {
    document.getElementsByName('span-buttons-validation')[i].style.display = 'none';
  }
});

function validate() {
  getValues();
  checkAllowedInputs();
  isGmailOrYahoo();
  isRequired();
  isLength();
  getCheckedValue();
  getRadioValue();
  selectbox();
  isDateValid();
}

function isRequired() {
  isEmpty(Name, 0);
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
  const salaryValue = document.getElementById('salary').value;

  if (salaryValue != '') {
    const decimalSalary = parseFloat(salaryValue);

    if (!isNaN(decimalSalary)) {
      document.getElementById('salary').value = decimalSalary.toFixed(2);
    }
  }
}

function isLength() {
  checkLength(Name, 3, 20, 0);
  checkLength(socialSecurityNumber, 7, 9, 2);
  checkLength(phoneNumber, 7, 10, 4);
  checkLength(eMail, 0, 50, 5);
  checkLength(jobTitle, 3, 50, 6);
  checkLength(salary, 3, 10, 7);
  checkLength(hobbies, 3, 25, 8);
}

// check if the fields are not filled

function isEmpty(fields, i) {
  const x = fields.value;
  const index = i;

  if (x == '') {
    document.getElementsByClassName('span-validation')[index].style.display = 'block';
    document.getElementsByClassName('span-validation')[index].innerHTML = 'Required';
    fields.style.backgroundColor = '#FF000015';
    isValid = false;
    return isValid;
  }
}

// check length of inputs

function checkLength(field, min, max, index) {
  const inputLength = field.value.length;

  if (inputLength < min && inputLength != 0) {
    document.getElementsByClassName('span-validation')[index].style.display = 'block';
    document.getElementsByClassName('span-validation')[index].innerHTML = `minimum length is ${min}`;
    isValid = false;
    return isValid;
  }

  if (inputLength > max) {
    document.getElementsByClassName('span-validation')[index].style.display = 'block';
    document.getElementsByClassName('span-validation')[index].innerHTML = `maximum length is ${max}`;
    isValid = false;
    return isValid;
  }
  return;
}

// check if the radio buttons are checked or not

function getRadioValue() {
  const radios = document.getElementsByName('gender');

  if (!radios[0].checked && !radios[1].checked) {
    console.log('not checked', radios[0].id, '&', radios[1].id);
    document.getElementsByClassName('span-buttons-validation')[0].style.display = 'block';
    document.getElementsByClassName('span-buttons-validation')[0].innerHTML = 'Required';
    isValid = false;
    return isValid;
  }
}

// check if the check buttons are checked or not

function getCheckedValue() {
  const checkboxes = document.getElementsByName('contacts');

  const checkboxesChecked = [];

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxesChecked.push(checkboxes[i]);
    }
  }

  if (checkboxesChecked == '') {
    console.log(checkboxesChecked);
    document.getElementsByClassName('span-buttons-validation')[1].style.display = 'block';
    document.getElementsByClassName('span-buttons-validation')[1].innerHTML = 'Required';
    isValid = false;
    return isValid;
  }
}

// check if the select box is selected

function selectbox() {
  select = document.getElementById('dept');

  if (select.value == 0) {
    console.log('Not selected');
    document.getElementsByClassName('span-buttons-validation')[2].style.display = 'inherit';
    document.getElementsByClassName('span-buttons-validation')[2].innerHTML = 'Required';
    isValid = false;
    return isValid;
  }
}

// generate random value for eID

function generateRandom() {
  const eIdRandom = Math.round(Math.random() * (10 - 1) + 1);

  console.log(eIdRandom);
  document.getElementById('eId').value = eIdRandom;
}

// check if the email is valid or not

function isGmailOrYahoo() {
  const mail = document.getElementById('mail').value.trim();
  const res = /^[a-zA-Z]$/;

  first = mail.charAt(0);
  if (!mail.endsWith('@gmail.com') && !mail.endsWith('@yahoo.com')) {
    document.getElementsByClassName('span-validation')[5].style.display = 'block';
    // eslint-disable-next-line max-len
    document.getElementsByClassName('span-validation')[5].innerHTML = 'only @gmail.com or @yahoo.com are allowed';
    isValid = false;
  }

  console.log(res.test(String(first)));
  if (!res.test(String(first))) {
    document.getElementsByClassName('span-validation')[5].style.display = 'block';
    // eslint-disable-next-line max-len
    document.getElementsByClassName('span-validation')[5].innerHTML = 'Enter a valid email';
    isValid = false;
  }
  return isValid;
}

// Check if the inputs are valid

function checkAllowedInputs() {
  const alphaSpaces = /^[a-zA-Z\s][a-zA-Z\s]*$/;

  const numberHyphens = /^[0-9-]*$/;

  const numbersOnly = /^[0-9.]*$/;

  const alphaNumericSpacePeriods = /^[a-zA-Z,.]*$/;

  const alphaCommaHyphen = /^[a-zA-Z,-]*$/;

  const alphaSpaceCommaHyphen = /^[a-zA-Z\s,-]*$/;

  if (!Name.value.match(alphaSpaces)) {
    document.getElementsByClassName('span-validation')[0].style.display = 'block';
    document.getElementsByClassName('span-validation')[0].innerHTML = 'Alphabets and spaces only';
    isValid = false;

  }

  if (!jobTitle.value.match(alphaSpaces)) {
    document.getElementsByClassName('span-validation')[6].style.display = 'block';
    document.getElementsByClassName('span-validation')[6].innerHTML = 'Alphabets and spaces only';
    isValid = false;

  }

  if (!socialSecurityNumber.value.match(numberHyphens)) {
    document.getElementsByClassName('span-validation')[2].style.display = 'block';
    document.getElementsByClassName('span-validation')[2].innerHTML = 'Numbers and hyphens only';
    isValid = false;

  }
  if (!phoneNumber.value.match(numbersOnly)) {
    document.getElementsByClassName('span-validation')[4].style.display = 'block';
    document.getElementsByClassName('span-validation')[4].innerHTML = 'Numbers only';
    isValid = false;

  }
  if (!salary.value.match(numbersOnly)) {
    document.getElementsByClassName('span-validation')[7].style.display = 'block';
    document.getElementsByClassName('span-validation')[7].innerHTML = 'Numbers only';
    isValid = false;

  }

  if (!hobbies.value.match(alphaCommaHyphen)) {
    document.getElementsByClassName('span-validation')[8].style.display = 'block';
    document.getElementsByClassName('span-validation')[8].innerHTML = 'Alphabets,commas and hyphens only';
    isValid = false;

  }

  if (!notes.value.match(alphaNumericSpacePeriods)) {
    document.getElementsByClassName('span-validation')[9].style.display = 'block';
    // eslint-disable-next-line max-len
    document.getElementsByClassName('span-validation')[9].innerHTML = 'Alphanumeric characters with spaces, commas and dots only';
    isValid = false;

  }

  if (!address.value.match(alphaSpaceCommaHyphen)) {
    document.getElementsByClassName('span-validation')[3].style.display = 'block';
    document.getElementsByClassName('span-validation')[3].innerHTML = 'Alphabets,spaces,commas and hyphens only';
    isValid = false;

  }
  return isValid;
}

function isDateValid() {

  const birth = new Date(document.getElementById('dateOfBirth').value.trim());
  const birthYear = birth.getFullYear();
  const current = new Date();
  const currentYear = current.getFullYear();
  const age = currentYear - birthYear;

  console.log(age);

  if (age < 18 || age > 100) {
    document.getElementsByClassName('span-validation')[1].style.display = 'block';
    document.getElementsByClassName('span-validation')[1].innerHTML = 'Age should be between 18 and 100';
  }
  const dateControl = document.querySelector('input[type="date"]');

  dateControl.value = birth;
  console.log(dateControl.value);
}