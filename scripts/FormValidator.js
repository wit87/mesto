export default class FormValidator {
  constructor(data, formElement) {
    this._formElement = formElement;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }


  // определить элемент с текстом ошибки 
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
  _setInitialButtonState(isDisabled) {
    this._buttonElement.disabled = isDisabled;
  }

  _toggleButtonState(inputList) {
    this._setInitialButtonState(this._findInvalidInput(inputList));
  }

  _clearInputValue(inputElement) {
    inputElement.value = '';
  }

  resetValidation() {
    this._setInitialButtonState(true);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
      this._clearInputValue(inputElement)
    });
  }

  // находим слушателей событий
  _setEventListeners() {
    this._toggleButtonState(this._inputList);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  }


  // функция валидации форм 
  //Установить начальное состояние ошибок
  _setDefaultErrorState() {
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