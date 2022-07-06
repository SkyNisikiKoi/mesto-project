import './index/index.css';
import './components/card.js';
import './components/modal.js';
import './components/utils.js';
import './components/validate.js';
import './components/api';


const preload = document.querySelector(".preload");
preload.classList.remove('preload');

//Закрытие попапов esc

import { popupCloseEsc } from './components/utils.js';
import { popupCloseOverlay } from './components/utils.js';

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
import { exitUpdateAvatar } from './components/modal.js';
import { profileButtonRedaction } from './components/modal.js';
import { textDescription } from './components/modal.js';
import { modalWindowButtonExit } from './components/modal.js';
import { addCardButton } from './components/modal.js';
import { addCardPopup } from './components/modal.js';
import { exitButtonCardPopup } from './components/modal.js';
import { textName } from './components/modal.js';
import { textTitle } from './components/modal.js';
import { textLink } from './components/modal.js';

import { saveEditProfile } from './components/api.js';
import { deleteCard } from './components/api.js';
import { saveEditAvatar } from './components/api.js';

import { exitButtonModalPic } from './components/card.js';
import { formDeletionConfirmation } from './components/card.js';
import { popupdeletionConfirmation } from './components/card.js';


document.addEventListener('keydown', function (e) {
    popupCloseEsc(e);
});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('shadow_show')) {
        popupCloseOverlay(e);
    };
});

editProfileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const buttonSave = editProfileForm.querySelector('.form__button-save');

    buttonSave.textContent = 'Сохранение...';

    const newDataProfileSaved = await saveEditProfile(textName.value, textDescription.value);

    buttonSave.textContent = 'Сохранить';

    if (newDataProfileSaved) {
        profileTitle.textContent = textName.value;
        profileSubtitle.textContent = textDescription.value;
    }
    closePopup(profilePopup);
});


exitButtonModalPic.addEventListener('click', function () {
    closePopup(imagePopup);
}
);

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

exitUpdateAvatar.addEventListener('click', function () {
    closePopup(updateAvatar);
}
);



profileButtonRedaction.addEventListener('click', function () {
    openPopup(profilePopup);
    textName.value = profileTitle.textContent;
    textDescription.value = profileSubtitle.textContent;
}
);

modalWindowButtonExit.addEventListener('click', function () {
    closePopup(profilePopup);
}
);

addCardButton.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    openPopup(addCardPopup);
    textTitle.value = '';
    textLink.value = '';
}
);

exitButtonCardPopup.addEventListener('click', function () {
    closePopup(addCardPopup);
}
);


formDeletionConfirmation.addEventListener('submit', async function (e) {
    e.preventDefault();

    const buttonSave = formDeletionConfirmation.querySelector('.form__button-save_deletion-confirmation');

    buttonSave.textContent = 'Сохранение...';

    await deleteCard(e.target.cardId);

    buttonSave.textContent = 'Да';

    closePopup(popupdeletionConfirmation);
    const cardToDelete = document.getElementById(e.target.cardId);
    cardToDelete.remove();
});

const formUpdateAvatar = document.querySelector('.form_update-avatar');

formUpdateAvatar.addEventListener('submit', async function () {

    const linkImage = document.getElementById('linkImage');

    let link = linkImage.value;

    const buttonSave = formUpdateAvatar.querySelector('.form__button-save');

    buttonSave.textContent = 'Сохранение...';

    const newAvatar = await saveEditAvatar(link);

    buttonSave.textContent = 'Сохранить';

    if (newAvatar) {
        imageAvatar.setAttribute('src', newAvatar.avatar);
    }
    closePopup(updateAvatar);

});