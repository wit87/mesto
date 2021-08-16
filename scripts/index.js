import initialCards from './initialCards.js'
import validationConfig from './validationConfig.js'
import FormValidator from './FormValidator.js';
import Card from './Card.js'



// Делаем выборку DOM элементов
const profileElement = document.querySelector('.profile')
const popupOpenButtonElement = profileElement.querySelector('.profile__edit-button')
const profileName = profileElement.querySelector('.profile__name')
const profileJob = profileElement.querySelector('.profile__job')
const popupOpenButtonElementAdd = profileElement.querySelector('.profile__add-button')

const openedPopup = '.popup_is-opened';

const popupProfileEdit = document.querySelector('.popup_edit')
const popupProfileNameInput = popupProfileEdit.querySelector('.popup__input_type_name')
const popupProfileJobInput = popupProfileEdit.querySelector('.popup__input_type_job')
const popupProfileForm = popupProfileEdit.querySelector('.popup__form')
const popupCloseButtonElement = popupProfileEdit.querySelector('.popup__button-close')

const popupCardAdd = document.querySelector('.popup_add')
const newMestoInput = popupCardAdd.querySelector('.popup__input_type_mesto')
const newLinkInput = popupCardAdd.querySelector('.popup__input_type_link')
const popupCardAddForm = popupCardAdd.querySelector('.popup__form')
const popupCloseCardAddElement = popupCardAdd.querySelector('.popup__button-close')
const cardsGrid = document.querySelector('.cards__grid')

const viewImage = document.querySelector('.popup__image');
const viewTitle = document.querySelector('.popup__image-title');
const cardTemplate = '.template';

const imagePopup = document.querySelector('.popup_image')
const popupCloseImagePopup = imagePopup.querySelector('.popup__button-close')

// Cоздание карточки
const createCard = (data) => {
    const card = new Card(data.name, data.link, cardTemplate, handleCardClick);
    const cardElement = card.generateCard();
    // Добавляем в DOM
    cardsGrid.prepend(cardElement);
}

// прорисовка карточек
const renderCards = function () {
    initialCards.forEach(function (item) {
        createCard(item)
    })
}

renderCards();


// Создание новой карточки
const addNewElement = (evt) => {
    evt.preventDefault()
    createCard({
        name: newMestoInput.value,
        link: newLinkInput.value
    });
    closePopup(popupCardAdd);
    popupCardAddForm.reset();
    validationFormCard.resetValidation()
};

// Открыть всплывающее окно
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keyup', handleEsc);
    popup.addEventListener('mousedown', closePopupByClickOutside);
}


// Закрыть всплывающее окно 
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keyup', handleEsc);
    popup.removeEventListener('mousedown', closePopupByClickOutside);
}

// Закрытие окона по клику на Esc
function handleEsc(event) {
    if (event.key === 'Escape') {
        const activePopup = document.querySelector(openedPopup);
        closePopup(activePopup);

    }
}

//закрытие окона по клику на затемненную область
function closePopupByClickOutside(evt) {
    if (evt.target === evt.currentTarget) {
        const activePopup = document.querySelector(openedPopup);
        closePopup(activePopup);

    }
}

// Открыть всплывающее окно редактирование профиля
const openProfilePopup = function () {
    openPopup(popupProfileEdit);
    popupProfileNameInput.value = profileName.textContent;
    popupProfileJobInput.value = profileJob.textContent;
}


// Функция по замене текста  редактирование профиля
const handleProfileSubmit = function (evt) {
    evt.preventDefault();
    profileName.textContent = popupProfileNameInput.value;
    profileJob.textContent = popupProfileJobInput.value;
    closePopup(popupProfileEdit);
}

// Открыть окно с картинкой функция
function handleCardClick(name, link) {
    viewImage.src = link;
    viewImage.alt = name;
    viewTitle.textContent = name;
    openPopup(imagePopup);
};

// Регистрируем обработчики событий по клику
// редактирование профиля
popupOpenButtonElement.addEventListener('click', openProfilePopup)
popupCloseButtonElement.addEventListener('click', () => closePopup(popupProfileEdit))
popupProfileForm.addEventListener('submit', handleProfileSubmit)

// добавление нового элемента
popupOpenButtonElementAdd.addEventListener('click', () => openPopup(popupCardAdd))
popupCloseCardAddElement.addEventListener('click', () => closePopup(popupCardAdd))
popupCardAddForm.addEventListener('submit', addNewElement)

// открытие изображения
popupCloseImagePopup.addEventListener('click', () => closePopup(imagePopup))

//Валидация
const validationFormProfile = new FormValidator(validationConfig, popupProfileForm);
const validationFormCard = new FormValidator(validationConfig, popupCardAddForm);

validationFormProfile.enableValidation();
validationFormCard.enableValidation();