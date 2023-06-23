const CustomError = require("../utils/CustomError");
const { getCardById } = require("../model/cardsService/cardsService");

const checkIfBizOwner = async (iduser, idcard, res, next) => {
  try {
    const cardData = await getCardById(idcard);
    if (!cardData) {
      return res.status(400).json({ msg: "Picture Not Found" });
    }
    if (cardData.user_id == iduser) {
      next();
    } else {
      res.status(401).json({ msg: "You Are Not The Picture Owner" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const permissionsMiddleware = (isBiz, isAdmin, isCardOwner, isSameUser) => {
  return (req, res, next) => {
    if (!req.userData) {
      throw new CustomError("Must Provide userData");
    }
    if (isBiz === true && isBiz === req.userData.isBusiness) {
      return next();
    }
    if (isAdmin === true && isAdmin === req.userData.isAdmin) {
      return next();
    }
    if (isSameUser === true && req.userData._id === req.params.id) {
      return next();
    }
    if (isCardOwner === true && isCardOwner === req.userData.isBusiness) {
      return checkIfBizOwner(req.userData._id, req.params.id, res, next);
    }
    res.status(401).json({ msg: "You Do Not Have Permission!" });
  };
};

module.exports = permissionsMiddleware;