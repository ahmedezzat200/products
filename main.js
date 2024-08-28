const form = document.getElementById('form');
const formBtn = document.getElementById('formBtn');
const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,}$/;
const phoneNumberRegex = /^01[0125][0-9]{8}$/;

const formElements = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    phoneNumber: document.getElementById("phoneNumber"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    confirmPassword: document.getElementById("confirmPassword"),
    image: document.getElementById("image")
};

const validationMessages = {
    firstName: document.getElementById("invalidfname"),
    lastName: document.getElementById("invalidlname"),
    phoneNumber: document.getElementById("invalidphone"),
    email: document.getElementById("invalidmail"),
    password: document.getElementById("invalidpassword"),
    confirmPassword: document.getElementById("invalidconfirmpassword"),
    image: document.getElementById("invalidimage")
};


function validateInput(field, isValid, message) {
    if (isValid) {
        field.style.border = "2px solid black";
        message.style.display = "none";
    } else {
        field.style.border = "2px solid red";
        message.style.display = "block";
    }
}

// Input Validation Event Listeners
formElements.firstName.addEventListener('input', () => {
    validateInput(formElements.firstName, formElements.firstName.value.trim().length > 0, validationMessages.firstName);
});

formElements.lastName.addEventListener('input', () => {
    validateInput(formElements.lastName, formElements.lastName.value.trim().length > 0, validationMessages.lastName);
});

formElements.phoneNumber.addEventListener('input', () => {
    validateInput(formElements.phoneNumber, phoneNumberRegex.test(formElements.phoneNumber.value), validationMessages.phoneNumber);
});

formElements.email.addEventListener('input', () => {
    validateInput(formElements.email, emailRegex.test(formElements.email.value), validationMessages.email);
});

formElements.password.addEventListener('input', () => {
    validateInput(formElements.password, passwordRegex.test(formElements.password.value), validationMessages.password);
});

formElements.confirmPassword.addEventListener('input', () => {
    validateInput(formElements.confirmPassword, formElements.confirmPassword.value === formElements.password.value, validationMessages.confirmPassword);
});

formElements.image.addEventListener('change', () => {
    const file = formElements.image.files[0];
    validateInput(formElements.image, file && file.size <= 5 * 1024 * 1024, validationMessages.image);
});

formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let isFormValid = true;


    Object.keys(formElements).forEach((key) => {
        const element = formElements[key];
        const validationMsg = validationMessages[key];
        if (element.value.trim() === "" || validationMsg.style.display === "block") {
            validateInput(element, false, validationMsg);
            isFormValid = false;
        }
    });

    
    if (isFormValid) {
        alert("Registration successful!");
    } else {
        alert("Please correct the errors in the form before submitting.");
    }
});
