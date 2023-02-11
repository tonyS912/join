let savecontactforaddtask;
let contactsInitials;

/**
 * functions starting when page is loading
 */
async function initContacts() {
    await init();
    setNavLinkActive();
    checkUserIsLoggedIn();
    renderAllContact()
    getTasksOfCurrentUser();
    imgheader();
}

/**
 * renders the contacts on the site
 */
function renderAllContact() {
    createContactBar();
    contactChild();
}


/**
 * opens a window to add contacts
 */
function openAddContact(mo) {
    if (mo == 1) {
        let addcontact = document.getElementById('AddTaskMaskContact');
        addcontact.classList.remove('d-none');
        let editTaskForm = document.getElementById('detail_content');
        editTaskForm.classList.add('d-none');
        addcontact.innerHTML = '';
        addcontact.innerHTML = addNewContactHtml(mo);
    }
    else if (mo == 0) {
        let addcontact = document.getElementById('opencontact');
        addcontact.classList.remove('d-none');
        addcontact.innerHTML = '';
        addcontact.innerHTML = addNewContactHtml(mo);
    }
}


/**
 * close a window to add contacts
 */
function closeAddContact(mo) {
    if (mo == 0) {
        let addcontact = document.getElementById('opencontact');
        addcontact.classList.add('d-none');
        addcontact.innerHTML = '';
    }
    else if (mo == 1) {
        let addtask = document.getElementById('AddTaskMaskContact');
        addtask.classList.add('d-none');
        let editTaskForm = document.getElementById('detail_content');
        editTaskForm.classList.remove('d-none');
        addtask.innerHTML = '';
    }
}


/**
 * hides the overlay to add a contact
 */
function hideAddContacts() {
    document.getElementById('opencontact').classList.add("d-none");
}


/**
 * pulls them out of the input and puts them in a json
 */
function createContact(mo) {
    let smallName = document.getElementById('contactName').value;
    let contactEmail = document.getElementById('contactEmail').value;
    let contactNumber = document.getElementById('contactNumber').value;
    let contactName = smallName.charAt(0).toUpperCase() + smallName.slice(1);
    let firstName = contactName.charAt(0);
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    let letterFB = contactName.match(/\b(\w)/g).join('');
    let lettersFB = letterFB.toUpperCase();
    let contactTask = {
        'contactName': contactName,
        'contactEmail': contactEmail,
        'contactNumber': contactNumber,
        'contactletter': firstName,
        'contactcolor': randomColor,
        'contactInitials': lettersFB
    };
    let look = checkEmailInArray(contactTask);
    checkOrLoad(look, contactName, contactTask, mo);
}


/**
 * Check e-mail or create a contact
 * @param {number} look Checks if e-mail is assigned in array
 * @param {string} contactName name of the contact
 * @param {string} contactTask the entire contact with email and number
 */
function checkOrLoad(look, contactName, contactTask, mo) {
    if (look == -1) {
        addNewContact(contactTask);
        if (mo == 0) {
            fillAllTasks(contactName, mo);
        }
        if (mo == 1) {
            let letter = contactName.charAt(0);
            if (currentUser.lettertask.includes(letter)) {
                // clearContactBar( mo);
            }
            else {
                saveLetterContact(letter);
            }
            closeAddContact(mo);
            selectorcontactIndex = 0;
            showUsers(mo);
        }
    }
    else {
        checkEmail();
    }
}


/**
 * Pusht ContactTask in CurrentUser and Save it in Backend
 * @param {string} contactTask the entire contact with email and number
 */
async function addNewContact(contactTask) {
    currentUser.contacts.push(contactTask);
    currentUser.contacts.sort((a, b) => a.contactName.localeCompare(b.contactName));
    await backend.setItem('users', JSON.stringify(users));
}


/**
 * Checks if e-mail is assigned in array
 * @param {string} contactTask the entire contact with email and number
 * @returns 
 */
function checkEmailInArray(contactTask,) {
    let email = contactTask['contactEmail'];
    let userindex = -1;
    for (i = 0; i < currentUser.contacts.length; i++) {
        if (currentUser.contacts[i]['contactEmail'].toLowerCase() == email.toLowerCase()) {
            userindex = i; //Email found
        }
    }
    return userindex;
}


// email already taken appears
function checkEmail() {
    let emaildone = document.getElementById('emailDone');
    emaildone.classList.remove('d-none');
}


/**
 * pushes the json into an array
 * @param {string} contactName name of the contact
 */
