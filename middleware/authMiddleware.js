const { verifyToken } = require("../utils/token/tokenService");
const CustomError = require("../utils/CustomError");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers["x-auth-token"])
      throw new CustomError("Please Provide Token");
    const userData = await verifyToken(req.headers["x-auth-token"]);
    req.userData = userData;
    next();
  } catch (err) {
    let errToSend;
    if (err instanceof CustomError) {
      errToSend = err;
    } else {
      errToSend = new CustomError("Invalid Token");
    }
    res.status(401).json(errToSend);
  }
};

module.exports = authMiddleware;