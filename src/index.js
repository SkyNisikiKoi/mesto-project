const preload = document.querySelector(".preload");
preload.classList.remove('preload');

import './index/index.css';
import './components/Сard.js';
import './utils/constant.js';
import { Api } from './components/Api.js';
import { Section } from './components/Section';
import { PopupWithImage } from './components/РopupWithImage';
import { PopupWithForm } from './components/РopupWithForm';
import { PopupWithSubmit } from './components/PopupWithSubmit';
import { UserInfo } from './components/UserInfo';

let userId = '';
let sectionCard;

import { imageAvatar } from './utils/constant.js';
import { buttonImage } from './utils/constant.js';
import { profileButtonRedaction } from './utils/constant.js';
import { addCardButton } from './utils/constant.js';
import { buttonSave } from './utils/constant.js';
import { profileForm } from './utils/constant.js';
import { validationSettings } from './utils/constant.js';
import { formElementPlus } from './utils/constant.js';
import { formElementAvatar } from './utils/constant.js';
import { cardsTemplate } from './utils/constant.js';


import { Card } from './components/Сard.js';

import { FormValidator } from './components/FormValidator.js';

const profileFormValidator = new FormValidator(validationSettings, profileForm);
const addCardFormValidator = new FormValidator(validationSettings, formElementPlus);
const avatarFormValidator = new FormValidator(validationSettings, formElementAvatar);

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-13',
    headers: {
        authorization: '15612dfc-e819-4f89-bf79-39ea6734df41',
        'Content-Type': 'application/json'
    }
});

const popupNew = new PopupWithImage('.popup__view-image');
popupNew.setEventListeners();

const newPopupWithSubmit = new PopupWithSubmit('.popup__deletion-confirmation');
newPopupWithSubmit.setEventListeners();

const someHandleCardClick = (data) => {
    popupNew.open(data.link, data.name);
};

const someHandleLikeClick = (data, card) => {
    if (card.isLiked()) {
        api.deleteLikeCard(data._id)
            .then((result) => {
                card.toggleLikes(result.likes)
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        api.likeCard(data._id)
            .then((result) => {
                card.toggleLikes(result.likes)
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

const newGetUserInfo = new UserInfo({ infUserName: '.profile__title', infUserDescription: '.profile__subtitle', userAvatarSelector: '.profile__image' }, () => {
    return api.loadUserData()
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        });
});

const popupUserInfo = new PopupWithForm('.popup__edit-profile', (data) => {

    popupUserInfo.renderLoading(true);

    api.saveEditProfile(data.name, data.about)
        .then(newGetUserInfo.getUserInfo())
        .then((res) => {
            newGetUserInfo.setUserInfo(res)
        })
        .then(() => {
            popupUserInfo.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupUserInfo.renderLoading(false);
        })
});

popupUserInfo.setEventListeners();

const popupUserAvatar = new PopupWithForm('.popup__edit-avatar', (data) => {

    const link = data['link-image'];

    popupUserAvatar.renderLoading(true);

    api.saveEditAvatar(link)
        .then((result) => {
            newGetUserInfo.setUserInfo(result);
            popupUserAvatar.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupUserAvatar.renderLoading(false);
        })
});

popupUserAvatar.setEventListeners();

function createCard(data) {
    return new Card({
        data: data,
        handleCardClick: someHandleCardClick,
        handleLikeClick: someHandleLikeClick,
        handleDeleteIconClick: someHandleDeleteIconClick
    }, cardsTemplate);
}

const popupAddCard = new PopupWithForm('.popup__add-card', (data) => {

    popupAddCard.renderLoading(true);

    api.saveNewCard(data.name, data.link)
        .then((result) => {
            const newCard = createCard(result);

            newCard.setUserId(userId);
            sectionCard.addItem(newCard.createCard());

            popupAddCard.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupAddCard.renderLoading(false);
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
    avatarFormValidator.resetValidation();
    popupUserAvatar.open();
}
);

profileButtonRedaction.addEventListener('click', function () {
    profileFormValidator.resetValidation();
    popupUserInfo.open();
    newGetUserInfo.getUserInfo()
        .then((userInfo) => {
            popupUserInfo.setInputValues(userInfo)
        })
        .catch((err) => {
            console.log(err);
        })

}
);

addCardButton.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    addCardFormValidator.resetValidation();
    popupAddCard.open();

}
);

Promise.all([api.loadUserData(), api.loadCards()])
    .then(([userData, cards]) => {

        newGetUserInfo.setUserInfo(userData);

        userId = userData._id;

        sectionCard = new Section({
            items: [],
            renderer: (data) => {
                const newCard = createCard(data);
                newCard.setUserId(userId);
                sectionCard.addItem(newCard.createCard());
            }
        }, ".elements")

        sectionCard.items = cards
        sectionCard.renderElements();

    })
    .catch((err) => {
        console.log(err);
    });

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

