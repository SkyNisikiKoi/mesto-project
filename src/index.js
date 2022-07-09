import './index/index.css';
import './components/card.js';
import './components/modal.js';
import './components/utils.js';
import './components/validate.js';
import './components/api';


const preload = document.querySelector(".preload");
preload.classList.remove('preload');

export let userId = '';

//Закрытие попапов esc

import {popupCloseEsc} from './components/utils.js';

import {editProfileForm} from './components/modal.js';
import {profileTitle} from './components/modal.js';
import {profileSubtitle} from './components/modal.js';
import {closePopup} from './components/modal.js';
import {profilePopup} from './components/modal.js';
import {imageAvatar} from './components/modal.js';
import {buttonImage} from './components/modal.js';
import {openPopup} from './components/modal.js';
import {updateAvatar} from './components/modal.js';
import {profileButtonRedaction} from './components/modal.js';
import {textDescription} from './components/modal.js';
import {addCardButton} from './components/modal.js';
import {addCardPopup} from './components/modal.js';
import {textName} from './components/modal.js';

import {saveEditProfile} from './components/api.js';
import {deleteCard} from './components/api.js';
import {saveEditAvatar} from './components/api.js';
import {loadUserData} from './components/api.js';
import {checkResponse} from './components/api.js';
import {loadCards} from './components/api.js';

import {formDeletionConfirmation} from './components/card.js';
import {popupDeletionConfirmation} from './components/card.js';
import {addCardForm} from './components/card.js';
import {cardList} from './components/card.js';
import {renderCard} from './components/card.js';

document.addEventListener('keydown', function (e) {
    popupCloseEsc(e);
});


editProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const buttonSave = editProfileForm.querySelector('.form__button-save');

    buttonSave.textContent = 'Сохранение...';

    saveEditProfile(textName.value, textDescription.value)
        .then(checkResponse)
        .then((result) => {
            profileTitle.textContent = result.name;
            profileSubtitle.textContent = result.about;

            closePopup(profilePopup);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            buttonSave.textContent = 'Сохранить';
        })
});


imageAvatar.addEventListener('mouseover', function () {
        buttonImage.style.display = "block";
    }
);

buttonImage.addEventListener('mouseout', function () {
        buttonImage.style.display = "none";
    }
);

buttonImage.addEventListener('click', function () {
        openPopup(updateAvatar);
    }
);

profileButtonRedaction.addEventListener('click', function () {
        openPopup(profilePopup);
        textName.value = profileTitle.textContent;
        textDescription.value = profileSubtitle.textContent;
    }
);


const formButtonSave = addCardPopup.querySelector(".form__button-save");

addCardButton.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        openPopup(addCardPopup);
        addCardForm.reset();
        formButtonSave.setAttribute('disabled', 'disabled');
        formButtonSave.classList.add("form__button-save_inactive");
    }
);


formDeletionConfirmation.addEventListener('submit', function (e) {
    e.preventDefault();

    const buttonSave = formDeletionConfirmation.querySelector('.form__button-save_deletion-confirmation');

    buttonSave.textContent = 'Сохранение...';

    deleteCard(e.target.cardId)
        .then(checkResponse)
        .then(() => {
            closePopup(popupDeletionConfirmation);
            const cardToDelete = document.getElementById(e.target.cardId);
            cardToDelete.remove();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            buttonSave.textContent = 'Да';
        })
});

const formUpdateAvatar = document.querySelector('.form_update-avatar');

formUpdateAvatar.addEventListener('submit', function () {

    const linkImage = document.getElementById('linkImage');

    const link = linkImage.value;

    const buttonSave = formUpdateAvatar.querySelector('.form__button-save');

    buttonSave.textContent = 'Сохранение...';

    saveEditAvatar(link)
        .then(checkResponse)
        .then((result) => {
            imageAvatar.setAttribute('src', result.avatar);
            closePopup(updateAvatar);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            buttonSave.textContent = 'Сохранить';
        })
});


Promise.all([loadUserData(), loadCards()])
    .then(([userData, cards]) => {
        checkResponse(userData)
            .then((res) => {
                profileTitle.textContent = res.name;
                profileSubtitle.textContent = res.about;
                imageAvatar.setAttribute("src", res.avatar);
                profileSubtitle.textContent = res.about;
                userId = res._id;
            })
            .catch((err) => {
                console.log(err);
            });

        checkResponse(cards)
            .then((res) => {
                res.reverse().forEach(function (item) {
                    renderCard(item, cardList);
                })
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .catch((err) => {
        console.log(err);
    });

