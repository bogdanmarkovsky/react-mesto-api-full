import { apiUtils } from "./utils";

class Api {
  constructor(options) {
    this._baseUrl = options.serverUrl;
    this._headers = options.headers;
  }

  getCardsFromServer() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: apiUtils.headers,
      credentials: "include",
    })
      .then((result) => {
        if (result.ok) {
          return result;
        } else {
          return Promise.reject(`Ошибка: ${result.status}`);
        }
      })
      .then((result) => {
        return result.json();
      })
      .catch((err) => {
        console.log(err)
      });
  }

  setCardOnServer(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: apiUtils.headers,
      credentials: "include",
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      })
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          return Promise.reject(`Ошибка: ${result.status}`);
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }

  setAvatarOnServer(ava) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: apiUtils.headers,
      credentials: "include",
      body: JSON.stringify({
        avatar: ava.avatar
      })
    })
      .then((result) => {
        if (result.ok) {
          return result;
        } else {
          return Promise.reject(`Ошибка: ${result.status}`);
        }
      })
      .then((result) => {
        return result.json();
      })
      .catch((err) => {
        console.log(err)
      });
  }

  deleteCardFromServer(item) {
    return fetch(`${this._baseUrl}/cards/${item._id}`, {
      method: 'DELETE',
      headers: apiUtils.headers,
      credentials: "include"
    })
      .then((result) => {
        if (result.ok) {
          return result;
        } else {
          return Promise.reject(`Ошибка: ${result.status}`);
        }
      })
      .then((result) => {
        return result.json();
      })
      .catch((err) => {
        console.log(err)
      });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: apiUtils.headers,
      credentials: "include"
    })
      .then((result) => {
        if (result.ok) {
          return result;
        } else {
          return Promise.reject(`Ошибка: ${result.status}`)
        }
      })
      .then((result) => {
        return result.json();
      })
  }

  getUserInfoFromServer() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: apiUtils.headers,
      credentials: "include"
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          return Promise.reject(`Ошибка: ${result.status}`)
        }
      });
  }

  setUserInfoOnServer(profileName, profileJob) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: apiUtils.headers,
      credentials: "include",
      body: JSON.stringify({
        name: profileName,
        about: profileJob
      })
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          return Promise.reject(`Ошибка: ${result.status} `);
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export default new Api(apiUtils);
