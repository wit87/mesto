export default class FormValidator {
    constructor(data, formElement) {
        this._data = data;
        this._formElement = formElement;
        this._inputsList = Array.from(
            this._formElement.querySelectorAll(this._data.inputSelector)
        );
        this._buttonElement = this._formElement.querySelector(
            this._data.submitButtonSelector
        );
    }

    // определяем элемент с текстом ошибки 
    _returnErrorElement(inputElement) {
        return this._formElement.querySelector(`#${inputElement.id}-error`);
    }

    // показываем ошибку
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._returnErrorElement(inputElement);
        inputElement.classList.add(this._data.inputErrorClass);
        errorElement.classList.add(this._data.errorClass);
        errorElement.textContent = errorMessage;
    }

    // скрываем ошибку
    _hideInputError(inputElement) {
        const errorElement = this._returnErrorElement(inputElement);
        inputElement.classList.remove(this._data.inputErrorClass);
        errorElement.classList.remove(this._data.errorClass);
        errorElement.textContent = "";
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
    _findInvalidInput(inputsList) {
        return inputsList.some((inputElement) => !inputElement.validity.valid);
    }

    _onInput(inputElement) {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
    }

    // деактивация кнопки
    _toggleButtonState() {
        const showDisabled = this._findInvalidInput(this._inputsList);

        this._buttonElement.disabled = showDisabled;
        if (showDisabled) {
            this._buttonElement.classList.add(this._data.inactiveButtonClass);
        } else {
            this._buttonElement.classList.remove(this._data.inactiveButtonClass);
        }
    }


    //устанавливаем слушателей на инпуты
    _setEventListeners() {
        this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
        this._inputsList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => this._onInput(inputElement));
        });
    }

    //Объявить функицю валидации
    enableValidation() {
        this._toggleButtonState();
        this._setEventListeners();
    }

    //сброс валидации
    resetValidation() {
        this._formElement.reset();
        this._inputsList.forEach((inputElement) => this._hideInputError(inputElement));
        this._toggleButtonState();
    }
}