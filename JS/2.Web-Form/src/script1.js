/* eslint-disable func-style */
const fullNameField = document.querySelector('#fName');
const genderRadios = document.querySelectorAll('input[name="gender"]');
const dateOfBirthField = document.querySelector('#dateOfBirth');
const socialSecurityNumberField = document.querySelector('#socialSecurityNumber');
const addressField = document.querySelector('#address');
const phoneNumberField = document.querySelector('#phone');
const emailField = document.querySelector('#mail');
const contactCheckboxes = document.querySelectorAll('.contacts');
const employeeIdField = document.querySelector('#eId');
const jobTitleField = document.querySelector('#jobTitle');
const salaryField = document.querySelector('#salary');
const hobbiesField = document.querySelector('#hobbies');
const notesField = document.querySelector('#notes');
const departmentSelect = document.querySelector('#dept');
const formFields = [fullNameField, socialSecurityNumberField, dateOfBirthField, addressField, phoneNumberField, jobTitleField, salaryField, hobbiesField, notesField];
let isFormValid = true;
const salaryParts = [2];

generateRandomEmployeeId();

function enableLiveValidation() {
  // Add input event listeners to form fields for live error checking
  formFields.forEach(field => {
    field.addEventListener('input', () => {
      validateFieldLengths();
      validateAllowedInputs();
      validateRepeatingSymbols();
    });
  });
}

// Event listener for form submission
document.addEventListener('submit', (e) => {
  validateForm();
  if (!isFormValid) {
    e.preventDefault();
    return false;
  }
});

// Function to handle successful form submission
function handleFormSubmissionSuccess() {
  alert('SUCCESS');
}

// Function to clear error messages and field backgrounds on click
function clearErrorsOnClick() {
  // Clear error messages and field backgrounds
  for (let i = 0; i < 10; i++) {
    document.querySelectorAll('.span-error')[i].style.display = 'none';
    document.querySelectorAll('.field')[i].style.backgroundColor = '#fff';
  }

  for (let i = 0; i < 3; i++) {
    document.querySelectorAll('.span-select-error')[i].style.display = 'none';
  }
}

// Function to clear the salary field
function clearSalaryField() {
  salaryField.value = '';
}

// Function to reset all form fields except Employee ID
function resetFormFields() {
  clearErrorsOnClick();

  for (let i = 0; i < 10; i++) {
    document.querySelectorAll('.field')[i].value = null;
  }
  contactCheckboxes.forEach(function (checkbox) {
    checkbox.checked = false;
  });

  genderRadios.forEach(function (radio) {
    radio.checked = false;
  });

  departmentSelect.selectedIndex = 0;
}

// Initialize live error checking
enableLiveValidation();

// Function to validate the entire form
function validateForm() {
  validateEmailDomain();
  validateFieldLengths();
  validateCheckboxChecked();
  validateDateOfBirth();
  validateRadioChecked();
  validateDepartmentSelected();
  validateRequiredFields();
  validateSalary();
  validateAllowedInputs();
  validateStartAndEndCharacters();
}

// Function to check if required fields are empty
function validateRequiredFields() {
  isFieldEmpty(fullNameField);
  isFieldEmpty(dateOfBirthField);
  isFieldEmpty(socialSecurityNumberField);
  isFieldEmpty(addressField);
  isFieldEmpty(phoneNumberField);
  isFieldEmpty(emailField);
  isFieldEmpty(jobTitleField);
  isFieldEmpty(salaryField);
  isFieldEmpty(hobbiesField);
}

// Function to format salary as decimal
function formatSalaryAsDecimal() {
  const numbersOnlyPattern = /^[0-9]*$/;
  const salaryPartsToJoin = [1, 2];

  salaryParts[0] = salaryField.value;
  salaryParts[1] = salaryField.value;
  salaryParts[2] = '00';

  if (salaryField.value !== '' && salaryField.value.match(numbersOnlyPattern) && salaryField.value.length <= 10) {
    salaryField.value = salaryPartsToJoin.map(index => salaryParts[index]).join('.');
  }
}

// Function to validate field lengths
function validateFieldLengths() {
  validateLength(fullNameField, 3, 20); //(element, minimum length, maximum length)
  validateLength(socialSecurityNumberField, 7, 9);
  validateLength(phoneNumberField, 7, 10);
  validateLength(emailField, 0, 50);
  validateLength(jobTitleField, 3, 50);
  validateLength(salaryField, 3, 10);
  validateLength(hobbiesField, 3, 25);
}

// Function to check if a field is empty and display an error if it is
function isFieldEmpty(field) {
  const trimmedValue = field.value.trim();

  if (trimmedValue === '') {
    field.nextElementSibling.style.display = 'block';
    field.nextElementSibling.innerHTML = 'Required';
    field.style.backgroundColor = '#FF000015';
    isFormValid = false;
  } else {
    field.nextElementSibling.style.display = 'none';
    field.style.backgroundColor = '#fff';
  }
}

