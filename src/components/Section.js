export default class Section {
  constructor({ renderer }, containerSelector) {
  this._renderer = renderer;
  this._container = document.querySelector(containerSelector);
} 

//Отрисовать элементы
renderItems(items) {
  items.reverse().forEach(item => this._renderer(item));
} 

//Добавить элемент
addItem(element) {
  this._container.prepend(element);
}
  
} 