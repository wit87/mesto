const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_visible',
    popupSection: '.popup__section',
    errorBox: '.popup__input-error'
};


// проверка на валидность
const checkInputValidity = (inputElement, inputErrorClass, errorClass, popupSection, errorBox) => {
    const isInputNotValid = !inputElement.validity.valid;
    //показываем или скрываем сообщение об ошибке
    if (isInputNotValid) {
        const errorMessage = getErrorMessage(inputElement);
        showInputError(inputElement, errorMessage, inputErrorClass, errorClass, popupSection, errorBox );
    } else {
        hideInputError(inputElement, inputErrorClass, errorClass, popupSection, errorBox);
    }
};

// показываем ошибку
const showInputError = (inputElement, errorMessage, inputErrorClass, errorClass, popupSection, errorBox) => {
    const formSectionElement = inputElement.closest(popupSection);
    const errorElement = formSectionElement.querySelector(errorBox);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add(inputErrorClass);
};

// скрываем ошибку
const hideInputError = (inputElement, inputErrorClass, errorClass, popupSection, errorBox) => {
    const formSectionElement = inputElement.closest(popupSection);
    const errorElement = formSectionElement.querySelector(errorBox);
    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass);
};

// извлекаем текст ошибки
const getErrorMessage = (inputElement) => {
    const defaultErrorHandler = (inputElement) => inputElement.validationMessage;
    return defaultErrorHandler(inputElement);

}

// деактивация кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
    const hasNotValidInput = inputList.some(findAtLeastOneNotValid);

    if (hasNotValidInput) {
        buttonElement.setAttribute("disabled", true);
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.removeAttribute("disabled");
        buttonElement.classList.remove(inactiveButtonClass);
    }
};

// находим слушателей событий
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, popupSection, errorBox) => {

    const handleFormSubmit = (event) => {
        event.preventDefault();
      };
      formElement.addEventListener("submit", handleFormSubmit);

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    const iterateInputList = (inputElement) => {
      const handleInput = () => {
        checkInputValidity(inputElement, inputErrorClass, errorClass, popupSection, errorBox);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      };

      inputElement.addEventListener("input", handleInput);
    };

    inputList.forEach(iterateInputList);

    toggleButtonState(inputList, buttonElement, inactiveButtonClass);  
}

// функция валидации форм 
const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, popupSection, errorBox}) => {
    const formElements = document.querySelectorAll(formSelector);
    const formList = Array.from(formElements);
  
    formList.forEach((formElement) => {
      setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, popupSection, errorBox);
    });
  };

  
enableValidation(validationConfig);