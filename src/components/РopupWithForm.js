import { Popup } from './Рopup';

export class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmitForm) {
        super(popupSelector)
        this._callbackSubmitForm = callbackSubmitForm
        this._inputList = this.popup.querySelectorAll('.form__item'),
        this._form = this.popup.querySelector('.form')
    }

    _getInputValues() {
        const imputValue = {};
        this._inputList.forEach(input => 
            imputValue[input.name] = input.value);
        return imputValue;
       };
    
    
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._callbackSubmitForm(this._getInputValues());

    });
}

    close() {
        super.close();
        this._form.reset()
    }
}




  