const express = require("express");
const router = express.Router();

const userRouter = require("./api/users");
const plantsRouter = require("./api/plants");

//http://localhost:8181/api/users/
router.use("/users", userRouter);

//http://localhost:8181/api/plants
router.use("/plants", plantsRouter);

module.exports = router;