const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userController = require('../controllers/user');

usersRouter.get('/', userController.getAllUsers);
usersRouter.get('/me', userController.getCurrentUser);

usersRouter.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().hex().length(24),
    }),
  }),
  userController.getUserById,
);

usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  userController.updateProfile,
);

usersRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .pattern(/^https?:\/\/(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
    }),
  }),
  userController.updateAvatar,
);

module.exports = usersRouter;
