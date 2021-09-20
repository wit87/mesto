export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // получить данные
  getUserInfo() {
      return {
        name: this._name.textContent,
        about: this._about.textContent,
        avatar: this._avatar,
        id: this._id,
    };
  }

  // установить данные
  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
    this._avatar.style.backgroundImage = `url(${userData.avatar})`;
  }  
  }