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
const popupSaveButtonElement = popupElementEdit.querySelector('.popup__button-save')
const popupCloseButtonElement = popupElementEdit.querySelector('.popup__button-close')

const popupElementAdd = document.querySelector('.popup_add')
const newMestoElement = popupElementAdd.querySelector('.popup__input_type_mesto')
const newLinkElement = popupElementAdd.querySelector('.popup__input_type_link')
const popupFormElementAdd = popupElementAdd.querySelector('.popup__form')
const popupCloseCardAddElement = popupElementAdd.querySelector('.popup__button-close')
const popupSaveButtonElementAdd = popupElementAdd.querySelector('.popup__button-save')

const cardTemplate = document.querySelector('.template').content
const cardCase = document.querySelector('.elements__grid')

const imagePopup = document.querySelector('.popup_image')
const imageElement = imagePopup.querySelector('.popup__image')
const imageCaption = imagePopup.querySelector('.popup__image-title')
const popupCloseImagePopup = imagePopup.querySelector('.popup__button-close')


//Создание карточек
function getCard(name, link) {
    const newCard = cardTemplate.querySelector('.element').cloneNode(true);
    const cardText = newCard.querySelector('.element__title');
    const cardImage = newCard.querySelector('.element__image');
    const cardLikeButton = newCard.querySelector('.element__button-like');
    const cardDeleteButton = newCard.querySelector('.element__button-delete');
    cardText.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    // Функция лайков на карточках
    cardLikeButton.addEventListener('click', () => {
        cardLikeButton.classList.toggle('element__button-like_active');
    });

    // Удаление карточки
    cardDeleteButton.addEventListener('click', function (evt) {
        const evtTarget = evt.target
        evtTarget.closest('.element').remove();
    });

    // Открытие картинок
    cardImage.addEventListener('click', openImagePopup);

    return newCard;
}

initialCards.forEach(function (el) {
    cardCase.append(getCard(el.name, el.link));
});


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
        if (event.key === 'Escape') {
            popups.forEach((popup) => {
                closePopup(popup);
            })
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
function openImagePopup(event) {
    const clickElement = event.target.closest(".element__image");
    openPopup(imagePopup);
    imageElement.src = clickElement.src;
    imageElement.alt = clickElement.alt;
    imageCaption.textContent = clickElement.alt;
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


// Создание новой карточки
const addNewElement = (evt) => {
    evt.preventDefault();

    popupSaveButtonElementAdd.setAttribute("disabled", true);
    popupSaveButtonElementAdd.classList.add(validationConfig.inactiveButtonClass);

    const newMesto = newMestoElement.value;
    const newLink = newLinkElement.value;
    cardCase.prepend(getCard(newMesto, newLink));
    closePopup(popupElementAdd);
    popupFormElementAdd.reset();
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