const CustomError = require("../utils/CustomError");
const { getPlantById } = require("../model/plantsService/plantsService");

const checkIfBizOwner = async (idUser, idPlant, res, next) => {
  try {
    const plantData = await getPlantById(idPlant);
    if (!plantData) {
      return res.status(400).json({ msg: "Plant Not Found" });
    }
    if (plantData.user_id == idUser) {
      next();
    } else {
      res.status(401).json({ msg: "You Are Not The Plant Owner" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const permissionsMiddleware = (isBiz, isAdmin, isPlantOwner, isSameUser) => {
  return (req, res, next) => {
    if (!req.userData) {
      throw new CustomError("Must Provide User Data");
    }
    if (isBiz === true && isBiz === req.userData.isBusiness) {
      return next();
    }
    if (isAdmin === true && isAdmin === req.userData.isAdmin) {
      return next();
    }
    if (isPlantOwner === true && isPlantOwner === req.userData.isBusiness) {
      return checkIfBizOwner(req.userData._id, req.params.id, res, next);
    }
    if (isSameUser === true && req.userData._id === req.params.id) {
      return next();
    }
    res.status(401).json({ msg: "You Do Not Have Permission!" });
  };
};

module.exports = permissionsMiddleware;