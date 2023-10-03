/* eslint-disable func-style */
const form = document.querySelector('#webForm');
const fullName = document.querySelector('#fName');
const radioButton = document.querySelectorAll('input[name="gender"]');
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
const dataDisplay = document.querySelector('#dataDisplay');
const selectErrors = document.querySelectorAll('.span-select-error');
let isValid = true;
let displayed = false;
const objArray = [];
const data = [];
const fields = [
  fullName, dateOfBirth, email, socialSecurityNumber, address,
  phoneNumber, jobTitle, salary, hobbies, notes
];

generateRandom();
callLengthHandler(); // Limits the input length
addEventListener('beforeinput', clearOnClick);

// Add a submit event listener to the form
document.addEventListener('submit', (e) => {
  if (!validate()) {
    e.preventDefault();
    return false;
  } else {
    e.preventDefault();
    save();
    return true;
  }
});

// Function to clear validation errors
function clearOnClick() {
  fields.forEach((field) => {
    field.nextElementSibling.style.display = 'none';
    field.style.backgroundColor = '#fff';
  });

  selectErrors.forEach((error) => {
    error.style.display = 'none';
  });
}

// Function to reset all form fields
function resetField() {
  form.reset();
  generateRandom();
  dataDisplay.style.display = 'none';
  displayed = false;
  for (i = 0; i < data.length; i++) {
    data[i] = ''
  }
  return;
}

// Function to validate the entire form
function validate() {
  isValid = true;

  checkEmail();
  isRadioChecked();
  isSelectboxSelected();
  isLength();
  checkStartEnd();
  isCheckboxChecked();
  isDateValid();
  checkRepeatingSymbols();
  checkAllowedInputs();
  salToDecimal();
  isRequired();

  return isValid;
}

// Function to check if fields are required and display errors
function isRequired() {
  isEmpty(fullName);
  isEmpty(dateOfBirth);
  isEmpty(socialSecurityNumber);
  isEmpty(address);
  isEmpty(phoneNumber);
  isEmpty(email);
  isEmpty(jobTitle);
  isEmpty(hobbies);
  isEmpty(salary);
}

// Function to convert salary to decimal format
function salToDecimal() {
  const salaryValue = salary.value.trim();
  const salaryFormat = /^\d{1,10}(\.\d{0,2})?$/;

  checkSalary();

  if (salaryValue !== '' && !isNaN(salary.value) && checkSalary()) {
    const decimalSalary = parseFloat(salaryValue);

    if (!isNaN(decimalSalary)) {
      salary.value = decimalSalary.toFixed(2);
    }
    if (!salaryFormat.test(salaryValue)) {
      showError(salary, 'Please Enter a Valid Number');
    }
  }
}

// Function to check field lengths
function isLength() {
  checkLength(fullName, 3, 20);
  checkLength(socialSecurityNumber, 7, 9);
  checkLength(phoneNumber, 7, 10);
  checkLength(email, 0, 50);
  checkLength(jobTitle, 3, 50);
  checkLength(hobbies, 3, 25);
}

// Function to check if a field is empty and display errors
function isEmpty(field) {
  const x = field.value.trim();

  if (x === '') {
    showError(field, 'Required');
  }
}

// Function to check field length and display errors
function checkLength(field, min, max) {
  let fieldValue;
  fieldValue = field.value.toString();
  const inputLength = fieldValue.length;

  if (inputLength < min && inputLength !== 0) {
    showError(field, `Minimum length is ${min} & Maximum length is ${max}`);
  } else {
    return true
  }
}

// Function to check if at least one radio button is checked
function isRadioChecked() {
  const radioButtonError = document.querySelector('.span-select-error');
  let isAnyChecked = false;

  radioButton.forEach((radio) => {
    if (radio.checked) {
      isAnyChecked = true;
    }
  });

  if (!isAnyChecked) {
    radioButtonError.style.display = 'block';
    radioButtonError.innerHTML = 'Required';
    isValid = false;
  }
}

