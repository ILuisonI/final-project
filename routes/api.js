const express = require("express");
const router = express.Router();

const userRouter = require("./api/users");
const cardsRouter = require("./api/cards");

//http://localhost:8181/api/users/
router.use("/users", userRouter);

//http://localhost:8181/api/cards
router.use("/cards", cardsRouter);

module.exports = router;