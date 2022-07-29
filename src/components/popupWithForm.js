import { Popup } from './popup';

export class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmitForm) {
        super(popupSelector)
        this._callbackSubmitForm = callbackSubmitForm
       
    }

    _getInputValues() {
        const imputValue = {};
        this.popup.querySelectorAll('.form__item').forEach(input => 
            imputValue[input.name] = input.value);
        return imputValue;
       };
    
    
    setEventListeners(handleFormReset) {
        this._handleFormReset = handleFormReset;
        super.setEventListeners();
        this.popup.querySelector('.form').addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._callbackSubmitForm(this._getInputValues());
          this.close();
    });
}

    close() {
        super.close();
        this._handleFormReset();
    }
}




 

  