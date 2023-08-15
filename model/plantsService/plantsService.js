const config = require("config");
const plantsServiceMongo = require("../mongodb/plants/plantsService");
const dbOption = config.get("dbOption");

const createPlant = (plantToSave) => {
  if (dbOption === "mongo") {
    return plantsServiceMongo.createPlant(plantToSave);
  }
  if (dbOption === "atlas") {
    return plantsServiceMongo.createPlant(plantToSave);
  }
};

const getAllPlants = () => {
  if (dbOption === "mongo") {
    return plantsServiceMongo.getAllPlants();
  }
  if (dbOption === "atlas") {
    return plantsServiceMongo.getAllPlants();
  }
};

const getPlantById = (id) => {
  if (dbOption === "mongo") {
    return plantsServiceMongo.getPlantById(id);
  }
  if (dbOption === "atlas") {
    return plantsServiceMongo.getPlantById(id);
  }
};

const getPlantsByUserId = (user_id) => {
  if (dbOption === "mongo") {
    return plantsServiceMongo.getPlantsByUserId(user_id);
  }
  if (dbOption === "atlas") {
    return plantsServiceMongo.getPlantsByUserId(user_id);
  }
};

const updatePlant = (id, plantToUpdate) => {
  if (dbOption === "mongo") {
    return plantsServiceMongo.updatePlant(id, plantToUpdate);
  }
  if (dbOption === "atlas") {
    return plantsServiceMongo.updatePlant(id, plantToUpdate);
  }
};

const deletePlant = (id) => {
  if (dbOption === "mongo") {
    return plantsServiceMongo.deletePlant(id);
  }
  if (dbOption === "atlas") {
    return plantsServiceMongo.deletePlant(id);
  }
};

const likePlant = (plant, userId) => {
  if (dbOption === "mongo") {
    return plantsServiceMongo.likePlant(plant, userId, {
      new: true,
    });
  }
  if (dbOption === "atlas") {
    return plantsServiceMongo.likePlant(plant, userId, {
      new: true,
    });
  }
};

const addPlantToCart = (plant, userId) => {
  if (dbOption === "mongo") {
    return plantsServiceMongo.addPlantToCart(plant, userId, {
      new: true,
    });
  }
  if (dbOption === "atlas") {
    return plantsServiceMongo.addPlantToCart(plant, userId, {
      new: true,
    });
  }
};

const getLikedPlants = (userId) => {
  if (dbOption === "mongo") {
    return plantsServiceMongo.getLikedPlants(userId, {
      new: true,
    });
  }
  if (dbOption === "atlas") {
    return plantsServiceMongo.getLikedPlants(userId, {
      new: true,
    });
  }
};

const getPlantsInCart = (userId) => {
  if (dbOption === "mongo") {
    return plantsServiceMongo.getPlantsInCart(userId, {
      new: true,
    });
  }
  if (dbOption === "atlas") {
    return plantsServiceMongo.getPlantsInCart(userId, {
      new: true,
    });
  }
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