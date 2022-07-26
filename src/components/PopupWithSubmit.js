import { Popup } from './popup';

export class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

    setEventListeners() {
        super.setEventListeners();
        this.popup.querySelector('.form').addEventListener('submit', (evt) => {
          evt.preventDefault();;
          this.submitCallback()
    });
  
}
    setSubmitCallback(submitCallback){
        this.submitCallback = submitCallback;
    }
}