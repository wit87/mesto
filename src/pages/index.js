import './index.css';

import {
    token,
    url,
    popupOpenButtonEditProfile,
    popupOpenButtonAddPhoto,
    popupProfileEdit,
    popupCardAdd,
    imagePopup,
    popupEditAvatar,
    popupCardDelete,
    popupProfileEditForm,
    popupCardAddForm,
    popupEditAvatarForm,
    userName,
    userAbout,
    userAvatar,
    avatarImg,
    profileNameInput,
    profileAboutInput,
    cardsGrid,
    cardTemplate,
    validationConfig
} from '../utils/constants.js'

import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import UserInfo from '../components/UserInfo.js';

let userId = null;

const api = new Api({
    url: url,
    headers: {
        authorization: token,
        'Content-Type': 'application/json',
    }
})

// popup удаления карточки
const popupForDeleteCard = new PopupDeleteCard(popupCardDelete);
popupForDeleteCard.setEventListeners();

function handleCardDelete(card) {
    popupForDeleteCard.open();
    popupForDeleteCard.setLoading(true);
    popupForDeleteCard.setFormSubmitHandler(() => {        
        api.deleteCard(card._id)
            .then(() => {
                card.deleteCard();

                popupForDeleteCard.close();
            })
            .catch((err) => {
                console.log(`${err}`);
            })
            .finally(() => {
                popupForDeleteCard.setLoading(false);
            })
    });    
}

// увеличенное изображение
function handleCardClick(name, link) {
    openImageBigPopup.open(name, link);
};

function handleLikeClick(card, data) {
    const promise = card.isLiked() ? api.dislikeCard(data._id) : api.likeCard(data._id);
    promise
        .then((data) => {
            card.setLike(data);
        })
        .catch((err) => {
            console.log(`${err}`);
        });
}

function createdCard(data, userId, cardsList) {
    const newCard = new Card(data,
        handleCardClick, {
            handleLikeClick: () => handleLikeClick(newCard, data),
            handleCardDelete: () => handleCardDelete(newCard)
        },
        userId,
        cardTemplate);
    const cardElement = newCard.renderCard();
    newCard.setLike(data);
    cardsList.addItem(cardElement);
}

//Валидация
const validationFormProfile = new FormValidator(validationConfig, popupProfileEditForm);
validationFormProfile.enableValidation();

const validationFormCard = new FormValidator(validationConfig, popupCardAddForm);
validationFormCard.enableValidation();

const validationFormAvatar = new FormValidator(validationConfig, popupEditAvatarForm);
validationFormAvatar.enableValidation();

// открытие большой картинки
const openImageBigPopup = new PopupWithImage(imagePopup);

const popupWithUserForm = new PopupWithForm({
    popupSelector: popupProfileEdit,
    handleFormSubmit: (item) => {
        popupWithUserForm.renderLoading(true);
        api.setUserInfo(item)
            .then((data) => {
                user.setUserInfo(data);
                popupWithUserForm.close();
            })
            .catch((err) => {
                console.log(`${err}`);
            })
            .finally(() => {
                popupWithUserForm.renderLoading(false);
            })
    }
});

// редактор профиля (КЛИК)
popupOpenButtonEditProfile.addEventListener('click', () => {
    validationFormProfile.setDefaultErrorState();

    const userData = user.getUserInfo();

    profileNameInput.value = userData.name;
    profileAboutInput.value = userData.about;
    popupWithUserForm.open();
});

const cardsList = new Section({
    renderer: (item) => {
        createdCard(item, userId, cardsList);
    },
}, cardsGrid);

// добавление новой карточки
const popupWithPhotoForm = new PopupWithForm({
    popupSelector: popupCardAdd,
    handleFormSubmit: (item) => {
        popupWithPhotoForm.renderLoading(true);
        api.createCard(item)
            .then((data) => {
                createdCard(data, userId, cardsList);
                popupWithPhotoForm.close();
            })
            .catch((err) => {
                console.log(`${err}`);
            })
            .finally(() => {
                popupWithPhotoForm.renderLoading(false);
            })
    }
});

popupOpenButtonAddPhoto.addEventListener('click', () => {
    validationFormCard.setDefaultErrorState();
    popupWithPhotoForm.open();
});

// обновление аватара
const popupWithAvatarForm = new PopupWithForm({
    popupSelector: popupEditAvatar,
    handleFormSubmit: (item) => {
        popupWithAvatarForm.renderLoading(true);
        api.setAvatar(item)
            .then((data) => {
                avatarImg.style.backgroundImage = `url(${data.avatar})`;
                popupWithAvatarForm.close();
            })
            .catch((err) => {
                console.log(`${err}`)
            })
            .finally(() => {
                popupWithAvatarForm.renderLoading(false);
            })
    }
});

// клик по аватару
avatarImg.addEventListener('click', () => {
    validationFormAvatar.setDefaultErrorState();
    popupWithAvatarForm.open();
});

// данные пользователя
const user = new UserInfo({
    nameSelector: userName,
    aboutSelector: userAbout,
    avatarSelector: userAvatar
});

Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cards, userData]) => {
        user.setUserInfo(userData);
        userId = userData._id;

        cardsList.renderItems(cards);
    })
    .catch((err) => {
        console.log(`${err}`);
    });