// Selecting form input elements
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
const fields = [fullName, dateOfBirth, email, socialSecurityNumber, address, phoneNumber, jobTitle, salary, hobbies, notes];
let isValid = true;

generateRandom();
callLengthHandler();


addEventListener('focusin', clearOnClick);
addEventListener('beforeinput', clearOnClick);


// Add a submit event listener to the form
document.addEventListener('submit', (e) => {
  if (!validate()) {
    e.preventDefault();
    return false;
  } else {
    return true;
  }


});

// Function to clear validation errors
function clearOnClick() {
  fields.forEach((field) => {
    field.nextElementSibling.style.display = 'none';
    field.style.backgroundColor = '#fff';
  });

  const selectErrors = document.querySelectorAll('.span-select-error');
  selectErrors.forEach((error) => {
    error.style.display = 'none';
  });
}

// Function to reset all form fields
function resetField() {
  clearOnClick();

  fields.forEach((field) => {
    field.value = '';
  });

  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  radios.forEach((radio) => {
    radio.checked = false;
  });

  select.selectedIndex = 0;
  isValid = true;
}

// Function to validate the entire form
function validate() {
  isValid = true;

  checkDomain();
  isRadioChecked();
  isSelectboxSelected();
  checkStartEnd();
  salToDecimal();
  isLength();
  checkSalary();
  isCheckboxChecked();
  isDateValid();
  checkRepeatingSymbols();
  checkAllowedInputs();
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
  isEmpty(salary)
}

// Function to convert salary to decimal format
function salToDecimal() {
  const salaryValue = salary.value.trim();
  const salaryFormat = /^\d{1,10}(\.\d{0,2})?$/;

  salary.nextElementSibling.style.display = 'none';

  if (salaryValue !== '') {
    if (!salaryFormat.test(salaryValue)) {
      salary.style.backgroundColor = '#ff000015';
      salary.nextElementSibling.innerHTML = 'Please Enter a Valid Number';
      isValid = false;
    } else {
      salary.style.backgroundColor = '#fff'
      salary.nextElementSibling.style.display = 'none';
      salary.nextElementSibling.innerHTML = '';
    }
  }
  checkSalary();
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
    field.nextElementSibling.style.display = 'block';
    field.nextElementSibling.innerHTML = 'Required';
    field.style.backgroundColor = '#FF000015';
    isValid = false;
  }
}

// Function to check field length and display errors
function checkLength(field, min, max) {
  let value = field.value.trim();
  let inputLength = value.length;

  if (inputLength < min && inputLength !== 0) {
    field.nextElementSibling.style.display = 'block';
    field.nextElementSibling.innerHTML = `Minimum length is ${min}`;
    field.style.backgroundColor = '#FF000015';
    isValid = false;
  }

  if (inputLength > max) {
    field.nextElementSibling.style.display = 'block';
    field.nextElementSibling.innerHTML = `Maximum length is ${max}`;
    field.style.backgroundColor = '#FF000015';
    isValid = false;
  }
}

// Function to check if at least one radio button is checked
function isRadioChecked() {
  const errorSpan = document.querySelector('.span-select-error');
  let isAnyChecked = false;

  radios.forEach((radio) => {
    if (radio.checked) {
      isAnyChecked = true;
    }
  });

  if (!isAnyChecked) {
    errorSpan.style.display = 'block';
    errorSpan.textContent = 'Required';
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
    checkboxError.textContent = 'Required';
    isValid = false;
  }
}

// Function to check if a value is selected in the dropdown
function isSelectboxSelected() {
  if (select.value == 0) {
    select.nextElementSibling.style.display = 'inherit';
    select.nextElementSibling.innerHTML = 'Required';
    isValid = false;
  }
}

// Function to generate a random employee ID
function generateRandom() {
  const eIdRandom = Math.round(Math.random() * (10 - 1) + 1);
  eId.value = eIdRandom;
}

