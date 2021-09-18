import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
}

setFormSubmitHandler(handler) {
    this.setFormSubmitHandler = handler;
}

setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        this.setFormSubmitHandler();
    });
}
}