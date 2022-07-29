
import { addCardPopup } from './constant.js';
import { userId } from '../index.js';

export class Card {
    constructor(options, template) {
        this.data = options.data,
            this.template = template,
            this.handleCardClick = options.handleCardClick,
            this.handleLikeClick = options.handleLikeClick,
            this.handleDeleteIconClick = options.handleDeleteIconClick
    }

    _setHandleClickImage(cardImage) {
        cardImage.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleCardClick(this.data);

        });
    }

    _setHandleLikeClick(buttonLike) {
        buttonLike.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLikeClick(e, this.data);

        });
    }

    _setHandleButtonDelete(buttonDelete) {
        buttonDelete.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleDeleteIconClick(this.data);

        });
    }

    _setCardMarkup(buttonLike, buttonDelete){

        this.data.likes.forEach(function (like) {
            if (like._id == userId) {
                buttonLike.classList.add('card__button_active');
            };
        })

        if (this.data.owner._id == userId) {
            buttonDelete.classList.add("card__basket_visible")
        };
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

        this._setHandleClickImage(cardImage);

        const buttonLike = cardElement.querySelector(".card__button");
        const buttonDelete = cardElement.querySelector(".card__basket");

        this._setHandleLikeClick(buttonLike);

        this._setHandleButtonDelete(buttonDelete);

        this._setCardMarkup(buttonLike, buttonDelete);
    
        return cardElement;
    }

};








