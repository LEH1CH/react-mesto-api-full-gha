import { connectionConfig } from './constants.js';

class Api {
  constructor({ server, profileDataPath, cardsDataPath, token, group }) {
    this._server = server;
    this._profileDataPath = profileDataPath;
    this._cardsDataPath = cardsDataPath;
    this._token = token;
    this._group = group;
  }

  //Метод отправки запроса к серверу
  _requestServer(path, message) {
    return fetch(path, message).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.status);
    });
  }

  //Метод формирования запроса данных профиля
  getProfileData() {
    const path = `${this._server}/${this._profileDataPath}`;
    return this._requestServer(path);
  }

  //Метод формирования запроса для изменения данных профиля
  modifyProfileData({ name, about }, token) {
    const path = `${this._server}/${this._profileDataPath}`;
    const message = {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    };
    return this._requestServer(path, message);
  }

  //Метод формирования запроса для изменения аватара
  setUserAvatar({ link }, token) {
    const path = `${this._server}/${this._profileDataPath + '/avatar'}`;
    const message = {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link,
      }),
    };
    return this._requestServer(path, message);
  }

  //Метод формирования запроса базы карточек
  getInitialCards(token) {
    const path = `${this._server}/${this._cardsDataPath}`;
    return this._requestServer(path, {
      headers: { authorization: `Bearer ${token}` },
    });
  }

  //Метод формирования запроса на добавление карточки
  addNewCard({ name, link }, token) {
    const path = `${this._server}/${this._cardsDataPath}`;
    const message = {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    };
    return this._requestServer(path, message);
  }

  //Метод формирования запроса для установки или снятия лайка
  changeLikeCardStatus(cardId, isLiked, token) {
    const path = `${this._server}/${this._cardsDataPath}/${cardId + '/likes'}`;
    const action = isLiked ? 'DELETE' : 'PUT';
    const message = {
      method: action,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    return this._requestServer(path, message);
  }

  //Метод формирования запроса для удаления карточки
  deleteCard(cardId, token) {
    const path = `${this._server}/${this._cardsDataPath}/${cardId}`;
    const message = {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    return this._requestServer(path, message);
  }
}

const api = new Api(connectionConfig);

export default api;
