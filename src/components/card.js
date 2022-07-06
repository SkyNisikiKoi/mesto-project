import { loadCards } from './api.js';

import { popupText } from './modal.js';
import { closePopup } from './modal.js';
import { textTitle } from './modal.js';
import { textLink } from './modal.js';
import { imagePopup } from './modal.js';
import { addCardPopup } from './modal.js';
import { openPopup } from './modal.js';

import { saveNewCard } from './api.js';
import { deleteLikeCard } from './api.js';
import { likeCard } from './api.js';


const cardList = document.querySelector(".elements");
const cardsTemplate = document.querySelector("#card-template").content.querySelector('.card')
export const formDeletionConfirmation = document.querySelector('.form_deletion-confirmation');

const modalPic = document.querySelector(".popup__image");
export const exitButtonModalPic = document.querySelector(".popup__buttons-exit");
export const popupdeletionConfirmation = document.querySelector('.shadow_deletion-confirmation');

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
    const likeCount = cardElement.querySelector('.card__count');

    cardImage.src = data.link;
    cardText.textContent = data.name;
    likeCount.textContent = data.likes.length;
    cardElement.id = data._id;

    cardImage.setAttribute('alt', data.name)

    cardImage.addEventListener('click', () => handleClickImage(data.link, data.name));

    const buttonLike = cardElement.querySelector(".card__button");

    buttonLike.addEventListener('click', async function () {

        if(buttonLike.classList.contains("card__button_active")){
            const res = await deleteLikeCard(data._id);
            if(res)
            {
                buttonLike.classList.toggle("card__button_active");
                likeCount.textContent = res.likes.length;
            }
        } else {
            const res = await likeCard(data._id);
            if(res){
                buttonLike.classList.toggle("card__button_active");
                likeCount.textContent = res.likes.length;
            }
        };

      
       
    });


    const buttonDelete = cardElement.querySelector(".card__basket");
    const exitDeletionConfirmation = document.querySelector('.modal-window__buttons-exit_deletion-confirmation');
    
    buttonDelete.addEventListener('click', function (e) {
        popupdeletionConfirmation.classList.add("shadow_show")
        formDeletionConfirmation.cardId = e.target.parentElement.id;
    });

    exitDeletionConfirmation.addEventListener('click', function () {
        popupdeletionConfirmation.classList.remove("shadow_show")
    });

    if (data.owner._id == "0016546f4b595052e8542d69"){
        buttonDelete.classList.add("card__basket_visible")
    };

    return cardElement;
}

const renderCard = function (data, container) {
    const newCard = createCard(data);
    container.prepend(newCard);
};

async function renderServerCards() {
    const loadCardsData = await loadCards();

    loadCardsData.forEach(function (item) {
        renderCard(item, cardList);
    });
};

renderServerCards();

//добавление карточки
const addCardForm = addCardPopup.querySelector(".form_plus");

addCardForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {
        name: textTitle.value,
        link: textLink.value
    };

    const buttonSave = addCardForm.querySelector('.form__button-save');

    buttonSave.textContent = 'Сохранение...';

    const newCardSaved = await saveNewCard(textTitle.value, textLink.value);
    
    buttonSave.textContent = 'Создать';

    if (newCardSaved) {
        renderCard(newCardSaved, cardList);
    }
    closePopup(addCardPopup);
});



