import { authConfig } from './constants.js';

class Auth {
  constructor({ server, registerPath, loginPath, authCheckPath }) {
    this._server = server;
    this._registerPath = registerPath;
    this._loginPath = loginPath;
    this._authCheckPath = authCheckPath;
  }

  //Метод отправки запроса к серверу
  _requestServer(path, message) {
    return fetch(path, message).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.status);
    });
  }

  //Метод регистрации пользователя
  register({ email, password }) {
    const path = `${this._server}/${this._registerPath}`;
    const message = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    return this._requestServer(path, message);
  }

  //Метод авторизации пользователя
  login({ email, password }) {
    const path = `${this._server}/${this._loginPath}`;
    const message = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    return this._requestServer(path, message);
  }

  //Метод проверки авторизации пользователя
  authCheck(jwt) {
    const path = `${this._server}/${this._authCheckPath}`;
    const message = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    };
    return this._requestServer(path, message);
  }
}

const auth = new Auth(authConfig);

export default auth;
