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
const fields = [fullName, dateOfBirth, socialSecurityNumber, address, phoneNumber, jobTitle, salary, hobbies, notes];
let isValid = true;
const salaryInteger = [2];

generateRandom();

document.addEventListener('submit', (e) => {
  validate();
  if (isValid === false) {
    validate();
    e.preventDefault();
    return false;
  } else {
    return true;
  }
});

addEventListener('focusin', clearOnClick)
addEventListener('beforeinput', clearOnClick)

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
  isLength();
  checkDomain();
  isCheckboxChecked();
  isDateValid();
  isRadioChecked();
  isSelectboxSelected();
  checkRepeatingSymbols();
  checkAllowedInputs();
  checkSalary();
  checkStartEnd();
  isRequired();
}

function isRequired() {
  isEmpty(fullName);
  isEmpty(dateOfBirth);
  isEmpty(socialSecurityNumber);
  isEmpty(address);
  isEmpty(phoneNumber);
  isEmpty(email);
  isEmpty(jobTitle);
  isEmpty(salary);
  isEmpty(hobbies);
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
  checkLength(fullName, 3, 20);
  checkLength(socialSecurityNumber, 7, 9);
  checkLength(phoneNumber, 7, 10);
  checkLength(email, 0, 50);
  checkLength(jobTitle, 3, 50);
  checkLength(salary, 3, 10);
  checkLength(hobbies, 3, 25);
}

function isEmpty(fields) {
  const x = fields.value.trim();

  if (x == '') {
    fields.nextElementSibling.style.display = 'block';
    fields.nextElementSibling.innerHTML = 'Required';
    fields.style.backgroundColor = '#FF000015';
    isValid = false;
  }
}

function checkLength(fields, min, max) {
  let field = fields.value.trim()
  let inputLength = field.length;

  if (fields == salaryInteger) {
    inputLength = salaryInteger[0].length;
  }

  if (inputLength < min && inputLength != 0) {
    fields.nextElementSibling.style.display = 'block';
    fields.nextElementSibling.innerHTML = `Minimum length is ${min}`;
    isValid = false;
    fields.style.backgroundColor = '#FF000015';
  }
  if (inputLength > max) {
    fields.nextElementSibling.style.display = 'block';
    fields.nextElementSibling.innerHTML = `Maximum length is ${max}`;
    fields.style.backgroundColor = '#FF000015';
    isValid = false;
  }
}

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

