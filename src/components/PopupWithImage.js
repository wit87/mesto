import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  //Открыть попап
  open(name, link) {
    const imageBig = this._popup.querySelector('.popup__image');
    const imageBigTitle = this._popup.querySelector('.popup__image-title');
    imageBig.src = link;
    imageBig.alt = name;
    imageBigTitle.textContent = name;
    super.open();
  }
}