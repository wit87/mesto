export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  // получить данные
  getUserInfo() {
      return {
        name: this._name.textContent,
        job: this._job.textContent
    };
  }

  // установить данные
  setUserInfo(profileNameInput, profileJobInput) {
    this._name.textContent = profileNameInput.value
    this._job.textContent = profileJobInput.value
  }  
  }