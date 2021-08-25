export default class Card {

  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name
    this._link = data.link
    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick
  }

  _getCard() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    // Удаление карточки
    this._cardDeleteButton.addEventListener('click', () => {
      this._deleteCard();
    });

    // Лайк карточек
    this._cardLikeButton.addEventListener('click', () => {
      this._likeToggle();
    });

    // Открытие картинок
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)      
    });
  }

  _likeToggle() {
    this._cardLikeButton.classList.toggle('card__button-like_active');
  }

  _deleteCard() {
    this._cardDeleteButton.closest('.card').remove();
  }

  renderCard() {
    this._element = this._getCard();
    this._cardText = this._element.querySelector('.card__title');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardDeleteButton = this._element.querySelector('.card__button-delete');
    this._cardLikeButton = this._element.querySelector('.card__button-like');

    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

}
