const config = require("config");
const cardsServiceMongo = require("../mongodb/cards/cardsService");
const dbOption = config.get("dbOption");

const createCard = (cardToSave) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.createCard(cardToSave);
  }
  if (dbOption === "atlas") {
    return cardsServiceMongo.createCard(cardToSave);
  }
};

const getAllCards = () => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getAllCards();
  }
  if (dbOption === "atlas") {
    return cardsServiceMongo.getAllCards();
  }
};

const getCardById = (id) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getCardById(id);
  }
  if (dbOption === "atlas") {
    return cardsServiceMongo.getCardById(id);
  }
};

const getCardByUserId = (user_id) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getCardsByUserId(user_id);
  }
  if (dbOption === "atlas") {
    return cardsServiceMongo.getCardsByUserId(user_id);
  }
};

const getCardByBizNumber = (bizNumber) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getCardByBizNumber(bizNumber);
  }
  if (dbOption === "atlas") {
    return cardsServiceMongo.getCardByBizNumber(bizNumber);
  }
};

const updateCard = (id, cardToUpdate) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.updateCard(id, cardToUpdate);
  }
  if (dbOption === "atlas") {
    return cardsServiceMongo.updateCard(id, cardToUpdate);
  }
};

const deleteCard = (id) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.deleteCard(id);
  }
  if (dbOption === "atlas") {
    return cardsServiceMongo.deleteCard(id);
  }
};

const likeCard = (card, userId) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.likeCard(card, userId, {
      new: true,
    });
  }
  if (dbOption === "atlas") {
    return cardsServiceMongo.likeCard(card, userId, {
      new: true,
    });
  }
};

module.exports = {
  createCard,
  getAllCards,
  getCardById,
  getCardByUserId,
  getCardByBizNumber,
  updateCard,
  deleteCard,
  likeCard,
};