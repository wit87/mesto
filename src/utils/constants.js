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

// для валидации
const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_visible',
};

// Массив карточек
import kremlin from '../images/mesto/moskovsky-kreml-1.jpg';
import hrista from '../images/mesto/hram-hrista.jpg';
import rzhev from '../images/mesto/rzhev-memory.jpg';
import avrora from '../images/mesto/avrora.jpg';
import baikal from '../images/mesto/baikal.jpg';
import pskov from '../images/mesto/pskovskiy_kreml_4.jpg';

const initialCards = [{
    name: 'Московский Кремль',
    link: kremlin
},
{
    name: 'Храм Христа Спасителя',
    link: hrista
},
{
    name: 'Ржевский мемориал',
    link: rzhev
},
{
    name: 'Крейсер «Аврора»',
    link: avrora
},
{
    name: 'Озеро Байкал',
    link: baikal
},
{
    name: 'Псковский Кремль',
    link: pskov
}
];

export 
{
popupProfileEdit,
popupCardAdd,
imagePopup,
popupProfileForm,
popupCardAddForm,
cardsGrid,
cardTemplate,
profileElement,
popupOpenButtonEditProfile,
popupOpenButtonAddPhoto,
profileData,
popupProfileNameInput,
popupProfileJobInput,
validationConfig,
initialCards
}