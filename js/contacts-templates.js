/**
 * code to show detail view for a contact
 * @param {object} contact is the object of the contact for the detail view
 * @param {string} lettersFB initials of the contact
 * @param {number} index of the contact in the array of contact from the current user
 * @returns html code to show the detail view of the contact
 */
function contactDetailHtml(contact, lettersFB, index) {
    return /*html*/`
        <div class="contact-detail-main-side animationFadeInRight" id="${index}">
            <div class="back-in-media-contact">
                <img onclick="closeMediaContact(${index})" src="./assets/img/arrow-back.png" alt="">
            </div>
            <div class="contact-detail-head">
                <div style="background-color: ${contact['contactcolor']}" class="contact-detail-big-letter">${lettersFB}</div>
                <div class="contact-detail-name-task">
                    <p class="contact-detail-big-name">${contact['contactName']}</p>
                    <p class="contact-detail-add-task" onclick="OpenContactAddTask('0', ${index})"><img src="./assets/img/blue-plus.png" alt="">Add Task</p>
                </div>
            </div>
            <div class="contact-detail-info-main">
                <p class="contact-detail-info">Contact Information</p>
                <p class="contact-detail-edit" onclick="editContact('${index}', '${lettersFB}')"><img class="icon-edit-contact" src="./assets/img/icon_edit_contact.png" alt=""> Edit Contact</p>
            </div>
            <div>
                <div>
                    <p class="contact-detail-email-number">Email</p>
                    <a href="mailto:${contact['contactEmail']}"><span>${contact['contactEmail']}</span></a>
                </div>
                <div>
                    <p class="contact-detail-email-number">Mobile</p>
                    <p>${contact['contactNumber']}</p>
                </div>
            </div>
            
        </div>
    `
}


/**
 * html code to show a contact entry
 * @param {string} i the entire contact 
 * @param {string} lettersFB are the initials of the contact
 * @param {number} index index of contact
 * @returns html code to show the contact Child 
 */
function contactChildHtml(i, lettersFB, index) {
    return /*html*/`
    <div class="contact-child-div" onclick="openDetailContact('${index}', '${lettersFB}' )" id="${index}">
        <div style="background-color: ${i['contactcolor']}" class="contact-child">
            <p>${lettersFB}</p>
        </div>
        <div>
            <p class="contact-child-name">${i['contactName']}</p>
            <p class="contact-child-email">${i['contactEmail']}</p>
        </div>
    </div>
    `
}


/**
 * html Code to render the contact bar
 * @param {string} letter first letter of name
 * @returns html code to show the contact Bar 
 */
function contactBarHtml(letter) {
    return /*html*/`
    <div class="contact-letter-main" >
        <h4  class="contact-letter">${letter}</h4>
        <div id="${letter}"></div>
    </div>
    `
}


/**
 * html code to show the html form to add a new contact
 * @returns html code to show the new contact 
 */
function addNewContactHtml(mo) {
    return /*html*/`
    <div class="add-contact animationFadeIn" onclick="doNotClose(event)">
    <div class="add-contact-head">
        <div class="add-contact-cross" >
            <img class="img-cross" onclick="closeAddContact(${mo})" src="./assets/img/pngegg.png" alt="">
        </div>
        <div class="add-contact-header-info" >           
            <div class="add-contact-h">
                Add contact
            </div>
            <div class="add-contact-text">
                Tasks are better with a team!
            </div>
        </div>
    </div>
    <div class="add-contact-main">
        <div class="contact-member"><img src="./assets/img/contact-member.png" alt="">
        </div>
        <form onsubmit="createContact(${mo}); return false;" onreset="closeAddContact(${mo})">
            <div class="input-add-contact-container">
                <div class="input-contact">
                    <input placeholder="  Name" required  type="text" id="contactName" class="input-contact-name">
                    <img src="./assets/img/signup-user.png" alt="">
                </div>
                <div class="input-contact">
                    <input placeholder="  Email" required type="email" id="contactEmail" class="input-contact-name">
                    <img src="./assets/img/login-email.png" alt="">
                </div>
                <div  id="emailDone" class="d-none contact-email-done">This Email already exists</div>
                <div class="input-contact">
                    <input placeholder="  Phone" required type="text" id="contactNumber" class="input-contact-name">
                    <img src="./assets/img/phone.png" alt="">
                </div>
            </div>
            <div class="button-container">
                <button class="button-cancel" type="reset" >Cancel <img src="./assets/img/cancel.png" alt=""></button>
                <button class="button-create" type="submit">Create contact <img src="./assets/img/rithe.png" alt=""></button>
            </div>
        </form>
    </div>
</div>
    `
}


/**
 * html code to show the form to edit a contact
 * @param {string} contact the entire contact in array
 * @param {string} lettersFB first letter of the name
 * @param {number} index poition in array
 * @returns html code to show the edit contact 
 */
function editContactHtml(contact, lettersFB, index) {
    return /*html*/`
        <div class="add-contact animationFadeIn" onclick="doNotClose(event)">
            <div class="add-contact-head">
                <div class="add-contact-cross" onclick="hideAddContacts()">
                    <img class="img-cross" src="./assets/img/pngegg.png" alt="">
                </div>
                <div class="add-contact-header-info" >
                    <div class="add-contact-h">
                        Edit contact
                    </div>                   
                </div>
            </div>
            <div class="add-contact-main">
                <div style="background-color: ${contact['contactcolor']}" class="contact-detail-big-letter">
                    <p>${lettersFB}</p>
                </div>
                    <form onsubmit="invEditContact('${contact['contactEmail']}', '${index}', '${lettersFB}'); return false">
                        <div>
                            <div class="input-contact">
                                <input  required  type="text" id="contactEditName" class="input-contact-name">
                                <img src="./assets/img/signup-user.png" alt="">
                            </div>
                            <div class="input-contact">
                                <input  required type="email" id="contactEditEmail" class="input-contact-name">
                                <img src="./assets/img/login-email.png" alt="">
                            </div>
                            <div class="input-contact">
                                <input required type="text" id="contactEditNumber" class="input-contact-name">
                                <img src="./assets/img/phone.png" alt="">
                            </div>
                        </div>
                        <div class="button-container">
                            <button class="button-cancel" type="button" onclick="deleteContacts(${index})">Delete <img src="./assets/img/cancel.png" alt=""></button>
                            <button class="button-create" type="submit">Save <img src="./assets/img/rithe.png" alt=""></button>
                        </div>
                    </form>
            </div>
        </div>
    `
}