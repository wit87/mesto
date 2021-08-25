import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
}

  //Открыть попап
  open(name, link) {
    super.open();
    const imageBig = document.querySelector('.popup__image');
    const imageBigTitle = document.querySelector('.popup__image-title');
    imageBig.src = link;
    imageBig.alt = name;
    imageBigTitle.textContent = name;    
  }
}