function fillAllTasks(contactName, mo) {
    let letter = contactName.charAt(0);
    closeAddContact(mo);
    popupContactSave();
    if (currentUser.lettertask.includes(letter)) {
        clearContactBar(mo);
    }
    else {
        let contactBar = document.getElementById('contactbar');
        contactBar.innerHTML = '';
        saveLetterContact(letter);
        createContactBar();
        contactChild();
    }
}


/**
 * push letter in currentuser
 * @param {string} letter first letter of the name
 */
async function saveLetterContact(letter) {
    currentUser.lettertask.push(letter);
    currentUser.lettertask.sort();
    await backend.setItem('users', JSON.stringify(users));
}

// save contact popup
function popupContactSave() {
    document.getElementById('popup-ContactBar').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('popup-ContactBar').classList.add('d-none');
    }, 1100);
}


// Clear Contact Letter Bar
function clearContactBar(mo) {
    if (mo == 0) {
        for (let i = 0; i < currentUser.lettertask.length; i++) {
            let clear = currentUser.lettertask[i];
            let contactSmall = document.getElementById(clear)
            while (contactSmall.lastChild) {
                contactSmall.removeChild(contactSmall.lastChild);
            }
        }
        contactChild();
    }
}


// for loop for contact child
function contactChild() {
    for (let index = 0; index < currentUser.contacts.length; index++) {
        let i = currentUser.contacts[index];
        let lettersFB = currentUser.contacts[index]['contactInitials'];
        let l = currentUser.contacts[index]['contactletter'];
        let contactchildsid = document.getElementById(l);
        contactchildsid.innerHTML += contactChildHtml(i, lettersFB, index);
    }
}


// Create a Contact Letter Bar
function createContactBar() {
    let contactBar = document.getElementById('contactbar');
    contactBar.innerHTML = '';
    for (let i = 0; i < currentUser.lettertask.length; i++) {
        let l = currentUser.lettertask[i];
        contactBar.innerHTML += contactBarHtml(l);
    }
}


/**
 * opens detail view of contact
 * @param {number} index position in the array
 * @param {string} lettersFB first letter of the name
 */
function openDetailContact(index, lettersFB) {
    changeColorInContact(index);
    let contact = currentUser.contacts[index];
    let contactMedia = window.matchMedia('(max-width: 1120px)')
    if (contactMedia.matches) {
        document.getElementById('contactbar').classList.add('display-contact-none');
        document.getElementById('contact-detail-in-main').classList.remove('display-contact-none');
    }
    let contactdetailsinmedia = document.getElementById('contact-detail-in-main');
    contactdetailsinmedia.innerHTML = '';
    contactdetailsinmedia.innerHTML = contactDetailHtml(contact, lettersFB, index);
    let contactdetails = document.getElementById('contactdetails');
    contactdetails.innerHTML = '';
    contactdetails.innerHTML = contactDetailHtml(contact, lettersFB, index);
}


/**
 * change coler of background in letterTask
 * @param {number} index position in the array
 */
function changeColorInContact(index) {
    for (let i = 0; i < currentUser.contacts.length; i++) {
        document.getElementById(i).classList.remove('contact-child-div-klick')
    }
    document.getElementById(index).classList.add('contact-child-div-klick');
}


/**
 * opens Edit view of Contact
 * @param {number} index position in the array
 * @param {string} lettersFB first letter of the name
 */
function editContact(index, lettersFB) {
    let contact = currentUser.contacts[index];
    let editcontact = document.getElementById('opencontact');
    editcontact.classList.remove('d-none');
    editcontact.innerHTML = '';
    editcontact.innerHTML = editContactHtml(contact, lettersFB, index);
    document.getElementById('contactEditName').value = contact['contactName'];
    document.getElementById('contactEditEmail').value = contact['contactEmail'];
    document.getElementById('contactEditNumber').value = contact['contactNumber'];
}


/**
 * Changes a contact
 * @param {string} oldEmail old email from a contact
 * @param {number} index position in the array
 * @param {string} lettersFB first letter of a name
 */
function invEditContact(oldEmail, index, lettersFB) {
    let smallName = document.getElementById('contactEditName').value;
    let contactEmail = document.getElementById('contactEditEmail').value;
    let contactNumber = document.getElementById('contactEditNumber').value;
    let contactName = smallName.charAt(0).toUpperCase() + smallName.slice(1);
    let contactInitials = contactName.match(/\b(\w)/g).join('');
    let firstName = contactName.charAt(0);
    let contactTask = {
        'contactName': contactName,
        'contactInitials': contactInitials,
        'contactEmail': contactEmail,
        'contactNumber': contactNumber,
        'contactletter': firstName,
        'oldEmail': oldEmail
    };
    lettersFB = contactInitials;
    changeUser(contactTask, index, lettersFB);
    hideAddContacts();
    renderAllContact();
    changeColorInContact(index);
}


