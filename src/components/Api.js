export default class Api {
    constructor({ url, headers }) {
        this.url = url;
        this.headers = headers;
    }

    _getRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this.url}users/me`, {
                headers: this.headers
            })
            .then(this._getRes)
    }

    getInitialCards() {
        return fetch(`${this.url}cards`, {
                headers: this.headers,
            })
            .then(this._getRes)
    }

    setUserInfo(item) {
        return fetch(`${this.url}users/me`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    name: item.name,
                    about: item.about
                })
            })
            .then(this._getRes)
    }

    createCard(newCard) {
        return fetch(`${this.url}cards`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    name: newCard.name,
                    link: newCard.link,
                })
            })
            .then(this._getRes)
    }

    deleteCard(id) {
        return fetch(`${this.url}cards/${id}`, {
                method: 'DELETE',
                headers: this.headers,
            })
            .then(this._getRes)
    }

    likeCard(id) {
        return fetch(`${this.url}cards/likes/${id}`, {
                method: 'PUT',
                headers: this.headers,
            })
            .then(this._getRes)
    }

    dislikeCard(id) {
        return fetch(`${this.url}cards/likes/${id}`, {
                method: 'DELETE',
                headers: this.headers,
            })
            .then(this._getRes)
    }

    setAvatar(avatar) {
        return fetch(`${this.url}users/me/avatar`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify(avatar),
            })
            .then(this._getRes)
    }
}