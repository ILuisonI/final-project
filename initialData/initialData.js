const usersService = require("../model/usersService/usersService");
const plantsService = require("../model/plantsService/plantsService");
const hashService = require("../utils/hash/hashService");
const normalizeUser = require("../model/usersService/helpers/normalizationUserService");
const normalizePlant = require("../model/plantsService/helpers/normalizationPlantService");

const usersData = require("./users.json");
const plantsData = require("./plants.json");

const initialData = async () => {
  try {
    let plants = await plantsService.getAllPlants();
    if (plants.length) {
      return;
    }
    let users = await usersService.getAllUsers();
    if (users.length) {
      return;
    }
    let user_id = "";
    for (let user of usersData) {
      user.password = await hashService.generateHash(user.password);
      user = normalizeUser(user);
      user_id = await usersService.registerUser(user);
    }
    user_id = user_id._id + "";
    for (let plant of plantsData) {
      plant = await normalizePlant(plant, user_id);
      await plantsService.createPlant(plant);
    }
  } catch (err) {
    console.log("err from initial", err);
  }
};

// initialData();
module.exports = initialData;