import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
    this._buttonElement = this._popup.querySelector(".popup__button-save");
}

setFormSubmitHandler(cb) {
    this.submitHandler = cb;
}

_handleSubmit = (evt) => {
  evt.preventDefault();
  this.submitHandler();
};


  // уведомление пользователя о процессе загрузки
setLoading(isLoading) {
        if (isLoading) {
          this._buttonElement.textContent = "Удаление...";
        } else {
          this._buttonElement.textContent = "Да";
        }
      }

_setEventListeners() {
  super._setEventListeners();
  this._formElement.addEventListener("submit", this._handleSubmit)
  }

close() {
  this._formElement.removeEventListener("submit", this._handleSubmit)
  super.close();
  }

}