/**
 * Changes a contact
 * @param {string} object the entire contact with email and number
 * @param {number} id position  in the array
 * @param {string} lettersFB first letter of a name
 */
async function changeUser(object, id, lettersFB) {
    let oldEmail = object['oldEmail'];
    let index = getUserIndexForEmail(oldEmail);
    changeContact(object, index);
    await savesInBackEnd();
    closeAddContact();
    openDetailContact(id, lettersFB);
}


/**
 * change new name, email, Number, in old contact
 * @param {string} object the entire contact with email and number
 * @param {number} index position in the array
 */
function changeContact(object, index) {
    currentUser.contacts[index]['contactName'] = object['contactName'];
    currentUser.contacts[index]['contactletter'] = object['contactletter'];
    currentUser.contacts[index]['contactEmail'] = object['contactEmail'];
    currentUser.contacts[index]['contactNumber'] = object['contactNumber'];
    currentUser.contacts[index]['contactInitials'] = object['contactInitials'];
    buildNewLettertask();
}


function buildNewLettertask() {
    contactsInitials = currentUser.contacts.map((contactsFirstLetters) => {
        return contactsFirstLetters.contactletter;
    });
    getNewLettertask();
}


async function getNewLettertask() {
    let newLettertask = [...new Set(contactsInitials)];
    currentUser.lettertask = newLettertask;
    await backend.setItem('users', JSON.stringify(users));
}


/**
 * Render a Contact
 * @param {string} letter first letter of a name
 */
function renderContacts(letter) {
    if (currentUser.lettertask.includes(letter)) {
        clearContactBar();
    }
    else {
        let contactBar = document.getElementById('contactbar');
        contactBar.innerHTML = '';
        let lettertask = currentUser.lettertask;
        lettertask.push(letter);
        lettertask.sort();
        createContactBar();
        contactChild();
    }
}


// Save in Backend
async function savesInBackEnd() {
    await backend.setItem('users', JSON.stringify(users));
}


// close contact detail
function clearContactDetails() {
    let addcontact = document.getElementById('contactdetails');
    addcontact.innerHTML = '';
}


// close window under 1160px
function closeMediaContact(index) {
    let contactdetails = document.getElementById('contactdetails');
    contactdetails.innerHTML = '';
    document.getElementById(index).classList.remove('contact-child-div-klick');
    document.getElementById('contact-detail-in-main').classList.add('display-contact-none');
    document.getElementById('contactbar').classList.remove('display-contact-none');
}


/**
 * Lokking for index in array
 * @param {string} email email of a contact
 * @returns 
 */
function getUserIndexForEmail(email) {
    let userindex = -1;
    for (i = 0; i < currentUser.contacts.length; i++) {
        if (currentUser.contacts[i]['contactEmail'].toLowerCase() == email.toLowerCase()) {
            userindex = i; //Email found
        }
    }
    return userindex;
}


/**
 * open addtask in contact
 * @param {number} i position in the array
 * @param {number} index position in the array
 */
function OpenContactAddTask(i, index) {
    savecontactforaddtask = index;
    let openaddtask = document.getElementById('openContactAddtask');
    document.getElementById('openContactAddtaskBG').classList.remove('d-none');
    let taskStatus = 'toDo';
    openaddtask.innerHTML = openAddTaskHtml(i, taskStatus);
    getToday();
}


/**
 * Delete a Contact
 * @param {number} index position in the array
 */
function deleteContacts(index) {
    closeAddContact(0);
    document.getElementById('contact-detail-in-main').classList.add('display-contact-none');
    document.getElementById('contactbar').classList.remove('display-contact-none');
    let letter = currentUser.contacts[index]['contactletter'];
    currentUser.contacts.splice(index, 1);
    let indexofletter = deleteContactletter(letter);
    if (indexofletter == -1) {
        for (let l = 0; l < currentUser.lettertask.length; l++) {
            let element = currentUser.lettertask[l];
            if (element == letter) {
                currentUser.lettertask.splice(l, 1);
                let clear = document.getElementById(letter);
                clear.remove();
            }
        }
    }
    document.getElementById('contactbar').innerHTML = '';
    clearContactDetails();
    createContactBar();
    contactChild();
    savesInBackEnd();
}


/**
 * Delete Contact Letter Bar
 * @param {string} letter first letter of the name
 * @returns 
 */
function deleteContactletter(letter) {
    let userindex = -1;
    for (i = 0; i < currentUser.contacts.length; i++) {
        let lettersFB = currentUser.contacts[i]['contactName'].charAt(0);
        if (lettersFB == letter) {
            userindex = i;
        }
    }
    return userindex;
}