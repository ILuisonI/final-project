const { default: mongoose } = require("mongoose");
const Plant = require("./Plant");

const createPlant = (plantToSave) => {
  let plant = new Plant(plantToSave);
  return plant.save();
};

const getAllPlants = () => {
  return Plant.find();
};

const getPlantById = (id) => {
  return Plant.findById(new mongoose.Types.ObjectId(id));
};

const getPlantsByUserId = (user_id) => {
  return Plant.find({ user_id: user_id });
};

const updatePlant = (id, plantToUpdate) => {
  return Plant.findByIdAndUpdate(id, plantToUpdate, {
    new: true,
  });
};

const likePlant = (plant, userId) => {
  const plantLikes = plant.likes.find((id) => id === userId);
  if (!plantLikes) {
    plant.likes.push(userId);
    return plant.save();
  }
  const plantRemovedUserLike = plant.likes.filter((id) => id !== userId);
  plant.likes = plantRemovedUserLike;
  return plant.save();
};

const addPlantToCart = (plant, userId) => {
  const plantCart = plant.cart.find((id) => id === userId);
  if (!plantCart) {
    plant.cart.push(userId);
    return plant.save();
  }
  const plantRemovedUserFromCart = plant.cart.filter((id) => id !== userId);
  plant.cart = plantRemovedUserFromCart;
  return plant.save();
};

const deletePlant = (id) => {
  return Plant.findByIdAndDelete(id);
};

const getLikedPlants = (user_id) => {
  return Plant.find({ likes: user_id });
};

const getPlantsInCart = (user_id) => {
  return Plant.find({ cart: user_id });
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
  getPlantsInCart,
};
