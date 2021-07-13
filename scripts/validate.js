// проверка на валидность
const checkInputValidity = (inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;
    //показываем или скрываем сообщение об ошибке
    if (isInputNotValid) {
        const errorMessage = getErrorMessage(inputElement);
        showInputError(inputElement, errorMessage);
    } else {
        hideInputError(inputElement);
    }
};

// показываем ошибку
const showInputError = (inputElement, errorMessage) => {
    const formSectionElement = inputElement.closest(".popup__section");
    const errorElement = formSectionElement.querySelector(".popup__input-error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_visible");
    inputElement.classList.add("popup__input_error");
};

// скрываем ошибку
const hideInputError = (inputElement) => {
    const formSectionElement = inputElement.closest(".popup__section");
    const errorElement = formSectionElement.querySelector(".popup__input-error");
    errorElement.textContent = "";
    errorElement.classList.remove("popup__input-error_visible");
    inputElement.classList.remove("popup__input_error");
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
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, ) => {

    const handleFormSubmit = (event) => {
        event.preventDefault();
      };
      formElement.addEventListener("submit", handleFormSubmit);

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    const inputListIterator = (inputElement) => {
      const handleInput = () => {
        checkInputValidity(inputElement);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      };

      inputElement.addEventListener("input", handleInput);
    };

    inputList.forEach(inputListIterator);

    toggleButtonState(inputList, buttonElement, inactiveButtonClass);


}

// функция валидации форм 
const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    const formElements = document.querySelectorAll(formSelector);
    const formList = Array.from(formElements);
  
    formList.forEach((formElement) => {
      setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    });
  };

  
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_visible'
});