// Токен
export const token = 'c8515107-f4ca-4786-9dbe-57c915771a5d';
// Идентификатор группы
export const url = 'https://mesto.nomoreparties.co/v1/cohort-27/';

// Данные профиля и аватар
export const userName = '.profile__name';
export const userAbout = '.profile__about';
export const userAvatar = '.profile__avatar';

// Кнопки редактирование профиля и добавление карточек
export const avatarImg = document.querySelector(userAvatar);
export const popupOpenButtonEditProfile = document.querySelector('.profile__edit-button')
export const popupOpenButtonAddPhoto = document.querySelector('.profile__add-button')


// Popups
export const popupProfileEdit = '.popup_edit-profile'
export const popupCardAdd = '.popup_add-card'
export const imagePopup = '.popup_image-big'
export const popupEditAvatar = '.popup_edit-avatar'
export const popupCardDelete = '.popup_delete-card'

// формы Popup
export const popupProfileEditForm = document.querySelector(popupProfileEdit).querySelector('.popup__form')
export const popupCardAddForm = document.querySelector(popupCardAdd).querySelector('.popup__form')
export const popupEditAvatarForm = document.querySelector(popupEditAvatar).querySelector('.popup__form')

// инпуты редактирования профиля
export const profileNameInput = document.querySelector('.popup__input_type_name')
export const profileAboutInput = document.querySelector('.popup__input_type_about')  

// Карточки
export const cardsGrid = '.cards__grid';
export const cardTemplate = '.card-template';

// Для валидации
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_visible',
  };