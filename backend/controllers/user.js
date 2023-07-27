const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationError = require('../errors/validation-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-key', {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(next);
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send({ data }))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('пользователь не найден');
    })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('переданы некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('пользователь не найден');
    })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('переданы некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const userData = {
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      };
      return User.create(userData);
    })
    .then(({
      name, about, avatar, email, _id,
    }) => res.status(201).send({
      name,
      about,
      avatar,
      email,
      _id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('переданы некорректные данные пользователя'));
      } else if (err.code === 11000) {
        next(new ConflictError('адрес электронной почты уже используется'));
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new NotFoundError('пользователь не найден');
    })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('переданы некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new NotFoundError('пользователь не найден');
    })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('переданы некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  login,
  getAllUsers,
  getCurrentUser,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
