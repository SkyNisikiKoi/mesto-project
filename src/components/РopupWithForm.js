import { Popup } from './Рopup';

export class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmitForm) {
        super(popupSelector)
        this._callbackSubmitForm = callbackSubmitForm
        this._inputList = this.popup.querySelectorAll('.form__item'),
        this._form = this.popup.querySelector('.form'),
        this._submitBtn = this.popup.querySelector('.form__button-save'),
        this._submitBtnText = this._submitBtn.textContent
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

    renderLoading(isLoading, loadingText='Сохранение...') {
        if (isLoading) {
          this._submitBtn.textContent = loadingText;
        } else {
          this._submitBtn.textContent = this._submitBtnText;
        }
      }

      setInputValues(data) {
        this._inputList.forEach((input) => {
          
          input.value = data[input.name];
        });
      }
}




  