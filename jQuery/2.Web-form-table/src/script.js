// Array to store employee data
let employeeList = [];
const tableBody = $('.table-display-data');
let isCurrentlyEditing = false;

generateRandomEmployeeId();

// Handle form submission
$('#webForm').submit(function (e) {
    if (!$('#webForm').valid()) {
        return false
    } else {
        e.preventDefault();
        $.validator.methods.convertSalaryToDecimal.call(this);
        saveEmployee();
        isCurrentlyEditing = false
    }
});

// Form validation rules and messages
$('#webForm').validate({

    rules: {
        name: {
            required: true,
            pattern: /^[a-zA-Z\s]*$/,
            minlength: 3,
            maxlength: 20
        },
        gender: {
            required: true
        },
        dob: {
            required: true,
            isValidDate: true,
            isAgeValid: true
        },
        socialSecurityNumber: {
            required: true,
            pattern: /^[0-9-]*$/,
            minlength: 7,
            maxlength: 9,
            isValidFormat: true
        },
        address: {
            required: true,
            pattern: /^[a-zA-Z0-9\s,-]*$/
        },
        phone: {
            required: true,
            pattern: /^[0-9]*$/,
            minlength: 7,
            maxlength: 10
        },
        email: {
            required: true,
            email: true,
            pattern: /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/i,
            maxlength: 50
        },
        'contacts[]': {
            required: true
        },
        department: {
            required: true,
        },
        jobTitle: {
            required: true,
            pattern: /^[a-zA-Z\s,]*$/,
            minlength: 3,
            maxlength: 25
        },
        salary: {
            required: true,
            number: true,
            minlength: 3,
            maxlength: 10,
            convertSalaryToDecimal: true
        },
        hobbies: {
            required: true,
            pattern: /^[a-zA-Z\s,-]*$/,

            minlength: 3,
            maxlength: 25
        },
        notes: {
            pattern: /^[a-zA-Z0-9\s,.]*$/
        }
    },
    messages: {
        name: {
            minlength: 'Name should be at least 3 characters long.',
            maxlength: 'Cannot exceed 20 characters.',
            pattern: 'Alphabets and spaces only.'
        },
        gender: {
            required: 'Please select a gender.'
        },
        dob: {
            date: 'Please enter a valid date of birth (YYYY/MM/DD).',
            isValidDate: 'Invalid Date',
            isAgeValid: 'Age should be between 18 and 100'
        },
        socialSecurityNumber: {
            minlength: 'This field should be at least 7 characters long.',
            maxlength: 'Cannot exceed 9 characters',
            pattern: 'Numbers and hyphens only'
        },
        address: {
            pattern: 'Alphanumeric characters with spaces, commas and hyphens only.',
        },
        phone: {
            minlength: 'Phone number should be at least 7 digits.',
            maxlength: 'Cannot exceed 10 characters',
            pattern: 'Numbers only'
        },
        email: {
            email: 'Please enter a valid email address.',
            pattern: 'Should accept gmail.com and yahoo.com only',
            maxlength: 'Cannot exceed 50 characters .'
        },
        'contacts[]': {
            required: 'Select at least one method.'
        },
        department: {
            required: 'Please select a department.'
        },
        jobTitle: {
            minlength: 'This field should be 3 characters long',
            maxlength: 'Cannot exceed 50 characters .',
            pattern: 'Alphabets, spaces and commas only '
        },
        hobbies: {
            minlength: 'This field should be 3 characters long',
            maxlength: 'Cannot exceed 25 characters .',
            pattern: 'Alphabets with commas and hyphens only'
        },
        notes: {
            pattern: 'Alphanumeric characters with spaces, commas and dots only'
        },
        salary: {
            minlength: 'Salary should be at least 3 characters long.',
            maxlength: 'Cannot exceed 10 characters.',
            salToDecimal: 'Invalid salary format.'
        }
    },

    // error spans for non-text fields
    errorElement: 'span',
    errorPlacement: function (error, element) {
        if (element.attr('name') === 'gender') {
            error.insertAfter(element.closest('.gender-container'));
        } else if (element.attr('name') === 'contacts[]') {
            error.insertAfter(element.closest('.contact-container'));
        } else {
            error.insertAfter(element);
        }
    }
});

// Stores the form data in an object
function saveEmployee() {
    const employee = {
        name: $('#fName').val(),
        gender: $('input[name="gender"]:checked').val(),
        dob: $('#dateOfBirth').val(),
        socialSecurityNumber: $('#socialSecurityNumber').val(),
        address: $('#address').val(),
        phone: $('#phone').val(),
        email: $('#mail').val(),
        contacts: $('input[name="contacts[]"]:checked')
            .map(function () {
                return this.value;
            })
            .get(),
        employeeId: $('#eId').val(),
        jobTitle: $('#jobTitle').val(),
        department: $('#dept').val(),
        salary: $('#salary').val(),
        hobbies: $('#hobbies').val(),
        notes: $('#notes').val(),
    };
    employeeList.push(employee);
    displayEmployeeRow(employee);
    clearForm();
}