// Function to check the email domain and format
function checkDomain() {
  const mail = email.value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (mail !== '') {
    if (!mail.endsWith('@gmail.com') && !mail.endsWith('@yahoo.com')) {
      email.nextElementSibling.style.display = 'block';
      email.nextElementSibling.innerHTML = 'Only @gmail.com or @yahoo.com are allowed';
      email.style.backgroundColor = '#FF000015';
      isValid = false;
    }

    if (!emailRegex.test(mail)) {
      email.nextElementSibling.style.display = 'block';
      email.nextElementSibling.innerHTML = 'Invalid email format';
      email.style.backgroundColor = '#FF000015';
      isValid = false;
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
  isAllowed(hobbies, alphaSpaceCommaHyphen, 'Alphabets, Spaces, Commas and Hyphens Only');
  isAllowed(notes, alphaNumericSpacePeriods, 'Alphanumeric Characters with Spaces, Commas, and Periods Only');
  isAllowed(address, alphaSpaceCommaHyphenNumber, 'Alphabets, Numbers, Spaces, Commas, and Hyphens Only');
}

// Function to check if input matches a specific pattern and display errors
function isAllowed(element, expression, message) {
  let elements = element.value.trim();
  if (!elements.match(expression) && elements !== '') {
    element.nextElementSibling.style.display = 'block';
    element.nextElementSibling.innerHTML = message;
    element.style.backgroundColor = '#FF000015';
    isValid = false;
  }
}

// Function to check if the date of birth is valid
function isDateValid() {
  const birth = new Date(dateOfBirth.value);
  const birthYear = birth.getFullYear();
  const current = new Date();
  const currentYear = current.getFullYear();
  const age = currentYear - birthYear;

  if (dateOfBirth.value !== '') {
    if (age > 100 || age < 18 || isNaN(age) || !dateFormat(dateOfBirth.value) || dateOfBirth.value.includes('0000')) {
      dateOfBirth.nextElementSibling.style.display = 'block';
      dateOfBirth.nextElementSibling.innerHTML = 'Age should be between 18 and 100';
      dateOfBirth.style.backgroundColor = '#FF000015';
      isValid = false;
    }
    if (!dateFormat(dateOfBirth.value)) {
      dateOfBirth.nextElementSibling.style.display = 'block';
      dateOfBirth.nextElementSibling.innerHTML = 'Invalid format';
      dateOfBirth.style.backgroundColor = '#FF000015';
      isValid = false;
    }
  }
}

// Function to check if date follows a specific format
function dateFormat(dateString) {
  const datePattern = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
  return datePattern.test(dateString);
}

// Function to check salary input
function checkSalary() {
  const regEx = /^[0-9.]*$/;

  if (salary.value !== '') {
    if (salary.value.length < 3 || salary.value.length > 10 || !regEx.test(salary.value) || salary.value < 100) {

      salary.style.backgroundColor = '#FF000015';


      if (salary.value.length < 3) {
        salary.nextElementSibling.style.display = 'block';
        salary.nextElementSibling.innerHTML = 'Minimum Length is 3';
      } else if (salary.value.length > 10) {
        salary.nextElementSibling.style.display = 'block';
        salary.nextElementSibling.innerHTML = 'Maximum Length is 10';
      } else if (!regEx.test(salary.value)) {
        salary.nextElementSibling.style.display = 'block';
        salary.nextElementSibling.innerHTML = 'Please Enter a Valid Number';
      } else if (salary.value < 100) {
        salary.nextElementSibling.style.display = 'block';
        salary.nextElementSibling.innerHTML = 'Minimum amount should be 100';
      }
      isValid = false;
    }
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
        field.nextElementSibling.style.display = 'block';
        field.nextElementSibling.innerHTML = 'Input cannot start or end with symbols';
        field.style.backgroundColor = '#FF000015';
        isValid = false;
      }
    }
  });
}

// Function to check for repeating symbols
function checkRepeatingSymbols() {
  const inputFields = [socialSecurityNumber, address, jobTitle, hobbies, notes];

  inputFields.forEach((field) => {
    const fieldValue = field.value.trim();

    if (fieldValue !== '') {
      if (fieldValue.includes('--') || fieldValue.includes('  ') ||
        fieldValue.includes('..') || fieldValue.includes(',,')) {
        field.nextElementSibling.style.display = 'block';
        field.nextElementSibling.innerHTML = 'Repeating symbols';
        field.style.backgroundColor = '#FF000015';
        isValid = false;
      }
    }
  });
}
//function to limit the input field
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