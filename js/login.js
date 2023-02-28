let screenWidth576 = window.matchMedia('(max-width: 576px)');


/**
 * init function for index.html, loads the global functions from script.js, an funcionality for password field in login form
 */
async function initLogin() {
    await init();
    checkUserIsLoggedIn();
    passwordInputIconChange();
    mediaQuery576(screenWidth576)
    screenWidth576.addListener(mediaQuery576);
}


/**
 * init function for reset-password.html, loads the global functions from script.js, an funcionality for password fields in reset password form
 */
async function initResetPassword() {
    await init();
    passwordInputIconChange();
    passwordConfirmIconChange();
}


/**
 * get data from login form an execute the function to check it
 */
function userLogin() {
    let userEmail = document.getElementById('user_email').value;
    let userPassword = document.getElementById('user_password').value;
    checkUserData(userEmail, userPassword)
}


/**
 * checks the screenwidh and shows the sign up button under the login form if the screen width is less then 576px
 * @param {string} screenWidth576 is the css property of max screen width
 */
function mediaQuery576(screenWidth576) {
    if (screenWidth576.matches) {
        let loginHeader = document.getElementById('login_header');
        loginHeader.classList.add('display-none')
        let joinUser = document.getElementById('join_user');
        joinUser.classList.remove('display-none');
    } else {
        let loginHeader = document.getElementById('login_header');
        loginHeader.classList.remove('display-none')
        let joinUser = document.getElementById('join_user');
        joinUser.classList.add('display-none');
    }
}


/**
 * checks user data and log the in or gives the user feedback that login is nor possible
 * @param {string} userEmail pecified e-mail address of the user from the login form
 * @param {string} userPassword pecified password of the user from the login form
 */
function checkUserData(userEmail, userPassword) {
    let indexOfEmail = users.findIndex(user => user.email == userEmail);
    let indexOfPassword = users.findIndex(user => user.password == userPassword);
    if (indexOfEmail == -1 || indexOfPassword == -1) {
        let dataCheck = document.getElementById('data_check');
        dataCheck.classList.remove('display-none');
    } else {
        userLogIn(indexOfEmail);
    }
}


/**
 * saves the user data in local storage und saves status of login in sassion storage, set remeber me status if user checked this checkbox in login form
 * @param {string} indexOfEmail is the email adress of the user who wants to login from login form in index.html
 */
function userLogIn(indexOfEmail) {
    let rememberMe = document.getElementById('remember_me');
    if (rememberMe.checked) {
        localStorage.setItem('rememberMe', 'true');
    }
    localStorage.setItem('userLoggedInName', users[indexOfEmail].name);
    localStorage.setItem('userLoggedInEmail', users[indexOfEmail].email);
    sessionStorage.setItem('loggedIn', 'true');
    window.location.href = './summary.html';
}


/**
 * guest user login
 */
function guestLogin() {
    let loginForm = document.getElementById('login_form')
    let dataCheck = document.getElementById('data_check');
    loginForm.setAttribute('novalidate', 'true');
    dataCheck.innerHTML = '';
    checkUserData('noreply@nix.de', 'password');
}


/**
 * checks the timeout from new password request email und reset password if new password an new password to confirm is the same
 */
async function resetPassword() {
    let resetUrl = new URL(window.location.href);
    let resetEmail = resetUrl.searchParams.get('email');
    let resetTimestamp = resetUrl.searchParams.get('timestamp');
    let resetTimestampMinutes = resetTimestamp / 60;
    let timestampNowMinutes = Date.now() / 1000 / 60;
    let timeout = timestampNowMinutes - resetTimestampMinutes;
    if (timeout < 1440) {
        await checkEmailToReset(resetEmail);
    } else {
        let resetPasswordContainer = document.getElementById('reset_password_container');
        resetPasswordContainer.innerHTML = passwordTimeoutTemplate();
    }
}


/**
 * checks if the email from the user to reset the password is present in database
 * @param {string} resetEmail is the email adress of the user who request to reset the password
 */
