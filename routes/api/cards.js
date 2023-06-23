const express = require("express");
const router = express.Router();
const cardsServiceModel = require("../../model/cardsService/cardsService");
const normalizeCard = require("../../model/cardsService/helpers/normalizationCardService");
const {
  createCardValidation,
  idCardValidation } = require("../../validation/cardsValidationService");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const authmw = require("../../middleware/authMiddleware");
const chalk = require("chalk");

//http://localhost:8181/api/cards
router.get("/", async (req, res) => {
  try {
    const allCards = await cardsServiceModel.getAllCards();
    res.json(allCards);
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/cards/my-cards
router.get("/my-cards",
  authmw,
  permissionsMiddleware(true, false, false, false),
  async (req, res) => {
    try {
      const allOwnCards = await cardsServiceModel.getCardByUserId(req.userData._id);
      if (allOwnCards.length > 0) {
        res.json(allOwnCards);
      } else {
        res.json({ msg: "You Don't Have Any Cards Yet" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  });

//http://localhost:8181/api/cards/:id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await idCardValidation({ id });
    const cardFromDB = await cardsServiceModel.getCardById(id);
    if (!cardFromDB) {
      res.json({ msg: "Card Is Not Found!" });
    } else {
      res.json(cardFromDB);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/cards
router.post("/",
  authmw,
  permissionsMiddleware(true, false, false, false),
  async (req, res) => {
    try {
      await createCardValidation(req.body);
      let normalCard = await normalizeCard(req.body, req.userData._id);
      await cardsServiceModel.createCard(normalCard);
      res.json({ msg: "Card Created Successfully" });
    } catch (err) {
      res.status(400).json(err);
    }
  });

//http://localhost:8181/api/cards/:id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await idCardValidation({ id });
    req.body = await cardsServiceModel.getCardById(req.params.id);
    let editedCard = normalizeCard(req.body);
    await createCardValidation(editedCard);
    await cardsServiceModel.updateCard(
      id,
      editedCard
    );
    res.json({ msg: "Card Edited Successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/cards/:id
router.patch("/:id",
  authmw,
  async (req, res) => {
    try {
      const id = req.params.id;
      await idCardValidation({ id });
      let card = await cardsServiceModel.getCardById(req.params.id);
      if (!card) {
        res.json({ msg: "Could Not Find Card!" });
      } else {
        await cardsServiceModel.likeCard(
          card,
          req.userData._id
        );
        res.json({ msg: "Card Like Changed Successfully" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });

//http://localhost:8181/api/cards/:id
router.delete(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, true, false),
  async (req, res) => {
    try {
      const id = req.params.id;
      await idCardValidation({ id });
      const cardFromDB = await cardsServiceModel.deleteCard(req.params.id);
      if (cardFromDB) {
        res.json({ msg: "Card Deleted Successfully" });
      } else {
        res.json({ msg: "Could Not Find The Card" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

module.exports = router;