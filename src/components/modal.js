export const profileButtonRedaction = document.querySelector(".profile__button-redaction");
export const modalWindowButtonExit = document.querySelector('.modal-window__buttons-exit');

export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');

export const editProfileForm = document.querySelector('.form');

export const textName = editProfileForm.querySelector("#textName");
export const textDescription = editProfileForm.querySelector("#textDescription");

export const popupText = document.querySelector(".popup__text");

export const profilePopup = document.querySelector(".shadow");
export const imagePopup = document.querySelector(".popup__shadow");
export const addCardPopup = document.querySelector(".shadow_plus");

export const textTitle = addCardPopup.querySelector("#textTitle");
export const textLink = addCardPopup.querySelector("#textLink");

export const imageAvatar = document.querySelector('.profile__image');
export const buttonImage = document.querySelector('.profile__button-redaction-image');

export const updateAvatar = document.querySelector('.shadow_update-avatar');
export const exitUpdateAvatar = document.querySelector('.modal-window__buttons-exit_update-avatar');

export function openPopup(popup) {
    popup.classList.add("shadow_show")
};

export function closePopup(popup) {
    popup.classList.remove("shadow_show")
};

export const addCardButton = document.querySelector(".profile__button-plus");
export const exitButtonCardPopup = document.querySelector('.modal-window__buttons-exit_plus');

