import './index/index.css';
import './components/card.js';
import './components/modal.js';
import './components/utils.js';
import './components/validate.js';
import './components/api';


const preload = document.querySelector(".preload");
preload.classList.remove('preload');


import { editProfileForm } from './components/modal.js';
import { profileTitle } from './components/modal.js';
import { profileSubtitle } from './components/modal.js';
import { closePopup } from './components/modal.js';
import { profilePopup } from './components/modal.js';
import { imageAvatar } from './components/modal.js';
import { buttonImage } from './components/modal.js';
import { imagePopup } from './components/modal.js';
import { openPopup } from './components/modal.js';
import { updateAvatar } from './components/modal.js';
import { profileButtonRedaction } from './components/modal.js';
import { textDescription } from './components/modal.js';
import { addCardButton } from './components/modal.js';
import { textName } from './components/modal.js';
import { addCardPopup } from './components/modal.js';

import { addCardForm } from './components/card.js';


editProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    profileTitle.textContent = textName.value;
    profileSubtitle.textContent = textDescription.value;

    closePopup(profilePopup);
});


imageAvatar.addEventListener('mouseover', function () {
    buttonImage.style.display = "block";
}
);

buttonImage.addEventListener('mouseout', function () {
    buttonImage.style.display = "none";
}
);

buttonImage.addEventListener('click', function () {
    openPopup(updateAvatar);
}
);

profileButtonRedaction.addEventListener('click', function () {
    openPopup(profilePopup);
    textName.value = profileTitle.textContent;
    textDescription.value = profileSubtitle.textContent;
}
);

const formButtonSave = addCardPopup.querySelector(".form__button-save");

addCardButton.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    openPopup(addCardPopup);
    addCardForm.reset();
    formButtonSave.setAttribute('disabled', 'disabled');
    formButtonSave.classList.add("form__button-save_inactive");
}
);
