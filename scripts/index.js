// Делаем выборку DOM элементов

const popupOpenButtonElement = document.querySelector('.profile__edit-button')
const popupElement = document.querySelector('.popup')
const popupCloseButtonElement = document.querySelector('.popup__close-button')

const openpopup = function () {
    popupElement.classList.add('popup_is-opened')
    console.log('Open popup clicked')
}

const closepopup = function () {
    popupElement.classList.remove('popup_is-opened')
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


// Ффункции обратного вызова
const addEventListener = function (type, callback) {
    console.log(type)
    const event = {
        target: '',
        currentTarget: ''
    }
    callback(event)
}