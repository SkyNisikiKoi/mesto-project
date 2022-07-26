
import { addCardPopup } from './modal.js';
import { userId } from '../index.js';

export const cardList = document.querySelector(".elements");

export const formDeletionConfirmation = document.querySelector('.form_deletion-confirmation');

export const popupDeletionConfirmation = document.querySelector('.popup__deletion-confirmation');


export class Card {
    constructor(options, template) {
        this.data = options.data,
        this.template = template,
        this.handleCardClick = options.handleCardClick,
        this.handleLikeClick = options.handleLikeClick,
        this.handleDeleteIconClick = options.handleDeleteIconClick
    }

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

        cardImage.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleCardClick(this.data);

        });

        const buttonLike = cardElement.querySelector(".card__button");

        this.data.likes.forEach(function (like) {
            if (like._id == userId) {
                buttonLike.classList.add('card__button_active');
            };
        })


        buttonLike.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLikeClick(e, this.data);

        });


        const buttonDelete = cardElement.querySelector(".card__basket");

        buttonDelete.addEventListener('click',  (e) => {
            e.preventDefault();
            this.handleDeleteIconClick(this.data);

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





