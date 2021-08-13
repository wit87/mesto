import initialCards from './initialCards.js'
import validationConfig from './validationConfig.js'
import FormValidator from './FormValidator.js';
import Card from './Card.js'

//Валидация
const formProfile = document.querySelector('.form-edit');
const formCard = document.querySelector('.form-create');

const validationFormProfile = new FormValidator(validationConfig, formProfile);
const validationFormCard = new FormValidator(validationConfig, formCard);

validationFormProfile.enableValidation();
validationFormCard.enableValidation();


// Делаем выборку DOM элементов
const profileElement = document.querySelector('.profile')
const popupOpenButtonElement = profileElement.querySelector('.profile__edit-button')
const profileName = profileElement.querySelector('.profile__name')
const profileJob = profileElement.querySelector('.profile__job')
const popupOpenButtonElementAdd = profileElement.querySelector('.profile__add-button')

const popupElementEdit = document.querySelector('.popup_edit')
const popupElementNameInput = popupElementEdit.querySelector('.popup__input_type_name')
const popupElementJobInput = popupElementEdit.querySelector('.popup__input_type_job')
const popupFormElement = popupElementEdit.querySelector('.popup__form')
const popupCloseButtonElement = popupElementEdit.querySelector('.popup__button-close')

const popupElementAdd = document.querySelector('.popup_add')
const newMestoElement = popupElementAdd.querySelector('.popup__input_type_mesto')
const newLinkElement = popupElementAdd.querySelector('.popup__input_type_link')
const popupFormElementAdd = popupElementAdd.querySelector('.popup__form')
const popupSaveButtonElementAdd = popupElementAdd.querySelector('.popup__button-save')
const popupCloseCardAddElement = popupElementAdd.querySelector('.popup__button-close')
const cardCase = document.querySelector('.cards__grid')

const imagePopup = document.querySelector('.popup_image')
const popupCloseImagePopup = imagePopup.querySelector('.popup__button-close')

// создание карточки

const createCard = (data, wrap) => {
    const card = new Card(data.name, data.link, '.template', handleCardClick)
    wrap.append(card.generateCard());
}

//Создание карточек
initialCards.forEach(function (el) {
    createCard(el, cardCase)
})

// Создание новой карточки
const addNewElement = (evt) => {
    evt.preventDefault()
    popupSaveButtonElementAdd.setAttribute("disabled", true);
    createCard({
        name: newMestoElement.value,
        link: newLinkElement.value
    }, cardCase);

    closePopup(popupElementAdd);
    popupFormElementAdd.reset();
};

// Открыть всплывающее окно
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keyup', handleEsc)
}


// Закрыть всплывающее окно 
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keyup', handleEsc)
}

// Закрытие окона по клику на Esc
function handleEsc(event) {
    if (event.key === 'Escape' || evt.key === 'Esc') {
        const activePopup = document.querySelector('.popup_is-opened');
        closePopup(activePopup);

    }
}

// Открыть всплывающее окно редактирование профиля
const openProfilePopup = function () {
    openPopup(popupElementEdit);
    popupElementNameInput.value = profileName.textContent;
    popupElementJobInput.value = profileJob.textContent;
}


// Функция по замене текста  редактирование профиля
const handleProfileSubmit = function (evt) {
    evt.preventDefault();
    profileName.textContent = popupElementNameInput.value;
    profileJob.textContent = popupElementJobInput.value;
    closePopup(popupElementEdit);
}

// Открыть окно с картинкой функция
function handleCardClick(name, link) {
    const viewImage = document.querySelector('.popup__image');
    const viewTitle = document.querySelector('.popup__image-title');
    viewImage.src = link;
    viewImage.alt = name;
    viewTitle.textContent = name;
    openPopup(imagePopup);
};

//закрытие окона по клику на затемненную область
const popups = document.querySelectorAll('.popup')

const closePopupByClickOnOverlay = function () {
    popups.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_is-opened')) {
                closePopup(popup)
            }
        })
    })
}

// Регистрируем обработчики событий по клику
// редактирование профиля
popupOpenButtonElement.addEventListener('click', openProfilePopup)
popupCloseButtonElement.addEventListener('click', () => closePopup(popupElementEdit))
popupElementEdit.addEventListener('click', closePopupByClickOnOverlay)
popupFormElement.addEventListener('submit', handleProfileSubmit)

// добавление нового элемента
popupOpenButtonElementAdd.addEventListener('click', () => openPopup(popupElementAdd))
popupCloseCardAddElement.addEventListener('click', () => closePopup(popupElementAdd))
popupElementAdd.addEventListener('click', closePopupByClickOnOverlay)
popupFormElementAdd.addEventListener('submit', addNewElement)

// открытие изображения
popupCloseImagePopup.addEventListener('click', () => closePopup(imagePopup))
imagePopup.addEventListener('click', closePopupByClickOnOverlay)