// Function to validate field length constraints
function validateLength(field, minLength, maxLength) {
  let fieldValue = field.value.trim()
  let inputLength = fieldValue.length;

  if (field === salaryParts) {
    inputLength = salaryParts[0].length;
  }

  if (inputLength < minLength && inputLength !== 0) {
    field.nextElementSibling.style.display = 'block';
    field.nextElementSibling.innerHTML = `Minimum length is ${minLength}`;
    isFormValid = false;
    field.style.backgroundColor = '#FF000015';
  } else if (inputLength > maxLength) {
    field.nextElementSibling.style.display = 'block';
    field.nextElementSibling.innerHTML = `Maximum length is ${maxLength}`;
    field.style.backgroundColor = '#FF000015';
    isFormValid = false;
  } else {
    field.nextElementSibling.style.display = 'none';
    field.nextElementSibling.innerHTML = '';
    field.style.backgroundColor = '#fff';
    isFormValid = true;
  }
}

// Function to validate if a radio button is checked
function validateRadioChecked() {

  const errorSpan = document.querySelectorAll('.span-select-error')[0];
  let isAnyChecked = false;

  genderRadios.forEach((radio) => {
    if (radio.checked) {
      isAnyChecked = true;
    }
  });

  if (!isAnyChecked) {
    errorSpan.style.display = 'block';
    errorSpan.textContent = 'Required';
    isFormValid = false;
  } else {
    errorSpan.style.display = 'none';
    errorSpan.nextElementSibling.innerHTML = '';
    isFormValid = true;
  }
}

// Function to validate if at least one checkbox is checked
function validateCheckboxChecked() {
  const checkboxError = document.querySelectorAll('.span-select-error')[1];
  let isAnyChecked = false;

  contactCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      isAnyChecked = true;
    }
  });

  if (!isAnyChecked) {
    checkboxError.style.display = 'block';
    checkboxError.innerHTML = 'Required';
    isFormValid = false;
  } else {
    checkboxError.style.display = 'none';
    checkboxError.nextElementSibling.innerHTML = '';
    isFormValid = true;
  }
}

// Function to validate if a department is selected in the dropdown
function validateDepartmentSelected() {

  if (departmentSelect.value == 0) {
    departmentSelect.nextElementSibling.style.display = 'inherit';
    departmentSelect.nextElementSibling.innerHTML = 'Required';
    isFormValid = false;
  } else {
    departmentSelect.nextElementSibling.style.display = 'none';
    departmentSelect.nextElementSibling.innerHTML = '';
    isFormValid = true;
  }
}

// Function to generate a random employee ID
function generateRandomEmployeeId() {
  const randomEmployeeId = Math.round(Math.random() * (10 - 1) + 1);
  employeeIdField.value = randomEmployeeId;
}

// Function to validate email domain and format
function validateEmailDomain() {
  const emailValue = emailField.value.trim();
  const Regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!Regex.test(emailValue)) {
    emailField.nextElementSibling.style.display = 'block';
    emailField.nextElementSibling.innerHTML = 'Invalid email address';
    emailField.style.backgroundColor = '#FF000015';
    isFormValid = false;

    if (!emailValue.endsWith('@gmail.com') && !emailValue.endsWith('@yahoo.com')) {
      emailField.nextElementSibling.style.display = 'block';
      emailField.nextElementSibling.innerHTML = 'Only @gmail.com or @yahoo.com are allowed';
      emailField.style.backgroundColor = '#FF000015';
      isFormValid = false;
    }

  } else {
    emailField.nextElementSibling.style.display = 'none';
    emailField.style.backgroundColor = '#fff';
    emailField.nextElementSibling.innerHTML = '';

    isFormValid = true;
  }
}

// Function to validate allowed input characters for various fields
function validateAllowedInputs() {
  const alphaSpacesPattern = /^[a-zA-Z\s][a-zA-Z\s]*$/;
  const numberHyphensPattern = /^[0-9-]+$/;
  const numbersOnlyPattern = /^[0-9]*$/;
  const numbersDatePattern = /^[0-9/]*$/;
  const alphaNumericSpacePeriodsPattern = /^[a-zA-Z,.\s]*$/;
  const alphaSpaceCommaHyphenNumberPattern = /^[a-zA-Z\s,-0-9]*$/;
  const alphaSpaceCommaHyphenPattern = /^[a-zA-Z\s,-]*$/;
  const alphaSpacesErrorMessage = 'Alphabets and Spaces Only';
  const numberHyphensErrorMessage = 'Numbers and Hyphens Only';
  const numbersOnlyErrorMessage = 'Numbers Only';
  const alphaNumericSpacePeriodsErrorMessage = 'Alphanumeric Characters with Spaces, Commas, and Periods Only';
  const alphaSpaceCommaHyphenErrorMessage = 'Alphabets, Spaces, Commas, and Hyphens Only';

  isInputAllowed(fullNameField, alphaSpacesPattern, alphaSpacesErrorMessage);
  isInputAllowed(jobTitleField, alphaSpacesPattern, alphaSpacesErrorMessage);
  isInputAllowed(socialSecurityNumberField, numberHyphensPattern, numberHyphensErrorMessage);
  isInputAllowed(phoneNumberField, numbersOnlyPattern, numbersOnlyErrorMessage);
  isInputAllowed(dateOfBirthField, numbersDatePattern, numbersOnlyErrorMessage);
  isInputAllowed(hobbiesField, alphaSpaceCommaHyphenPattern, alphaSpaceCommaHyphenErrorMessage);
  isInputAllowed(notesField, alphaNumericSpacePeriodsPattern, alphaNumericSpacePeriodsErrorMessage);
  isInputAllowed(addressField, alphaSpaceCommaHyphenNumberPattern, alphaSpaceCommaHyphenErrorMessage);
}

