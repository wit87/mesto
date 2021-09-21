import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageBig = this._popup.querySelector('.popup__image');
    this._imageBigTitle = this._popup.querySelector('.popup__image-title');
  }

  //Открыть попап
  open(name, link) {
    this._imageBig.src = link;
    this._imageBig.alt = name;
    this._imageBigTitle.textContent = name;
    super.open();
  }
}