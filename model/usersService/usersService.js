const config = require("config");
const usersServiceMongo = require("../mongodb/users/usersService");
const dbOption = config.get("dbOption");

const registerUser = (userData) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.registerUser(userData);
  }
  if (dbOption === "atlas") {
    return usersServiceMongo.registerUser(userData);
  }
};

const getUserByEmail = (email) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getUserByEmail(email);
  }
  if (dbOption === "atlas") {
    return usersServiceMongo.getUserByEmail(email);
  }
};

const getUserById = (id) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getUserById({ id });
  }
  if (dbOption === "atlas") {
    return usersServiceMongo.getUserById({ id });
  }
};

const getAllUsers = () => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getAllUsers();
  }
  if (dbOption === "atlas") {
    return usersServiceMongo.getAllUsers();
  }
};

const deleteUser = (id) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.deleteUser(id);
  }
  if (dbOption === "atlas") {
    return usersServiceMongo.deleteUser(id);
  }
};

const updateUser = (id, userToUpdate) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.updateUser(id, userToUpdate);
  }
  if (dbOption === "atlas") {
    return usersServiceMongo.updateUser(id, userToUpdate);
  }
};

const updateUserBusiness = (id, isBusiness) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.updateUserBusiness(id, !isBusiness);
  }
  if (dbOption === "atlas") {
    return usersServiceMongo.updateUserBusiness(id, !isBusiness);
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  deleteUser,
  updateUser,
  updateUserBusiness,
};