import './index/index.css';
import './components/card.js';
import './components/modal.js';
import './components/utils.js';
import {Api} from './components/api.js';
import {Section} from './components/section';


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


import {formDeletionConfirmation} from './components/card.js';
import {popupDeletionConfirmation} from './components/card.js';
import {addCardForm} from './components/card.js';
import {cardList} from './components/card.js';
import {renderCard} from './components/card.js';
import {Card} from './components/card.js';
import {FormValidator} from './components/formValidator.js';

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-13',
    headers: {
      authorization: '15612dfc-e819-4f89-bf79-39ea6734df41',
      'Content-Type': 'application/json'
    }
  }); 

const sectionCard = new Section({
    items:[],
    renderer: (data) => {
        const newCard = new Card(data, cardsTemplate);
        sectionCard.addItem(newCard.createCard());
    }
  }, ".elements")

const cardsTemplate = document.querySelector("#card-template").content.querySelector('.card')
  
document.addEventListener('keydown', function (e) {
    popupCloseEsc(e);
});


editProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const buttonSave = editProfileForm.querySelector('.form__button-save');

    buttonSave.textContent = 'Сохранение...';

    api.saveEditProfile(textName.value, textDescription.value)
        .then(api.checkResponse)
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

    api.deleteCard(e.target.cardId)
        .then(api.checkResponse)
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

    api.saveEditAvatar(link)
        .then(api.checkResponse)
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


Promise.all([api.loadUserData(), api.loadCards()])
    .then(([userData, cards]) => {
        api.checkResponse(userData)
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

        api.checkResponse(cards)
            .then((res) => {
                sectionCard.items = res
                sectionCard.renderElements();
                res.reverse().forEach(function (item) {
                    // const newCard = new Card(item, cardsTemplate);
                    //renderCard(newCard.createCard(), cardList);
                })
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .catch((err) => {
        console.log(err);
    });

    const formElement = document.querySelector('.form');
 
    const newFormValidation = new FormValidator ({
        formSelector: '.form',
        inputSelector: '.form__item',
        submitButtonSelector: '.form__button-save',
        inactiveButtonClass: 'form__button-save_inactive',
        inputErrorClass: 'form__item_type_error',
        errorClass: 'form__input-error_active'
        }, formElement
      ); 

      const formElementPlus = document.querySelector('.form_plus');

      const newFormValidationPlus = new FormValidator ({
        formSelector: '.form_plus',
        inputSelector: '.form__item',
        submitButtonSelector: '.form__button-save',
        inactiveButtonClass: 'form__button-save_inactive',
        inputErrorClass: 'form__item_type_error',
        errorClass: 'form__input-error_active'
        }, formElementPlus
      ); 

      const formElementAvatar = document.querySelector('.form_update-avatar');

      const newFormValidationAvatar = new FormValidator ({
        formSelector: '.form_update-avatar',
        inputSelector: '.form__item',
        submitButtonSelector: '.form__button-save',
        inactiveButtonClass: 'form__button-save_inactive',
        inputErrorClass: 'form__item_type_error',
        errorClass: 'form__input-error_active'
        }, formElementAvatar
      ); 

      newFormValidation.enableValidation();
      newFormValidationPlus.enableValidation();
      newFormValidationAvatar.enableValidation();
      console.log(sectionCard.items)
      