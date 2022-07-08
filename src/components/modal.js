export const profileButtonRedaction = document.querySelector(".profile__button-redaction");
export const modalWindowButtonExit = document.querySelector('.modal-window__buttons-exit');

export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');

export const editProfileForm = document.querySelector('.form');

export const textName = editProfileForm.querySelector("#textName");
export const textDescription = editProfileForm.querySelector("#textDescription");

export const popupText = document.querySelector(".popup__text");

export const profilePopup = document.querySelector(".shadow");
export const imagePopup = document.querySelector(".popup__view-image");

export const addCardPopup = document.querySelector(".popup__add-card");
export const updateAvatar = document.querySelector(".popup__edit-avatar");
export const textTitle = addCardPopup.querySelector("#textTitle");
export const textLink = addCardPopup.querySelector("#textLink");

export const imageAvatar = document.querySelector('.profile__image');
export const buttonImage = document.querySelector('.profile__button-redaction-image');

import { popupCloseEsc } from './utils.js';


const popups = document.querySelectorAll('.shadow')


popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('shadow_show')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('modal-window__buttons-exit')) {
            closePopup(popup)
        }
    })
});

export function openPopup(popup) {
    popup.classList.add("shadow_show");
    document.addEventListener('keydown', popupCloseEsc);
};

export function closePopup(popup) {
    popup.classList.remove("shadow_show");
    document.removeEventListener('keydown', popupCloseEsc);
};

export const addCardButton = document.querySelector(".profile__button-plus");

