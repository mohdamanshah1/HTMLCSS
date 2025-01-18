const Form = document.getElementById("form");
const Username = document.getElementById("username");
const Password = document.getElementById("password");
const ErrorBox = document.getElementById("error");
let message = [];

Form.addEventListener('submit', (e) => {
    e.preventDefault();
    message = [];
    ErrorBox.innerHTML = "";
    validateUsername(Username.value);
    validatePassword(Password.value);
    message.forEach(mes => {
        const p = document.createElement('p');
        p.innerText = mes;
        ErrorBox.appendChild(p);
    })
})

Form.addEventListener('reset', e => {
    ErrorBox.innerHTML = "";
    message = [];
})

function validateUsername(name) {
    if (name.length <= 4) {
        message.push('username too short. Length must be between 6 and 20');
        return false
    }
    if (name.length >= 30) {
        message.push('username too long. Length must be between 6 and 20');
        return false;
    }
    return true;
}

function validatePassword(password) {

    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase) message.push("Password must have uppercase characters.");
    if (!hasLowerCase) message.push("Password must have lowercase characters.");
    if (!hasNumber) message.push("Password must have numeric characters.");
    if (!hasSpecialChar) message.push("Password must have special characters.");
    if (password.length < minLength) message.push("Password too short");

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
}