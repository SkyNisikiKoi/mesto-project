export class FormValidator {
    constructor(options, formElement) {
        this.inputSelector = options.inputSelector,
            this.submitButtonSelector = options.submitButtonSelector,
            this.inactiveButtonClass = options.inactiveButtonClass,
            this.inputErrorClass = options.inputErrorClass,
            this.errorClass = options.errorClass,
            this.formElement = formElement,
            this._inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector)),
            this._buttonElement = this.formElement.querySelector(this.submitButtonSelector)
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', 'disabled');
        } else {
            this._buttonElement.classList.remove(this.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    };

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    };

    _showInputError(inputElement, errorMessage) {
        const errorElement = document.getElementById(`${inputElement.id}-error`);
        inputElement.classList.add(this.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.errorClass);
    };



    _hideInputError(inputElement) {
        const errorElement = document.getElementById(`${inputElement.id}-error`);
        inputElement.classList.remove(this.inputErrorClass);
        errorElement.classList.remove(this.errorClass);
        errorElement.textContent = '';
    };


    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    enableValidation() {
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }
}
