
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
    console.log(isInputNotValid)
};


// деактивация кнопки
const toggleButtonState = (inputList, buttonElement) => {
    const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
    const hasNotValidInput = inputList.some(findAtLeastOneNotValid);

    if (hasNotValidInput) {
        buttonElement.setAttribute("disabled", true);
        buttonElement.classList.add("popup__button-save_disabled");
    } else {
        buttonElement.removeAttribute("disabled");
        buttonElement.classList.remove("popup__button-save_disabled");
    }
};


// находим слушателей событий
const setEventListeners = (formElement) => {
    formElement.addEventListener("submit", (event) => {
        // отменяем отправку формы
        event.preventDefault();
    });



    //     formElement.addEventListener("submit", handleFormSubmit);

    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector(".popup__button-save");

    const inputListIterator = (inputElement) => {
      const handleInput = () => {
        checkInputValidity(inputElement);
        toggleButtonState(inputList, buttonElement);
      };

      inputElement.addEventListener("input", handleInput);
    };

    inputList.forEach(inputListIterator);

    toggleButtonState(inputList, buttonElement);


    //ищем поля ввода
    // const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    // inputList.forEach(inputElement => {

    //     inputElement.addEventListener('input', (event) => {
    //         console.log(event.target.name)
    //         //проверяем на валидность
    //         checkInputValidity(inputElement)

    //     })

    // });
}

// функция валидации форм 
const enableValidation = () => {
    //ищем формы
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach(setEventListeners);
};

enableValidation();

//селекторы элементов
// enableValidation({
//     formSelector: ".popup__form",
//     inputSelector: ".popup__input",
//     submitButtonSelector: '.popup__button-save',
//     inactiveButtonClass: '.popup__button_disabled',
//     inputErrorClass: 'popup__input_error',
//     errorClass: 'popup__input_error_visible'
// });