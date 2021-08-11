export default class FormValidator {
  constructor(data, formElement) {
    this._formElement = formElement;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;

  }


  //Определить элемент с текстом ошибки 
  _returnErrorElement(inputElement) {
    return this._formElement.querySelector(`#${inputElement.id}-error`);
  }

  // проверка на валидность
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // показываем ошибку
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._returnErrorElement(inputElement);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }


  // скрываем ошибку
  _hideInputError(inputElement) {
    const errorElement = this._returnErrorElement(inputElement);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }


  // извлекаем текст ошибки
  _findInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // деактивация кнопки
  setInitialButtonState(isDisabled) {
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    buttonElement.disabled = isDisabled;
  }

  _toggleButtonState(inputList) {
    this.setInitialButtonState(this._findInvalidInput(inputList));
  }

  // находим слушателей событий
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._toggleButtonState(inputList);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  }

  // функция валидации форм 
  //Установить начальное состояние ошибок
  setDefaultErrorState() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //Объявить функицю валидации
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

}
