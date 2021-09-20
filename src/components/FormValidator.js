export default class FormValidator {
    constructor(data, targetFormElement) {
        this._sectionClass = data.sectionClass;
        this._formElement = data.formElement;
        this._inputElement = data.inputElement;
        this._submitButtonSelector = data.submitButtonSelector;
        this._disabledButtonClass = data.disabledButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorShowClass = data.errorShowClass;
        this._errorClass = data.errorClass;
        this._targetFormElement = targetFormElement;
    }

    // показываем ошибку
    _showInputError(inputElement, errorMessage) {
        const errorElement = inputElement.closest(this._sectionClass).querySelector(this._errorClass);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorShowClass);
    }

    // скрываем ошибку
    _hideInputError(inputElement) {
        const errorElement = inputElement.closest(this._sectionClass).querySelector(this._errorClass);

        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorShowClass);
        errorElement.textContent = '';
    }

    // проверка на валидность
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }


// извлекаем текст ошибки
    _findInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    // деактивация кнопки
    _toggleButtonState(inputList, submitButtonSelector) {
        if (this._findInvalidInput(inputList)) {
            submitButtonSelector.classList.add(this._disabledButtonClass);
            submitButtonSelector.setAttribute('disabled', true);
        } else {
            submitButtonSelector.classList.remove(this._disabledButtonClass);
            submitButtonSelector.removeAttribute('disabled');
        }
    }

    //устанавливаем слушателей на инпуты
    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputElement));
        const submitButtonSelector = formElement.querySelector(this._submitButtonSelector);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, submitButtonSelector);
            });
        });
    }

    setDefaultErrorState() {
        const inputList = Array.from(this._targetFormElement.querySelectorAll(this._inputElement));
        const submitButtonSelector = this._targetFormElement.querySelector(this._submitButtonSelector);

        inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });

        this._toggleButtonState(inputList, submitButtonSelector);
    };

    //Объявить функицю валидации
    enableValidation() {
        this.setDefaultErrorState(this._targetFormElement);
        this._setEventListeners(this._targetFormElement);

        this._targetFormElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });
    }

}