// Display an employee's data in a table row
function displayEmployeeRow(employee) {
    const newRow = $('<tr></tr>');
    const editButton = $('<button>').text('Edit').addClass('edit bg-success');
    const deleteButton = $('<button>').text('Delete').addClass('delete bg-danger');

    for (const key in employee) {
        if (employee.hasOwnProperty(key)) {
            const cell = $('<td></td>');
            cell.text(employee[key]);
            newRow.append(cell);
        }
    }
    const actionCell = $('<td></td>');
    newRow.append(actionCell);
    actionCell.append(editButton);
    actionCell.append(deleteButton);
    tableBody.append(newRow);
    deleteButton.on('click', function () {
        deleteEmployeeRow(newRow);
    });

    editButton.on('click', function () {
        let rowIndex = tableBody.find('tr').index(newRow);
        rowIndex = rowIndex - 1;
        const deleteRow = $(this).closest('tr');
        $('span.error').css('display', 'none');
        populateForm(rowIndex, employee, deleteRow);
    });
}

// Function to populate form fields with the data in selected row
function populateForm(index, employee, row) {
    if (index >= 0 && index < employeeList.length && !isCurrentlyEditing) {
        $('#fName').val(employee.name);
        $('input[name="gender"]').prop('checked', false);
        $(`input[name="gender"][value="${employee.gender}"]`).prop('checked', true);
        $('#dateOfBirth').val(employee.dob);
        $('#socialSecurityNumber').val(employee.socialSecurityNumber);
        $('#address').val(employee.address);
        $('#phone').val(employee.phone);
        $('#mail').val(employee.email);
        $('input[name="contacts[]"]').prop('checked', false);
        employee.contacts.forEach((contact) => {
            $(`input[name="contacts[]"][value="${contact}"]`).prop('checked', true);
        });
        $('#eId').val(employee.employeeId);
        $('#jobTitle').val(employee.jobTitle);
        $('#dept').val(employee.department);
        $('#salary').val(employee.salary);
        $('#hobbies').val(employee.hobbies);
        $('#notes').val(employee.notes);

        updateEmployeeData(index, employee, row);
        isCurrentlyEditing = true;
    } else {
        alert('Currenly Editing');
    }
}

//Function to update edited data
function updateEmployeeData(index, employee, row) {
    employeeList[index] = employee;
    employee.name = $('#fName').val();
    employee.gender = $('input[name="gender"]:checked').val();
    employee.dob = $('#dateOfBirth').val();
    employee.socialSecurityNumber = $('#socialSecurityNumber').val();
    employee.address = $('#address').val();
    employee.phone = $('#phone').val();
    employee.email = $('#mail').val();
    employee.contacts = $('input[name="contacts[]"]:checked')
        .map(function () {
            return this.value;
        })
        .get();
    employee.employeeId = $('#eId').val();
    employee.jobTitle = $('#jobTitle').val();
    employee.department = $('#dept').val();
    employee.salary = $('#salary').val();
    employee.hobbies = $('#hobbies').val();
    employee.notes = $('#notes').val();
    deleteEmployeeRow(row);

}

// Delete an employee's row from the table
function deleteEmployeeRow(row) {
    const index = tableBody.children().index(row);
    employeeList.splice(index, 1);
    row.remove();
}

// convert salary to decimal
$.validator.addMethod('convertSalaryToDecimal', function (value) {
    const salaryInput = $('#salary');
    const salaryValue = value;

    if (salaryValue !== '') {
        const decimalSalary = parseFloat(salaryValue);

        if (!isNaN(decimalSalary)) {
            if (decimalSalary >= 0) {
                salaryInput.val(decimalSalary.toFixed(2));
                return true;
            }
        }
    }
});

// Event handler for salary input blur
$('#salary').on('blur', function (e) {
    $.validator.methods.convertSalaryToDecimal.call(this);
});

// Generate a random employee ID
function generateRandomEmployeeId() {
    const randomId = Math.round(Math.random() * (10 - 1) + 1);
    $('#eId').val(randomId);
}

$.validator.addMethod('isValidFormat', function (value) {
    return value.match(/\d{2}-\d{2}-\d{3}/);
}, ' Use the format: XX-XX-XXX');


// validate date format
$.validator.addMethod('isValidDate', function (value) {
    const regexPattern = /^(?:\d{4})\/(0[1-9]|1[0-2]|[1-9])\/(0[1-9]|[12]\d|3[01]|[1-9])$/;

    if (!regexPattern.test(value)) {
        return false;
    }
    const [year, month, day] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
});

// validate age
$.validator.addMethod('isAgeValid', function (value) {
    const age = calculateAge(value);

    return age >= 18 && age <= 100;
});


// Calculate age from the date string
function calculateAge(dateString) {
    const currentDate = new Date();
    const birthDate = new Date(dateString);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    if (currentDate.getDate() < birthDate.getDate()) {
        return age - 1;
    }
    return age;
}

// Clear the form and generate a random employee ID
function clearForm() {
    $('#webForm')[0].reset();
    $('span.error').css('display', 'none');
    generateRandomEmployeeId();
}

// Event handler for the clear button
$('#clear').on('click', function () {
    clearForm();
});