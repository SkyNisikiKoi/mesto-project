import { Popup } from './Рopup';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this.modalPic = document.querySelector(".popup__image");
        this.popupText = document.querySelector(".popup__text");
    }

    open(src, alt) {
        this.modalPic.src = src;
        this.modalPic.alt = alt;
        this.popupText.textContent = alt;

        super.open();
    }
}