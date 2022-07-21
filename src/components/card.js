import { popupText } from './modal.js';
import { closePopup } from './modal.js';
import { textTitle } from './modal.js';
import { textLink } from './modal.js';
import { imagePopup } from './modal.js';
import { addCardPopup } from './modal.js';
import { openPopup } from './modal.js';


import { api } from './../index.js';

import { userId } from '../index.js';

export const cardList = document.querySelector(".elements");

export const formDeletionConfirmation = document.querySelector('.form_deletion-confirmation');

const modalPic = document.querySelector(".popup__image");
export const popupDeletionConfirmation = document.querySelector('.popup__deletion-confirmation');

export class Card {
    constructor(data, template) {
      this.data = data,
      this.template = template

    }

 handleClickImage(src, alt) {
    modalPic.src = src;
    modalPic.alt = alt;
    openPopup(imagePopup);
    popupText.textContent = alt;
};


    createCard() {
        const cardElement = this.template.cloneNode(true);
        const cardImage = cardElement.querySelector('.card__image');
        const cardText = cardElement.querySelector('.card__text');
        const likeCount = cardElement.querySelector('.card__count');
    
        cardImage.src = this.data.link;
        cardText.textContent = this.data.name;
        likeCount.textContent = this.data.likes.length;
        cardElement.id = this.data._id;
    
        cardImage.setAttribute('alt', this.data.name)
    
        cardImage.addEventListener('click', () => handleClickImage(this.data.link, this.data.name));
    
        const buttonLike = cardElement.querySelector(".card__button");
    
        this.data.likes.forEach(function (like) {
            if (like._id == userId) {
                buttonLike.classList.add('card__button_active');
            };
        })
    
    
        buttonLike.addEventListener('click', function () {
    
            if (buttonLike.classList.contains("card__button_active")) {
                api.deleteLikeCard(this.data._id)
                    .then(api.checkResponse)
                    .then((result) => {
                        buttonLike.classList.toggle("card__button_active");
                        likeCount.textContent = result.likes.length;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                api.likeCard(this.data._id)
                    .then(api.checkResponse)
                    .then((result) => {
                        buttonLike.classList.toggle("card__button_active");
                        likeCount.textContent = result.likes.length;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            };
        });
    
    
        const buttonDelete = cardElement.querySelector(".card__basket");
    
        buttonDelete.addEventListener('click', function (e) {
            openPopup(popupDeletionConfirmation)
            formDeletionConfirmation.cardId = e.target.parentElement.id;
        });
    
    
        if (this.data.owner._id == userId) {
            buttonDelete.classList.add("card__basket_visible")
        };
    
        return cardElement;
    }
   
};

export function renderCard(card, container) {
    container.prepend(card);
};


//добавление карточки
export const addCardForm = addCardPopup.querySelector(".form_plus");



addCardForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const buttonSave = addCardForm.querySelector('.form__button-save');

    buttonSave.textContent = 'Сохранение...';

    api.saveNewCard(textTitle.value, textLink.value)
        .then(api.checkResponse)
        .then((result) => {
            renderCard(result, cardList);

            closePopup(addCardPopup);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            buttonSave.textContent = 'Создать';
        })
});



