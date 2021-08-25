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
  setUserInfo({ form_name, form_job }) {
      this._name.textContent = form_name;
      this._job.textContent = form_job;
    }
  }