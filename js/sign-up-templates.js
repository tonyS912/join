/**
 * @returns html code for registration success message
 */
function registrationCompleteTemplate() {
    return /*html*/ `
        <a href="./index.html"><img src="./assets/img/arrow-back.png" alt="back to login" class="signup-back"></a>
        <div class="headline-container">
            <h1 class="headline">Registration complete</h1>
            <div class="login-headline-border"></div>
        </div>

        <div class="signup-complete-text">
            Thank you for your registration.<br> You can log in <a href="./index.html">here</a>.
        </div>
    `;
};