import initialCards from './initialCards.js'
import validationConfig from './validationConfig.js'
import FormValidator from './FormValidator.js';
import Card from './Card.js'
import Section from './Section.js'
import PopupWithForm from './PopupWithForm.js'
import PopupWithImage from './PopupWithImage.js'
import UserInfo from './UserInfo.js'

import '../pages/index.css';


// Делаем выборку DOM элементов
// Popups
const popupProfileEdit = '.popup_edit-profile'
const popupCardAdd = '.popup_add-card'
const imagePopup = '.popup_image-big'

// формы Popup
const popupProfileForm = document.querySelector(popupProfileEdit).querySelector('.popup__form')
const popupCardAddForm = document.querySelector(popupCardAdd).querySelector('.popup__form')

// Карточки
const cardsGrid = '.cards__grid';
const cardTemplate = '.card-template';

// Кнопки редактирование и добавление
const profileElement = document.querySelector('.profile')
const popupOpenButtonEditProfile = profileElement.querySelector('.profile__edit-button')
const popupOpenButtonAddPhoto = profileElement.querySelector('.profile__add-button')


// Данные профиля
const profileData = {
    nameSelector: '.profile__name',
    jobSelector: '.profile__job'
  };
  
// инпуты редактирования профиля
const popupProfileNameInput = document.querySelector(popupProfileEdit).querySelector('.popup__input_type_name')
const popupProfileJobInput = document.querySelector(popupProfileEdit).querySelector('.popup__input_type_job')

const newMestoInput = document.querySelector(popupCardAdd).querySelector('.popup__input_type_mesto')
const newLinkInput = document.querySelector(popupCardAdd).querySelector('.popup__input_type_link')


//Валидация
const validationFormProfile = new FormValidator(validationConfig, popupProfileForm);
validationFormProfile.enableValidation();

const validationFormCard = new FormValidator(validationConfig, popupCardAddForm);
validationFormCard.enableValidation();

// Рендеринг карточек начальный
const cardsList = new Section ({
    data: initialCards,
    renderer: (item) => {
    const сard = new Card(item, cardTemplate, handleCardClick);
    const сardElement = сard.renderCard();
    cardsList.addItem(сardElement);
    }
}, cardsGrid);
    
cardsList.renderItems();

// Открыть окно с картинкой функция
function handleCardClick(name, link) 
{
    const openImageBigPopup = new PopupWithImage(imagePopup);
    openImageBigPopup.open(name, link);
};


//редактирование профиля
const userInfo = new UserInfo(profileData);

//Создать экземпляр класса PopupWithForm
const popupWithUserForm = new PopupWithForm(
    popupProfileEdit, {
    handleFormSubmit: (userData) => {
    userInfo.setUserInfo(userData);
    popupWithUserForm.close();
    }    
  });

  //Открыть редактор профиля  клик
  popupOpenButtonEditProfile.addEventListener('click', () => {
    validationFormProfile.resetValidation();
    popupProfileNameInput.value = userInfo.getUserInfo().name;
    popupProfileJobInput.value = userInfo.getUserInfo().job; 
    popupWithUserForm.open();   
  });


//добавление карточки
const popupWithPhotoForm = new PopupWithForm(
    popupCardAdd, {
    handleFormSubmit: (cardItem) => { 
            const newCard = new Card({
                name: cardItem.form_mesto,
                link: cardItem.form_link
            }, cardTemplate, handleCardClick);
    document.querySelector(cardsGrid).prepend(newCard.renderCard());
    
    popupCardAddForm.reset();
    popupWithPhotoForm.close();
          }      
  });
  
  //Добавление фоток клик
  popupOpenButtonAddPhoto.addEventListener('click', () => {
    validationFormCard.resetValidation();
    popupWithPhotoForm.open();
  });