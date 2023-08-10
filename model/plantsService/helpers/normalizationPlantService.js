const config = require("config");
const normalizationPlantMongo = require("../../mongodb/plants/helpers/normalizationPlant");
const dbOption = config.get("dbOption");

const normalizePlantService = (plant, userId) => {
  if (dbOption === "mongo") {
    return normalizationPlantMongo(plant, userId);
  }
};

module.exports = normalizePlantService;