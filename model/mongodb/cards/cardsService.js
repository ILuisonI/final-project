const { default: mongoose } = require("mongoose");
const Card = require("./Card");
const chalk = require("chalk");

const createCard = (cardToSave) => {
  let card = new Card(cardToSave);
  return card.save();
};

const getAllCards = () => {
  return Card.find();
};

const getCardById = (id) => {
  return Card.findById(new mongoose.Types.ObjectId(id));
};

const getCardsByUserId = (user_id) => {
  return Card.find({ user_id: user_id });
};

const getCardByBizNumber = (bizNumber) => {
  return Card.findOne({ bizNumber }, { bizNumber: 1, _id: 0 });
};

const updateCard = (id, cardToUpdate) => {
  return Card.findByIdAndUpdate(id, cardToUpdate, {
    new: true,
  });
};

const likeCard = (card, userId) => {
  const cardLikes = card.likes.find((id) => id === userId);
  if (!cardLikes) {
    card.likes.push(userId);
    return card.save();
  }
  const cardRemovedUserLike = card.likes.filter((id) => id !== userId);
  card.likes = cardRemovedUserLike;
  return card.save();
};

const deleteCard = (id) => {
  return Card.findByIdAndDelete(id);
};

module.exports = {
  createCard,
  getAllCards,
  getCardById,
  getCardsByUserId,
  getCardByBizNumber,
  updateCard,
  deleteCard,
  likeCard,
};
