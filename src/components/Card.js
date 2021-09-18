export default class Card {
  constructor(data, handleCardClick, { handleLikeClick, handleCardDelete }, currentId, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
    this._currentId = currentId;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._likes = data.likes;
    this._handleCardDelete = handleCardDelete;
}

_getCard() {
  const cardElement = document
  .querySelector(this._cardSelector)
  .content
  .querySelector('.card')
  .cloneNode(true);

  return cardElement;
}

//отображение кнопки удалить
_getButtonDeleteShow() {
    if (this._ownerId === this._currentId) {
      this._cardDeleteButton.classList.add('card__button-delete_visible');
    }
}

//лайки
isLiked() {
    return this._isLiked;
}

setLike(data) {
  //проверка лайка по id
    this._isLiked = data.likes.filter((item) => { return item._id == this._currentId; }).length > 0;
    this._cardLikeCounter.textContent = data.likes.length;

    if (this._isLiked) {
      this._cardLikeButton.classList.add('card__button-like_active');
    } else {
      this._cardLikeButton.classList.remove('card__button-like_active');
    }
}

//удаление карточки
deleteCard() {
    this._element.remove();
    this._element = null;
}

// отрисовка карточки
renderCard() {
  this._element = this._getCard();
  this._cardText = this._element.querySelector('.card__title');
  this._cardImage = this._element.querySelector('.card__image');
  this._cardDeleteButton = this._element.querySelector('.card__button-delete');
  this._cardLikeButton = this._element.querySelector('.card__button-like');
  this._cardLikeCounter = this._element.querySelector('.card__like-counter');

  this._cardText.textContent = this._name;
  this._cardImage.src = this._link;
  this._cardImage.alt = this._name;
  this._cardLikeCounter.textContent = this._likes.length;

  this._getButtonDeleteShow();
  this._setEventListeners();

  return this._element;
}

//слушатели событий
_setEventListeners() {
// Удаление карточки
this._cardDeleteButton.addEventListener('click', () => this._handleCardDelete());
// Лайк карточек
this._cardLikeButton.addEventListener('click', () => this._handleLikeClick());
// Открытие картинок
this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
}

}