async function checkEmailToReset(resetEmail) {
    let checkMail = users.find(user => user.email == resetEmail);
    if (checkMail) {
        await saveNewPassword(checkMail);
    } else {
        let emailCheck = document.getElementById('email_check');
        emailCheck.classList.remove('display-none');
    }
}


/**
 * saves the new password in database if the email adress from request preset in the database
 */
async function saveNewPassword(checkMail) {
    let newPassword = document.getElementById('user_password').value;
    let newPasswordConfirm = document.getElementById('new_password_confirm').value;
    if (newPassword === newPasswordConfirm) {
        checkMail.password = newPasswordConfirm;
    }
    let resetPasswordContainer = document.getElementById('reset_password_container');
    resetPasswordContainer.innerHTML = passwordResetedTemplate();
    await backend.setItem('users', JSON.stringify(users));
}


/**
 * check if the input field length with the id user_password on index.html is longer as 0 letters and change the icon on end of input
 */
function passwordInputIconChange() {
    let userPasswordInput = document.getElementById('user_password');
    let passwordIcon = document.getElementById('user_password_icon');
    let passwordIconHidden = document.getElementById('user_password_hidden');
    userPasswordInput.addEventListener('input', function () {
        if (userPasswordInput.value.length > 0) {
            passwordIcon.classList.add('display-none');
            passwordIconHidden.classList.remove('display-none');
        } else {
            passwordIcon.classList.remove('display-none');
            passwordIconHidden.classList.add('display-none');
        }
    })
}


/**
 * check if the input field length with the id new_password_confirm on reset-password.html is longer as 0 letters and change the icon on end of input
 */
function passwordConfirmIconChange() {
    let userPasswordConfirmInput = document.getElementById('new_password_confirm');
    let passwordConfirmIcon = document.getElementById('user_password_confirm_icon');
    let passwordConfirmIconHidden = document.getElementById('user_password_confirm_hidden');
    userPasswordConfirmInput.addEventListener('input', function () {
        if (userPasswordConfirmInput.value.length > 0) {
            passwordConfirmIcon.classList.add('display-none');
            passwordConfirmIconHidden.classList.remove('display-none');
        } else {
            passwordConfirmIcon.classList.remove('display-none');
            passwordConfirmIconHidden.classList.add('display-none');
        }
    })
}


/**
 * makes the password input readable
 */
function makePasswordVisible() {
    let passwordIconHidden = document.getElementById('user_password_hidden');
    let passwordIconVisible = document.getElementById('user_password_visible');
    let userPasswordInput = document.getElementById('user_password');
    passwordIconHidden.classList.add('display-none');
    passwordIconVisible.classList.remove('display-none');
    userPasswordInput.type = 'text';
}


/**
 * makes the password input unreadable
 */
function makePasswordUnvisible() {
    let passwordIconHidden = document.getElementById('user_password_hidden');
    let passwordIconVisible = document.getElementById('user_password_visible');
    let userPasswordInput = document.getElementById('user_password');
    passwordIconHidden.classList.remove('display-none');
    passwordIconVisible.classList.add('display-none');
    userPasswordInput.type = 'password';
}


/**
 * makes the password confirm input readable
 */
function makePasswordConfirmVisible() {
    let passwordConfirmIconHidden = document.getElementById('user_password_confirm_hidden');
    let passwordConfirmIconVisible = document.getElementById('user_password_confirm_visible');
    let userPasswordConfirmInput = document.getElementById('new_password_confirm');
    passwordConfirmIconHidden.classList.add('display-none');
    passwordConfirmIconVisible.classList.remove('display-none');
    userPasswordConfirmInput.type = 'text';
}


/**
 * makes the password confirm input unreadable
 */
function makePasswordConfirmUnvisible() {
    let passwordConfirmIconHidden = document.getElementById('user_password_confirm_hidden');
    let passwordConfirmIconVisible = document.getElementById('user_password_confirm_visible');
    let userPasswordConfirmInput = document.getElementById('new_password_confirm');
    passwordConfirmIconHidden.classList.remove('display-none');
    passwordConfirmIconVisible.classList.add('display-none');
    userPasswordConfirmInput.type = 'password';
}