// Function to check if input matches allowed characters and display error messages
function isInputAllowed(field, pattern, errorMessage) {
  let fieldValue = field.value.trim();
  if (!fieldValue.match(pattern) && fieldValue !== '') {
    field.nextElementSibling.style.display = 'block';
    field.nextElementSibling.innerHTML = errorMessage;
    field.style.backgroundColor = '#FF000015';
    isFormValid = false;
  } else {
    // field.nextElementSibling.style.display = 'none';
    // field.style.backgroundColor = '#fff';
    // field.nextElementSibling.innerHTML = '';
    // isFormValid = true;
  }
}

// Function to validate the date of birth and age
function validateDateOfBirth() {
  const birthDate = new Date(dateOfBirthField.value);
  const birthYear = birthDate.getFullYear();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const age = currentYear - birthYear;

  if (age > 100 || age < 18 || isNaN(age)) {
    dateOfBirthField.nextElementSibling.style.display = 'block';
    dateOfBirthField.nextElementSibling.innerHTML = 'Age should be between 18 and 100';
    dateOfBirthField.style.backgroundColor = '#FF000015';
    isFormValid = false;
  }

  if (!isValidDateFormat(dateOfBirthField.value) || dateOfBirthField.value.includes('0000')) {
    dateOfBirthField.nextElementSibling.innerHTML = 'Invalid';
    dateOfBirthField.nextElementSibling.style.display = 'block';
    dateOfBirthField.style.backgroundColor = '#FF000015';
    return false;
  }
}

// Function to validate date format (YYYY/MM/DD)
function isValidDateFormat(dateString) {
  const datePattern = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
  return datePattern.test(dateString);
}

// Function to validate salary constraints
function validateSalary() {
  const numericDotPattern = /^[0-9.]*$/;
  let salaryValue = salaryParts[0];

  salaryField.nextElementSibling.style.display = 'block';

  if (!salaryParts[0].length == '') {
    if (salaryParts[0].length < 3) {
      salaryField.nextElementSibling.innerHTML = 'Minimum Length is 3';
      salaryField.style.backgroundColor = '#FF000015';
    }
    if (salaryParts[0].length > 10) {
      salaryField.nextElementSibling.innerHTML = 'Maximum Length is 10';
      salaryField.style.backgroundColor = '#FF000015';
    }

    if (!numericDotPattern.test(salaryValue)) {
      salaryField.nextElementSibling.innerHTML = 'Numbers Only';
      salaryField.style.backgroundColor = '#FF000015';
    }

    if (parseInt(salaryValue) < 100) {
      salaryField.nextElementSibling.innerHTML = 'Minimum amount should be 100';
    }

    if (salaryParts[0].includes('.')) {
      // Handle decimal part if needed
    }
  }
}

// Function to check for invalid characters at the start or end of certain fields
function validateStartAndEndCharacters() {
  const fieldsToCheck = [socialSecurityNumberField, addressField, jobTitleField, hobbiesField, notesField];
  for (let i = 0; i < 5; i++) {
    const fieldValue = fieldsToCheck[i].value.trim();
    if (fieldValue !== '') {
      if (fieldValue.startsWith('-') || fieldValue.startsWith(',') ||
        fieldValue.endsWith('-') || fieldValue.endsWith(',')) {
        fieldsToCheck[i].nextElementSibling.style.display = 'block';
        fieldsToCheck[i].nextElementSibling.innerHTML = 'Invalid';
        fieldsToCheck[i].style.backgroundColor = '#FF000015';
        isFormValid = false;
      }
    }
  }
}

// Function to check for repeating symbols in certain fields
function validateRepeatingSymbols() {
  const fieldsToCheck = [socialSecurityNumberField, addressField, jobTitleField, hobbiesField, notesField];
  for (let i = 0; i < 5; i++) {
    fieldsToCheck[i].nextElementSibling.style.display = 'block';

    const fieldValue = fieldsToCheck[i].value.trim();
    if (fieldValue !== '') {
      if (fieldValue.includes('--') || fieldValue.includes('  ') ||
        fieldValue.includes('..') || fieldValue.includes(',,')) {
        fieldsToCheck[i].nextElementSibling.innerHTML = 'Invalid';
        fieldsToCheck[i].style.backgroundColor = '#FF000015';
        isFormValid = false;
      } else {
        fieldsToCheck[i].nextElementSibling.style.display = 'none'
        fieldsToCheck[i].style.backgroundColor = '#fff'
        isFormValid = true;
      }
    }
  }
}

// Rest of the code...
