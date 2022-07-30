import './index/index.css';
import './components/Сard.js';
import './utils/constant.js';
import { Api } from './components/Api.js';
import { Section } from './components/Section';
import { PopupWithImage } from './components/РopupWithImage';
import { PopupWithForm } from './components/РopupWithForm';
import { PopupWithSubmit } from './components/PopupWithSubmit';
import { UserInfo } from './components/UserInfo';


const preload = document.querySelector(".preload");
preload.classList.remove('preload');

export let userId = '';

import { editProfileForm } from './utils/constant.js';
import { profileTitle } from './utils/constant.js';
import { profileSubtitle } from './utils/constant.js';
import { imageAvatar } from './utils/constant.js';
import { buttonImage } from './utils/constant.js';
import { profileButtonRedaction } from './utils/constant.js';
import { textDescription } from './utils/constant.js';
import { addCardButton } from './utils/constant.js';
import { addCardPopup } from './utils/constant.js';
import { textName } from './utils/constant.js';
import { formDeletionConfirmation } from './utils/constant.js';
import { addCardForm } from './utils/constant.js';

import { Card } from './components/Сard.js';
import { FormValidator } from './components/FormValidator.js';

const buttonSave = formDeletionConfirmation.querySelector('.form__button-save_deletion-confirmation');
const formElement = document.querySelector('.form');


const newFormValidation = new FormValidator({
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button-save',
    inactiveButtonClass: 'form__button-save_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__input-error_active'
}, formElement
);

const formElementPlus = document.querySelector('.form_plus');

const newFormValidationPlus = new FormValidator({
    formSelector: '.form_plus',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button-save',
    inactiveButtonClass: 'form__button-save_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__input-error_active'
}, formElementPlus
);

const formElementAvatar = document.querySelector('.form_update-avatar');

const newFormValidationAvatar = new FormValidator({
    formSelector: '.form_update-avatar',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button-save',
    inactiveButtonClass: 'form__button-save_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__input-error_active'
}, formElementAvatar
);

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-13',
    headers: {
        authorization: '15612dfc-e819-4f89-bf79-39ea6734df41',
        'Content-Type': 'application/json'
    }
});

const popupNew = new PopupWithImage('.popup__view-image');
popupNew.setEventListeners();

const cardsTemplate = document.querySelector("#card-template").content.querySelector('.card');

const newPopupWithSubmit = new PopupWithSubmit('.popup__deletion-confirmation');
newPopupWithSubmit.setEventListeners();

const someHandleCardClick = (data) => {
    popupNew.open(data.link, data.name);
};

const someHandleLikeClick = (card, data) => {
    if (card.target.classList.contains("card__button_active")) {
        api.deleteLikeCard(data._id)

            .then((result) => {
                card.target.classList.toggle("card__button_active");
                card.target.nextElementSibling.textContent = result.likes.length;
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        api.likeCard(data._id)
            .then((result) => {
                card.target.classList.toggle("card__button_active");
                card.target.nextElementSibling.textContent = result.likes.length;
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

const someHandleDeleteIconClick = (data) => {
    newPopupWithSubmit.setSubmitCallback(() => {

        buttonSave.textContent = 'Сохранение...';

        api.deleteCard(data._id)
            .then(() => {
                newPopupWithSubmit.close();
                const cardToDelete = document.getElementById(data._id);
                cardToDelete.remove();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                buttonSave.textContent = 'Да';
            })
    })

    newPopupWithSubmit.open();
};


const sectionCard = new Section({
    items: [],
    renderer: (data) => {
        const newCard = new Card({
            data: data,
            handleCardClick: someHandleCardClick,
            handleLikeClick: someHandleLikeClick,
            handleDeleteIconClick: someHandleDeleteIconClick
        }, cardsTemplate);
        sectionCard.addItem(newCard.createCard());
    }
}, ".elements")

const newGetUserInfo = new UserInfo({ infUserName: '.profile__title', infUserDescription: '.profile__subtitle', userAvatarSelector: '.profile__image' }, () => {
    return api.loadUserData()
        .then((res) => {
            return { userName: res.name, userDescription: res.about }
        })
        .catch((err) => {
            console.log(err);
        });
});

const popupUserInfo = new PopupWithForm('.popup__edit-profile', (data) => {

    const buttonSave = popupUserInfo.popup.querySelector('.form__button-save');

    buttonSave.textContent = 'Сохранение...';

    api.saveEditProfile(data.name, data.description)
        .then(newGetUserInfo.getUserInfo())
        .then((res) => {
            newGetUserInfo.setUserInfo(res.name, res.about)
        })
        .then(() => {
            popupUserInfo.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            buttonSave.textContent = 'Сохранить';
        })
});

popupUserInfo.setEventListeners();

const popupUserAvatar = new PopupWithForm('.popup__edit-avatar', () => {

    const linkImage = document.getElementById('linkImage');

    const link = linkImage.value;

    const buttonSave = popupUserAvatar.popup.querySelector('.form__button-save');

    buttonSave.textContent = 'Сохранение...';

    api.saveEditAvatar(link)
        .then((result) => {
            newGetUserInfo.setUserInfo(result);
            popupUserAvatar.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            buttonSave.textContent = 'Сохранить';
        })
});

popupUserAvatar.setEventListeners();


const popupAddCard = new PopupWithForm('.popup__add-card', (data) => {

    const buttonSave = popupAddCard.popup.querySelector('.form__button-save');

    buttonSave.textContent = 'Сохранение...';

    api.saveNewCard(data.name, data.link)
        .then((result) => {
            const newCard = new Card({
                data: result,
                handleCardClick: () => {

                    popupNew.open(result.link, result.name);

                },
                handleLikeClick: someHandleLikeClick,
                handleDeleteIconClick: someHandleDeleteIconClick
            }, cardsTemplate);

            sectionCard.addItem(newCard.createCard());

            popupAddCard.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            buttonSave.textContent = 'Создать';
        })
})

popupAddCard.setEventListeners();


imageAvatar.addEventListener('mouseover', function () {
    buttonImage.style.display = "block";
}
);

buttonImage.addEventListener('mouseout', function () {
    buttonImage.style.display = "none";
}
);

buttonImage.addEventListener('click', function () {
    popupUserAvatar.open();
}
);

profileButtonRedaction.addEventListener('click', function () {
    popupUserInfo.open();
    textName.value = profileTitle.textContent;
    textDescription.value = profileSubtitle.textContent;
}
);


const formButtonSave = addCardPopup.querySelector(".form__button-save");

addCardButton.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    popupAddCard.open();
    addCardForm.reset();
    formButtonSave.setAttribute('disabled', 'disabled');
    formButtonSave.classList.add("form__button-save_inactive");
}
);

Promise.all([api.loadUserData(), api.loadCards()])
    .then(([userData, cards]) => {

        newGetUserInfo.setUserInfo(userData);

        userId = userData._id;

        sectionCard.items = cards
        sectionCard.renderElements();


    })
    .catch((err) => {
        console.log(err);
    });

newFormValidation.enableValidation();
newFormValidationPlus.enableValidation();
newFormValidationAvatar.enableValidation();

