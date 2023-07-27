const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cardController = require('../controllers/card');

cardsRouter.get('/', cardController.getAllCards);
cardsRouter.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  }),
  cardController.deleteCardById,
);

cardsRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .pattern(/^https?:\/\/(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
    }),
  }),
  cardController.createCard,
);

cardsRouter.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  }),
  cardController.addLike,
);

cardsRouter.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  }),
  cardController.removeLike,
);

module.exports = cardsRouter;
