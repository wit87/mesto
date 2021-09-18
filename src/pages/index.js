import './index.css';

import {
    token,
    url,
    popupOpenButtonEditProfile,
    popupOpenButtonAddPhoto,
    submitButtons,
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


// popup удаления карточки
const popupForDeleteCard = new PopupDeleteCard(popupCardDelete);

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

function handleCardDelete(card) {
    popupForDeleteCard.setFormSubmitHandler(() => {
        api.deleteCard(card._id)
            .then(() => {
                card.deleteCard();

                popupForDeleteCard.close();
            })
            .catch((err) => {
                console.log(`${err}`);
            });
    });
    popupForDeleteCard.open();
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

const api = new Api({
    url: url,
    headers: {
        authorization: token,
        'Content-Type': 'application/json',
    }
})

// данные пользователя
const user = new UserInfo({
    nameSelector: userName,
    aboutSelector: userAbout
});


const popupWithUserForm = new PopupWithForm({
    popupSelector: popupProfileEdit,
    handleFormSubmit: (item) => {
        renderLoading(true);
        api.setUserInfo(item)
            .then((data) => {
                user.setUserInfo(data);
                popupWithUserForm.close();
            })
            .catch((err) => {
                console.log(`${err}`);
            })
            .finally(() => {
                renderLoading(false);
            })
    }
});

// редактор профиля (КЛИК)
popupOpenButtonEditProfile.addEventListener('click', () => {
    validationFormProfile.setDefaultErrorState(popupProfileEditForm);

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
        renderLoading(true);
        api.createCard(item)
            .then((data) => {
                createdCard(data, userId, cardsList);
                popupWithPhotoForm.close();
            })
            .catch((err) => {
                console.log(`${err}`);
            })
            .finally(() => {
                renderLoading(false);
            })
    }
});

popupOpenButtonAddPhoto.addEventListener('click', () => {
    validationFormCard.setDefaultErrorState(popupCardAddForm);
    popupWithPhotoForm.open();
});

// обновление аватара
const PopupWithAvatarForm = new PopupWithForm({
    popupSelector: popupEditAvatar,
    handleFormSubmit: (item) => {
        renderLoading(true);
        api.setAvatar(item)
            .then((data) => {
                avatarImg.style.backgroundImage = `url(${data.avatar})`;
                PopupWithAvatarForm.close();
            })
            .catch((err) => {
                console.log(`${err}`)
            })
            .finally(() => {
                renderLoading(false);
            })
    }
});

// клик по аватару
avatarImg.addEventListener('click', () => {
    validationFormAvatar.setDefaultErrorState(popupEditAvatarForm);
    PopupWithAvatarForm.open();
});

Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cards, userData]) => {
        user.setUserInfo(userData);
        avatarImg.style.backgroundImage = `url(${userData.avatar})`;
        userId = userData._id;

        cardsList.renderItems(cards);
    })
    .catch((err) => {
        console.log(`${err}`);
    });

// уведомление пользователя о процессе загрузки
function renderLoading(isLoading) {
    if (isLoading) {
        Array.from(submitButtons).forEach((submit) => {
            submit.value = "Сохранение...";
        })
    } else {
        Array.from(submitButtons).forEach((submit) => {
            submit.value = "Сохранить";
        })
    }
}