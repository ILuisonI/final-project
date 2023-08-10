const config = require("config");
const joiPlantsValidation = require("./joi/plantsValidation");
const joiIdValidation = require("./joi/idValidation");

const validatorOption = config.get("validatorOption");

const createPlantValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiPlantsValidation.validatePlantSchema(userInput);
  }
  throw new Error("Validator Undefined");
};

const idPlantValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiIdValidation.validateIdSchema(userInput);
  }
  throw new Error("Validator Undefined");
};

module.exports = {
  createPlantValidation,
  idPlantValidation,
};