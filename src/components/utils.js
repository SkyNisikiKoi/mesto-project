import { closePopup } from './modal.js';

export function popupCloseEsc(evt) {
    if (evt.key == "Escape") { 
        const popup = document.querySelector('.shadow_show');
        closePopup(popup);
    };
};


