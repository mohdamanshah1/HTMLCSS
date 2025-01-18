const loginForm = document.getElementById('loginForm');


loginForm.addEventListener('submit', function (event) {

    event.preventDefault();

    const emailErrorBox = document.getElementById('emailError');
    emailErrorBox.innerText = '';
    const passwordErrorBox = document.getElementById('passwordError');
    passwordErrorBox.innerText = '';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    let isValid = true;

    if (!email) {
        emailErrorBox.innerText = 'Email is required.';
        isValid = false;
    } else if (!/^[a-zA-Z0-9.+]+@[a-zA-Z0-9.]+\.[a-zA-Z]+$/.test(email)) {
        emailErrorBox.innerText = 'Please enter a valid email address.';
        isValid = false;
    }

    if (!password) {
        passwordErrorBox.innerText = 'Password is required.';
        isValid = false;
    } else if (password.length < 6) {
        passwordErrorBox.innerText = 'Password must be at least 6 characters long.';
        isValid = false;
    }
    if (isValid) {
        alert('Form submitted successfully!');
    }

});