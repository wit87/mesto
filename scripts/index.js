// Делаем выборку DOM элементов

const editOpenButtonElement = document.querySelector('.profile__edit-button')
const editElement = document.querySelector('.edit-form')
const editCloseButtonElement = document.querySelector('.edit-form__close-button')

console.log(editElement) 
console.log(editOpenButtonElement, editElement, editCloseButtonElement)

const openEdit = function() {
  editElement.classList.add('edit-form_is-opened')
  console.log('Open edit clicked')
}

const closeEdit = function() {
  editElement.classList.remove('edit-form_is-opened')
}

//Функция, которая закрывает окошко по клику на затемненную область

const closeEditByClickOnOverlay = function(event) {
  console.log(event.target, event.currentTarget)
  if (event.target !== event.currentTarget) {
    return
  }

  closeEdit()
}

// Регистрируем обработчики событий по клику
editOpenButtonElement.addEventListener('click', openEdit)
editCloseButtonElement.addEventListener('click', closeEdit)
editElement.addEventListener('click', closeEditByClickOnOverlay)


// Ффункции обратного вызова
const addEventListener = function(type, callback) {
  console.log(type)
  const event = {
    target: '',
    currentTarget: ''
  }
  callback(event)
}
