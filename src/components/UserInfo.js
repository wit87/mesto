export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._name = nameSelector;
    this._about = aboutSelector;
  }

  // получить данные
  getUserInfo() {
      return {
        name: this._name.textContent,
        about: this._about.textContent
    };
  }

  // установить данные
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }  
  }