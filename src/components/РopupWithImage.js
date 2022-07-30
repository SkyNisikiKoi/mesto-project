import { Popup } from './Рopup';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

    open(src, alt) {
        const modalPic = document.querySelector(".popup__image");
        const popupText = document.querySelector(".popup__text");

        modalPic.src = src;
        modalPic.alt = alt;
        popupText.textContent = alt;

        this.popup.classList.add("shadow_show");
        document.addEventListener('keydown', this._handleEscClose);
    }
}