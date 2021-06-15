// Делаем выборку DOM элементов

const popupOpenButtonElement = document.querySelector('.profile__edit-button')
const popupElement = document.querySelector('.popup')
const popupCloseButtonElement = popupElement.querySelector('.popup__button_close')

const profileElement = document.querySelector('.profile')
let profileName = profileElement.querySelector('.profile__name')
let profileJob = profileElement.querySelector('.profile__job')

let popupElementNameInput = popupElement.querySelector('.popup__input_name')
let popupElementJobInput = popupElement.querySelector('.popup__input_job')

const popupSaveButtonElement = popupElement.querySelector('.popup__button_save')



const openpopup = function () {
    popupElement.classList.add('popup_is-opened')
    
    popupElementNameInput.value = profileName.textContent;
    popupElementJobInput.value = profileJob.textContent;

}

const closepopup = function () {
    popupElement.classList.remove('popup_is-opened')
}


// Функция по замене текста
const formSubmitHandler = function (evt) {
    evt.preventDefault();
    profileName.textContent = popupElementNameInput.value;
    profileJob.textContent = popupElementJobInput.value;

    closepopup();
}

//Функция, которая закрывает окошко по клику на затемненную область

const closepopupByClickOnOverlay = function (event) {
    console.log(event.target, event.currentTarget)
    if (event.target !== event.currentTarget) {
        return
    }

    closepopup()
}

// Регистрируем обработчики событий по клику
popupOpenButtonElement.addEventListener('click', openpopup)
popupCloseButtonElement.addEventListener('click', closepopup)
popupElement.addEventListener('click', closepopupByClickOnOverlay)

popupSaveButtonElement.addEventListener('click', formSubmitHandler);

// Ффункции обратного вызова
const addEventListener = function (type, callback) {
    console.log(type)
    const event = {
        target: '',
        currentTarget: ''
    }
    callback(event)
}