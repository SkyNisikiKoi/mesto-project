const cardsOld = [
    {
        text: 'Карачаевск',
        img: "./images/kirill-pershin-1088404-unsplash.png"
    },
    {
        text: "Гора Эльбрус",
        img: "./images/kirill-pershin-1404681-unsplash.png"
    },
    {
        text: "Домбай",
        img: "./images/kirill-pershin-1556355-unsplash.png"
    },
    {
        text: "Гора Эльбрус",
        img: "./images/kirill-pershin-1404681-unsplash.png"
    },
    {
        text: "Домбай",
        img: "./images/kirill-pershin-1556355-unsplash.png"
    },
    {
        text: "Карачаево-Черкесия",
        img: "./images/kirill-pershin-1088404-unsplash.png"
    }
];

import { popupText } from './modal.js';
import { closePopup } from './modal.js';
import { textTitle } from './modal.js';
import { textLink } from './modal.js';
import { imagePopup } from './modal.js';
import { addCardPopup } from './modal.js';
import { openPopup } from './modal.js';

const cardList = document.querySelector(".elements");
const cardsTemplate = document.querySelector("#card-template").content.querySelector('.card')


const modalPic = document.querySelector(".popup__image");
export const exitButtonModalPic = document.querySelector(".popup__buttons-exit");

// попап изображения
const handleClickImage = function (src, alt) {
    modalPic.src = src;
    modalPic.alt = alt;
    openPopup(imagePopup);;
    popupText.textContent = alt;
};


const createCard = function (data) {
    const cardElement = cardsTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardText = cardElement.querySelector('.card__text');

    cardImage.src = data.img;
    cardText.textContent = data.text;
    cardImage.setAttribute('alt', data.text)

    cardImage.addEventListener('click', () => handleClickImage(data.img, data.text));

    const buttonLike = cardElement.querySelector(".card__button");

    buttonLike.addEventListener('click', function () {
        buttonLike.classList.toggle("card__button_active");

    });


    const buttonDelete = cardElement.querySelector(".card__basket");
    const deletionConfirmation = document.querySelector('.shadow_deletion-confirmation');
    const exitDeletionConfirmation = document.querySelector('.modal-window__buttons-exit_deletion-confirmation');
    const saveDeletionConfirmation = document.querySelector('.form__button-save_deletion-confirmation');

    buttonDelete.addEventListener('click', function () {
        deletionConfirmation.classList.add("shadow_show")
    });

    exitDeletionConfirmation.addEventListener('click', function () {
        deletionConfirmation.classList.remove("shadow_show")
    });


    // saveDeletionConfirmation.addEventListener('click', function () {
    //   cardElement.remove();
    // });
    return cardElement;
}

const renderCard = function (data, container) {
    const newCard = createCard(data);
    container.prepend(newCard);
};

cardsOld.forEach(function (item) {
    renderCard(item, cardList);
});


//добавление карточки
const addCardForm = addCardPopup.querySelector(".form_plus");

addCardForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
        text: textTitle.value,
        img: textLink.value
    };

    renderCard(data, cardList);

    closePopup(addCardPopup);

});