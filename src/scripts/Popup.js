export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this);
    this._clickClose = this._clickClose.bind(this);
  }


  //Открытие
  open() {
    this._setEventListeners();
    this._popup.classList.add('popup_is-opened');
  }


  //Закрытие
  close() {
    this._removeEventListeners();
    this._popup.classList.remove('popup_is-opened');
  }


  //Закрыть по ESC
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }


  //закрытие окна по клику
  _clickClose(evt) {
    if (evt.target.classList.contains('popup__button-close') || evt.target.classList.contains('popup'))
      this.close();
  }


  //Установить слушатели событий
  _setEventListeners() {
    this._popup.addEventListener('click', this._clickClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  //Убрать слушатели событий
  _removeEventListeners() {
    this._popup.removeEventListener('click', this._clickClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }

}