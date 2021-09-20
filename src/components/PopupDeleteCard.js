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

  // уведомление пользователя о процессе загрузки
setLoading(isLoading) {
        if (isLoading) {
          this._buttonElement.textContent = "Да";
        } else {
          this._buttonElement.textContent = "Удаление...";
        }
      }

setEventListeners() {
    super._setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        this.submitHandler();
    });
}

close() {
    this._formElement.removeEventListener('submit', (event) => {
        event.preventDefault();
        this.submitHandler();
    });
    super.close();
    }
}