// Function to check if at least one checkbox is checked
function isCheckboxChecked() {
  const checkboxError = document.querySelectorAll('.span-select-error')[1];
  let isAnyChecked = false;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      isAnyChecked = true;
    }
  });

  if (!isAnyChecked) {
    checkboxError.style.display = 'block';
    checkboxError.innerHTML = 'Required';
    isValid = false;
  }
}

// Function to check if a value is selected in the dropdown
function isSelectboxSelected() {
  if (select.value == 0) {
    select.nextElementSibling.innerHTML = 'Required';
    select.nextElementSibling.style.display = 'block'
    isValid = false
  }
}

// Function to generate a random employee ID
function generateRandom() {
  const eIdRandom = Math.round(Math.random() * (10 - 1) + 1);
  eId.value = eIdRandom;
}

// Function to check the email domain and format
function checkEmail() {
  const mail = email.value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (mail !== '') {
    if (!mail.endsWith('@gmail.com') && !mail.endsWith('@yahoo.com')) {
      showError(email, 'Only @gmail.com or @yahoo.com are allowed');
    }

    if (!emailRegex.test(mail)) {
      showError(email, 'Invalid email format');
    }
  }
}

// Function to check if input matches allowed patterns
function checkAllowedInputs() {
  const alphaSpaces = /^[a-zA-Z\s][a-zA-Z\s]+$/;
  const numberHyphens = /^[0-9-]+$/;
  const numbersOnly = /^[0-9]+$/;
  const numbersDate = /^[0-9/]+$/;
  const alphaNumericSpacePeriods = /^[a-zA-Z,0-9.\s]+$/;
  const alphaSpaceCommaHyphenNumber = /^[a-zA-Z0-9\s,-]+$/;
  const alphaSpaceCommaHyphen = /^[a-zA-Z\s,-]+$/;

  isAllowed(fullName, alphaSpaces, 'Alphabets and Spaces Only');
  isAllowed(socialSecurityNumber, numberHyphens, 'Numbers and Hyphens Only');
  isAllowed(jobTitle, alphaSpaces, 'Alphabets and Spaces Only');
  isAllowed(phoneNumber, numbersOnly, 'Numbers Only');
  isAllowed(dateOfBirth, numbersDate, 'Numbers Only');
  isAllowed(hobbies, alphaSpaceCommaHyphen, 'Alphabets, Spaces, Commas, and Hyphens Only');
  isAllowed(notes, alphaNumericSpacePeriods, 'Alphanumeric Characters with Spaces, Commas, and Periods Only');
  isAllowed(address, alphaSpaceCommaHyphenNumber, 'Alphabets, Numbers, Spaces, Commas, and Hyphens Only');
}

// Function to check if input matches a specific pattern and display errors
function isAllowed(element, expression, message) {
  const elementValue = element.value.trim();

  if (!elementValue.match(expression) && elementValue !== '') {
    showError(element, message);
  }
}

