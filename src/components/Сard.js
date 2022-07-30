

import { userId } from '../index.js';

export class Card {
    constructor(options, template) {
        this.data = options.data,
            this.template = template,
            this.handleCardClick = options.handleCardClick,
            this.handleLikeClick = options.handleLikeClick,
            this.handleDeleteIconClick = options.handleDeleteIconClick,
            this._cardElement = this.template.cloneNode(true),
            this._cardImage = this._cardElement.querySelector('.card__image'),
            this._cardText = this._cardElement.querySelector('.card__text'),
            this._likeCount = this._cardElement.querySelector('.card__count'),
            this._buttonLike = this._cardElement.querySelector(".card__button");
            this._buttonDelete = this._cardElement.querySelector(".card__basket");
    }

    _setHandleClickImage() {
        this._cardImage.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleCardClick(this.data);

        });
    }

    _setHandleLikeClick() {
        this._buttonLike.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLikeClick(e, this.data);

        });
    }

    _setHandleButtonDelete() {
        this._buttonDelete.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleDeleteIconClick(this.data);

        });
    }

    _setCardMarkup(){

        this.data.likes.forEach((like) => {
            if (like._id == userId) {
                this._buttonLike.classList.add('card__button_active');
            };
        })

        if (this.data.owner._id == userId) {
            this._buttonDelete.classList.add("card__basket_visible")
        };
    }

    createCard() {
        this._cardImage.src = this.data.link;
        this._cardText.textContent = this.data.name;
        this._likeCount.textContent = this.data.likes.length;
        this._cardElement.id = this.data._id;

        this._cardImage.setAttribute('alt', this.data.name)

        this._setEventListeners();

        this._setCardMarkup();
    
        return this._cardElement;
    }

    _setEventListeners() {
        this._setHandleClickImage();
        this._setHandleLikeClick();
        this._setHandleButtonDelete();
    }

    
};








