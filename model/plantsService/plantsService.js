const config = require("config");
const plantsServiceMongo = require("../mongodb/plants/plantsService");
const dbOption = config.get("dbOption");

const createPlant = (plantToSave) => {
  return plantsServiceMongo.createPlant(plantToSave);
};

const getAllPlants = () => {
  return plantsServiceMongo.getAllPlants();
};

const getPlantById = (id) => {
  return plantsServiceMongo.getPlantById(id);
};

const getPlantsByUserId = (user_id) => {
  return plantsServiceMongo.getPlantsByUserId(user_id);
};

const updatePlant = (id, plantToUpdate) => {
  return plantsServiceMongo.updatePlant(id, plantToUpdate);

};

const deletePlant = (id) => {
  return plantsServiceMongo.deletePlant(id);

};

const likePlant = (plant, userId) => {
  return plantsServiceMongo.likePlant(plant, userId, {
    new: true,
  });
};

const addPlantToCart = (plant, userId) => {
  return plantsServiceMongo.addPlantToCart(plant, userId, {
    new: true,
  });
};

const getLikedPlants = (userId) => {
  return plantsServiceMongo.getLikedPlants(userId);
};

const getPlantsInCart = (userId) => {
  return plantsServiceMongo.getPlantsInCart(userId, {
    new: true,
  });
};

module.exports = {
  createPlant,
  getAllPlants,
  getPlantById,
  getPlantsByUserId,
  updatePlant,
  deletePlant,
  likePlant,
  addPlantToCart,
  getLikedPlants,
  getPlantsInCart
};