function isCheckboxChecked() {
  const checkboxError = document.querySelectorAll('.span-select-error')[1];
  let isAnyChecked = false;

  checkboxes.forEach(function (checkbox) {
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

function isSelectboxSelected() {
  if (select.value == 0) {
    select.nextElementSibling.style.display = 'inherit';
    select.nextElementSibling.innerHTML = 'Required';
    isValid = false;
  }
}

function generateRandom() {
  const eIdRandom = Math.round(Math.random() * (10 - 1) + 1);
  eId.value = eIdRandom;
}

function checkDomain() {
  const mail = email.value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

function checkAllowedInputs() {
  const alphaSpaces = /^[a-zA-Z\s][a-zA-Z\s]+$/;
  const numberHyphens = /^[0-9-]+$/;
  const numbersOnly = /^[0-9]+$/;
  const numbersDate = /^[0-9/]+$/;
  const alphaNumericSpacePeriods = /^[a-zA-Z,0-9.\s]+$/;
  const alphaSpaceCommaHyphenNumber = /^[a-zA-Z0-9\s,-]+$/;
  const alphaSpaceCommaHyphen = /^[a-zA-Z\s,-]+$/;
  const alphaSpacesError = 'Alphabets and Spaces Only';
  const numberHyphensError = 'Numbers and Hyphens Only';
  const numbersOnlyError = 'Numbers Only';
  const alphaNumericSpacePeriodsError = 'Alphanumeric Characters with Spaces, Commas and Periods Only';
  const alphaSpaceCommaHyphenError = 'Alphabets, Spaces, Commas and Hyphens Only';
  const alphaSpaceCommaHyphennumberError = 'Alphabets, Numbers, Spaces, Commas and Hyphens Only';

  isAllowed(fullName, alphaSpaces, alphaSpacesError);
  isAllowed(socialSecurityNumber, numberHyphens, numberHyphensError);
  isAllowed(jobTitle, alphaSpaces, alphaSpacesError);
  isAllowed(phoneNumber, numbersOnly, numbersOnlyError);
  isAllowed(dateOfBirth, numbersDate, numbersOnlyError);
  isAllowed(hobbies, alphaSpaceCommaHyphen, alphaSpaceCommaHyphenError);
  isAllowed(notes, alphaNumericSpacePeriods, alphaNumericSpacePeriodsError);
  isAllowed(address, alphaSpaceCommaHyphenNumber, alphaSpaceCommaHyphennumberError);
}

function isAllowed(element, expression, message) {
  let elements = element.value.trim();
  if (!elements.match(expression) && element.value != '') {
    console.log('pressed')
    element.nextElementSibling.style.display = 'block';
    element.nextElementSibling.innerHTML = message;
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
    dateOfBirth.nextElementSibling.style.display = 'block';
    dateOfBirth.nextElementSibling.innerHTML = 'Age should be between 18 and 100';
    dateOfBirth.style.backgroundColor = '#FF000015';
    isValid = false;
  }

  if (!dateFormat(dateOfBirth.value) || dateOfBirth.value.includes('0000')) {
    dateOfBirth.nextElementSibling.innerHTML = 'Invalid';
    dateOfBirth.nextElementSibling.style.display = 'block';
    dateOfBirth.style.backgroundColor = '#FF000015';
    return false;
  }
}

function dateFormat(dateString) {
  const datePattern = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
  return datePattern.test(dateString);
}

function checkSalary() {
  const regEx = /^[0-9.]*$/;
  let sal = salaryInteger[0]

  salary.nextElementSibling.style.display = 'block';

  if (!salaryInteger[0].length == 0) {
    if (salaryInteger[0].length < 3) {
      salary.nextElementSibling.innerHTML = 'Minimum Length is 3';
      salary.style.backgroundColor = '#FF000015';
      return false;
    }
    if (salaryInteger[0].length > 10) {
      salary.nextElementSibling.innerHTML = 'Maximum Length is 10';
      salary.style.backgroundColor = '#FF000015';
      return false;
    }

    if (!regEx.test(sal)) {
      salary.nextElementSibling.innerHTML = 'Numbers Only';
      salary.style.backgroundColor = '#FF000015';
      return false;
    }

    if (parseInt(sal) < 100) {
      salary.nextElementSibling.innerHTML = 'Minimum amount should be 100';
      return false;
    }

    if (salaryInteger[0].includes('.')) {
      salary.nextElementSibling.innerHTML = 'Numbers Only';
      return false;
    }
  }
}

function checkStartEnd() {
  const inputFields = [socialSecurityNumber, address, jobTitle, hobbies, notes];
  for (let i = 0; i < 5; i++) {
    const fieldValue = inputFields[i].value.trim();
    if (fieldValue !== '') {
      if (fieldValue.startsWith('-') || fieldValue.startsWith(',') ||
        fieldValue.endsWith('-') || fieldValue.endsWith(',')) {
        inputFields[i].nextElementSibling.style.display = 'block';
        inputFields[i].nextElementSibling.innerHTML = 'Input cannot start or end with symbols';
        inputFields[i].style.backgroundColor = '#FF000015';
        isValid = false;
      }
    }
  }
}

function checkRepeatingSymbols() {
  const inputFields = [socialSecurityNumber, address, jobTitle, hobbies, notes];
  for (let i = 0; i < 5; i++) {
    const fieldValue = inputFields[i].value.trim();
    if (fieldValue !== '') {
      if (fieldValue.includes('--') || fieldValue.includes('  ') ||
        fieldValue.includes('..') || fieldValue.includes(',,')) {
        inputFields[i].nextElementSibling.style.display = 'block';
        inputFields[i].nextElementSibling.innerHTML = 'Repeating symbols';
        inputFields[i].style.backgroundColor = '#FF000015';
        isValid = false;
        return;
      }
    }
  }
}