export class Popup {
    constructor(popupSelector) {
        this.popup = document.querySelector(popupSelector)
    }

    open() {
        this.popup.classList.add("shadow_show");
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this.popup.classList.remove("shadow_show");
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {   
        if (evt.key == "Escape") {
            this.close();        
        };
    }

    setEventListeners() {
        this.popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('shadow_show')) {
                this.close()
            }
            if (evt.target.classList.contains('modal-window__buttons-exit')) {
                this.close()
            }
        })
    }
}


   
