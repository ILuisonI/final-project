const { default: mongoose } = require("mongoose");
const Plant = require("./Plant");

const createPlant = (plantToSave) => {
  let card = new Plant(plantToSave);
  return card.save();
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
  return Card.findByIdAndDelete(id);
};

const getLikedPlants = (userId) => {
  console.log(userId);
  return Plant.find({ likes: userId });
};

const getPlantsInCart = (userId) => {
  return Plant.find({ cart: userId });
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
