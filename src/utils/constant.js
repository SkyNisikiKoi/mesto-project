export const profileButtonRedaction = document.querySelector(".profile__button-redaction");
export const imageAvatar = document.querySelector('.profile__image');
export const buttonImage = document.querySelector('.profile__button-redaction-image');
export const addCardButton = document.querySelector(".profile__button-plus");
export const formDeletionConfirmation = document.querySelector('.form_deletion-confirmation');
export const buttonSave = formDeletionConfirmation.querySelector('.form__button-save_deletion-confirmation');
export const profileForm = document.querySelector('.form');
export const validationSettings = {
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button-save',
    inactiveButtonClass: 'form__button-save_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__input-error_active'
};

export const formElementPlus = document.querySelector('.form_plus');
export const formElementAvatar = document.querySelector('.form_update-avatar');
export const cardsTemplate = document.querySelector("#card-template").content.querySelector('.card');