// Function to check if the date of birth is valid
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function isDateValid() {
  const dateOfBirthValue = dateOfBirth.value;
  const dateParts = dateOfBirthValue.split('/');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const day = parseInt(dateParts[2], 10);
  const regexPattern = /^(?:\d{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/; // Date Pattern
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  if (!regexPattern.test(dateOfBirthValue)) {
    showError(dateOfBirth, 'Invalid format');
  } else if (month === 2) {
    const isLeap = isLeapYear(year);
    if ((isLeap && day > 29) || (!isLeap && day > 28)) {
      showError(dateOfBirth, 'Invalid date');
    }
  } else if ([4, 6, 9, 11].includes(month) && day > 30) {
    showError(dateOfBirth, 'Invalid date');
  } else if (age > 100 || age < 18) {
    showError(dateOfBirth, 'Age should be between 18 and 100');
  }
}

// Function to check salary input
function checkSalary() {
  const regEx = /^[0-9]*(\.[0-9]+)?$/;
  const isLengthValid = checkLength(salary, 3, 10);

  if (!isLengthValid) {
    checkLength(salary, 3, 10);
  } else if (parseFloat(salary.value) < 100 && isLengthValid) {
    showError(salary, 'Minimum amount should be 100');
  }
  if (!regEx.test(salary.value)) {
    showError(salary, 'Please Enter a Valid Number');
  } else {
    return true;
  }
}

// Function to check if input starts or ends with symbols
function checkStartEnd() {
  const inputFields = [socialSecurityNumber, address, jobTitle, hobbies, notes];

  inputFields.forEach((field) => {
    const fieldValue = field.value.trim();

    if (fieldValue !== '') {
      if (fieldValue.startsWith('-') || fieldValue.startsWith(',') ||
        fieldValue.endsWith('-') || fieldValue.endsWith(',')) {
        showError(field, 'Input cannot start or end with symbols');
      }
    }
  });
}

// Function to check for repeating symbols
function checkRepeatingSymbols() {
  const inputFields = [socialSecurityNumber, address, jobTitle, hobbies, notes];
  const repeatingSymbolsRegex = /(--|\s\s|\.\.|,,)/;

  inputFields.forEach((field) => {
    const fieldValue = field.value.trim();

    if (fieldValue !== '' && repeatingSymbolsRegex.test(fieldValue)) {
      showError(field, 'Repeating Symbols');
    }
  });
}

// Function to limit the input field
function handleMaxInput(element, value) {
  element.addEventListener('input', (e) => {
    if (element === salary && element.value.length >= value) {
      element.value = element.value.slice(0, value);
    } else if (element !== salary && element.value.length > value) {
      element.value = element.value.slice(0, value);
    }
  });
}

function callLengthHandler() {
  handleMaxInput(fullName, 20);
  handleMaxInput(socialSecurityNumber, 9);
  handleMaxInput(phoneNumber, 10);
  handleMaxInput(email, 50);
  handleMaxInput(jobTitle, 50);
  handleMaxInput(salary, 10);
  handleMaxInput(hobbies, 25);
  handleMaxInput(address, 100);
}


// Display errors
function showError(field, message) {
  field.nextElementSibling.style.display = 'block';
  field.nextElementSibling.innerHTML = message;
  field.style.backgroundColor = '#FF000015';
  isValid = false;
  return false
}

function save() {

  const selectedRadioButton = document.querySelector('input[type="radio"]:checked');
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      data[i] = checkboxes[i].value;
    }
  }
  const resultCheckbox = data.join(' ');

  if (!displayed) {

    var savedData = {
      fullName: fullName.value,
      gender: selectedRadioButton.value,
      dateOfBirth: dateOfBirth.value,
      socialSecurityNumber: socialSecurityNumber.value,
      address: address.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      contact: resultCheckbox,
      eId: eId.value,
      jobTitle: jobTitle.value,
      department: select.value,
      salary: salary.value,
      hobbies: hobbies.value,
      notes: notes.value
    }
    objArray.push(savedData);
    display();
  }
}

function display(resultCheckbox) {
  if (displayed === false) {

    dataDisplay.style.display = 'block'

    for (const key of objArray) {
      document.querySelector('#fullNameData').innerHTML = key.fullName;
      document.querySelector('#genderData').innerHTML = key.gender;
      document.querySelector('#dateOfBirthData').innerHTML = key.dateOfBirth;
      document.querySelector('#socialSecurityNumberData').innerHTML = key.socialSecurityNumber;
      document.querySelector('#addressData').innerHTML = key.address;
      document.querySelector('#phoneData').innerHTML = key.phoneNumber;
      document.querySelector('#emailData').innerHTML = key.email;
      document.querySelector('#contactMethodData').innerHTML = key.contact;
      document.querySelector('#eIdData').innerHTML = key.eId;
      document.querySelector('#jobTitleData').innerHTML = key.jobTitle;
      document.querySelector('#departmentData').innerHTML = key.department;
      document.querySelector('#salaryData').innerHTML = key.salary;
      document.querySelector('#hobbiesData').innerHTML = key.hobbies;
      document.querySelector('#notesData').innerHTML = key.notes;
    }
    displayed = true;
  } else {
    alert('Invalid Action');
  }
}