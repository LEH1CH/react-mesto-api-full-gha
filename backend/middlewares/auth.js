const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('не удалось выполнить авторизацию'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    next(new AuthError('не удалось выполнить авторизацию'));
    return;
  }

  req.user = payload;
  next();
};
