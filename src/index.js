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

import { exitButtonModalPic } from './components/card';

document.addEventListener('keydown', function (e) {
    popupCloseEsc(e);
});

document.addEventListener('click', function (e) {


    if (e.target.classList.contains('shadow_show')) {
        popupCloseOverlay(e);
    };
});

editProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    profileTitle.textContent = textName.value;
    profileSubtitle.textContent = textDescription.value;

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