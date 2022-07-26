export class FormValidator {
    constructor(options, formElement) {
       this.formSelector = options.formSelector,
       this.inputSelector = options.inputSelector,
       this.submitButtonSelector = options.submitButtonSelector,
       this.inactiveButtonClass = options.inactiveButtonClass,
       this.inputErrorClass = options.inputErrorClass,
       this.errorClass = options.errorClass,
       this.formElement = formElement
    }

    hasInvalidInput(inputList) {
    
        return inputList.some((inputElement) => {
      
          return !inputElement.validity.valid;
        })
      };
    
  toggleButtonState(inputList, buttonElement) {
      
        if (this.hasInvalidInput(inputList)) {
     
          buttonElement.classList.add(this.inactiveButtonClass);
          buttonElement.setAttribute('disabled', 'disabled');
        } else {
           
          buttonElement.classList.remove(this.inactiveButtonClass);
          buttonElement.removeAttribute('disabled');
        }
      };
    
      
 setEventListeners(formElement) {
        
        const inputList = Array.from(formElement.querySelectorAll(this.inputSelector));
       
        const buttonElement = formElement.querySelector(this.submitButtonSelector);
    
        this.toggleButtonState(inputList, buttonElement);
      
        
        inputList.forEach((inputElement) => {
          
          inputElement.addEventListener('input', () => {
           
            this.isValid(inputElement);
    
         
            this.toggleButtonState(inputList, buttonElement);
          });
        });
      };
    
    
   showInputError(inputElement, errorMessage) {
    
        const errorElement = document.getElementById(`${inputElement.id}-error`);
    
    
        inputElement.classList.add(this.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.errorClass);
      };
      
    
    
    hideInputError(inputElement) {
    
        const errorElement = document.getElementById(`${inputElement.id}-error`);
     
        inputElement.classList.remove(this.inputErrorClass);
        errorElement.classList.remove(this.errorClass);
        errorElement.textContent = '';
      }; 
    
    
    isValid(inputElement) {
        if (!inputElement.validity.valid) {
        
            this.showInputError(inputElement, inputElement.validationMessage);
        } else {
    
            this.hideInputError(inputElement);
        }
      };
     
    enableValidation(){
        const formElement = document.querySelector(this.formSelector);
    
        formElement.addEventListener('submit', (evt) => {
            
            evt.preventDefault();
        });
        this.setEventListeners(formElement);
    }

    
}
