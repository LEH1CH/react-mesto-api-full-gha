class AuthError extends Error {
  constructor(message = 'необходима авторизация') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = AuthError;
