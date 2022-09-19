const Card = require('../models/card');
const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const { ForbiddenError } = require('../errors/ForbiddenError');

const {
  OK,
  CREATED,
} = require('../utils/successCodes');

const createCard = async (req, res, next) => {
  try {
    const { name, link } = await req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(CREATED).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Введены некорректные данные'));
    }
    return next(err);
  }
};

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.status(OK).send(cards);
  } catch (err) {
    return next(err);
  }
};

const deleteCard = async (req, res, next) => {
  const id = req.user._id;
  try {
    const card = await Card.findById(req.params.cardId);
    if (card) {
      if (id === card.owner.toString()) {
        await Card.findByIdAndDelete(req.params.cardId);
        return res.status(OK).send(card);
      }
      return next(new ForbiddenError('У Вас нет прав на удаление этой карточки'));
    }
    return next(new NotFoundError('Карточка не найдена'));
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Неверный запрос'));
    }
    return next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (card) {
      return res.status(OK).send(card);
    }
    return next(new NotFoundError('Карточка не найдена'));
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Неверный запрос'));
    }
    return next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (card) {
      return res.status(OK).send(card);
    }
    return next(new NotFoundError('Карточка не найдена'));
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Неверный запрос'));
    }
    return next(err);
  }
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
