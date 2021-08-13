export default class Card {

  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name
    this._link = link
    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick
  }

  _getCard() {
    this._cardTemplate = document.querySelector(this._cardSelector).content;
    return this._cardTemplate.querySelector('.card').cloneNode(true);
  }

  _setEventListeners() {
    this._cardText = this._element.querySelector('.card__title');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardDeleteButton = this._element.querySelector('.card__button-delete');
    this._cardLikeButton = this._element.querySelector('.card__button-like');
    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    // Лайк карточек
    this._cardLikeButton.addEventListener('click', () => {
      this._cardLikeButton.classList.toggle('card__button-like_active');
    });

    // Удаление карточки
    this._cardDeleteButton.addEventListener('click', function (evt) {
      const evtTarget = evt.target
      evtTarget.closest('.card').remove();

    });

    // Открытие картинок
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)     
    });
  }

  generateCard() {
    this._element = this._getCard();
    this._element.querySelector('.card__image').style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}

