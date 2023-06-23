const express = require("express");
const router = express.Router();
const hashService = require("../../utils/hash/hashService");
const {
  registerUserValidation,
  loginUserValidation,
  idUserValidation,
} = require("../../validation/usersValidationService");
const normalizeUser = require("../../model/usersService/helpers/normalizationUserService");
const usersServiceModel = require("../../model/usersService/usersService");
const { generateToken } = require("../../utils/token/tokenService");
const CustomError = require("../../utils/CustomError");
const authmw = require("../../middleware/authMiddleware");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");

//http://localhost:8181/api/users
router.post("/", async (req, res) => {
  try {
    await registerUserValidation(req.body);
    req.body.password = await hashService.generateHash(req.body.password);
    let normalUser = normalizeUser(req.body);
    await usersServiceModel.registerUser(normalUser);
    res.json({ msg: "Registered Successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/users/login
router.post("/login", async (req, res) => {
  try {
    await loginUserValidation(req.body);
    const userData = await usersServiceModel.getUserByEmail(req.body.email);
    if (!userData) {
      throw new CustomError("Invalid Email And/Or Password")
    };
    const isPasswordMatch = await hashService.cmpHash(
      req.body.password,
      userData.password
    );
    if (!isPasswordMatch) {
      throw new CustomError("Invalid Email And/Or Password");
    }
    const token = await generateToken({
      _id: userData._id,
      isAdmin: userData.isAdmin,
      isBusiness: userData.isBusiness,
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/users
router.get("/",
  authmw,
  permissionsMiddleware(false, true, false, false),
  async (req, res) => {
    try {
      const usersData = await usersServiceModel.getAllUsers();
      if (!usersData) {
        res.json({ msg: "There Are No Users!" });
      } else {
        res.json(usersData);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  });

//http://localhost:8181/api/users/:id
router.get("/:id",
  authmw,
  permissionsMiddleware(false, true, false, true),
  async (req, res) => {
    try {
      const id = req.params.id;
      await idUserValidation({ id });
      const userFromDB = await usersServiceModel.getUserById(id);
      if (userFromDB) {
        res.json(userFromDB);
      } else {
        res.json({ msg: "Could Not Find The User" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  });

//http://localhost:8181/api/users/:id
router.put("/:id",
  authmw,
  permissionsMiddleware(false, false, false, true),
  async (req, res) => {
    try {
      const id = req.params.id;
      await idUserValidation({ id });
      const userFromDB = await usersServiceModel.getUserById(id);
      if (!userFromDB) {
        throw new CustomError("Could Not Find The User");
      }
      req.body.isAdmin = userFromDB.isAdmin;
      req.body.isBusiness = userFromDB.isBusiness;
      await registerUserValidation(req.body);
      let editedUser = normalizeUser(req.body);
      editedUser.password = await hashService.generateHash(req.body.password);
      await registerUserValidation(editedUser);
      await usersServiceModel.updateUser(
        id,
        editedUser
      );
      res.json({ msg: "User Edited Successfully" });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });

//http://localhost:8181/api/users/:id
router.patch("/:id",
  authmw,
  permissionsMiddleware(false, false, false, true),
  async (req, res) => {
    try {
      const id = req.params.id;
      await idUserValidation({ id });
      const userFromDB = await usersServiceModel.getUserById(id);
      if (!userFromDB) {
        throw new CustomError("Could Not Find The User");
      }
      const newUserData = await usersServiceModel.updateUser(
        id,
        { isBusiness: !userFromDB.isBusiness }
      );
      const token = await generateToken({
        _id: newUserData._id,
        isAdmin: newUserData.isAdmin,
        isBusiness: newUserData.isBusiness,
      });
      res.json({ token });
    } catch (err) {
      res.status(400).json(err);
    }
  });

//http://localhost:8181/api/users/:id
router.delete("/:id",
  authmw,
  permissionsMiddleware(false, true, false, true),
  async (req, res) => {
    try {
      const id = req.params.id;
      await idUserValidation({ id });
      const userFromDB = await usersServiceModel.deleteUser(req.params.id);
      if (userFromDB) {
        res.json({ msg: "User Deleted" });
      } else {
        res.json({ msg: "Could Not Find The User" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;