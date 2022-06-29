export function popupCloseEsc(evt) {
    if (evt.key == "Escape") { //TODO возможно нужно перенести в слушаетль страницы
        let popup = document.querySelector('.shadow_show');
        popup.classList.remove("shadow_show");
    };
};

export function popupCloseOverlay() {
    let popup = document.querySelector('.shadow_show')
    if (popup) {
        popup.classList.remove("shadow_show");
    };
};

