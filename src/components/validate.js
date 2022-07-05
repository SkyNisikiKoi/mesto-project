
// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (settings, inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};


const setEventListeners = (settings, formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(settings, inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(settings, inputElement);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(settings, inputList, buttonElement);
    });
  });
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (settings, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = document.getElementById(`${inputElement.id}-error`);

  // Остальной код такой же
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};


// Функция, которая удаляет класс с ошибкой
const hideInputError = (settings, inputElement) => {
  // Находим элемент ошибки
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (settings, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(settings, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(settings, inputElement);
  }
};

function enableValidation(settings) {
  const formElement = document.querySelector(settings.formSelector);

  formElement.addEventListener('submit', (evt) => {
    // У каждой формы отменим стандартное поведение
    evt.preventDefault();
  });
  setEventListeners(settings, formElement);
}


enableValidation(
  {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button-save',
    inactiveButtonClass: 'form__button-save_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__input-error_active'
  }
);

enableValidation(
  {
    formSelector: '.form_plus',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button-save',
    inactiveButtonClass: 'form__button-save_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__input-error_active'
  }
);

enableValidation(
  {
    formSelector: '.form_update-avatar',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button-save',
    inactiveButtonClass: 'form__button-save_inactive',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__input-error_active'
  }
);



