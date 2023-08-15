const config = require("config");
const usersServiceMongo = require("../mongodb/users/usersService");
const dbOption = config.get("dbOption");

const registerUser = (userData) => {
  return usersServiceMongo.registerUser(userData);
};

const getUserByEmail = (email) => {
  return usersServiceMongo.getUserByEmail(email);
};

const getUserById = (id) => {
  return usersServiceMongo.getUserById({ id });
};

const getAllUsers = () => {
  return usersServiceMongo.getAllUsers();
};

const deleteUser = (id) => {
  return usersServiceMongo.deleteUser(id);
};

const updateUser = (id, userToUpdate) => {
  return usersServiceMongo.updateUser(id, userToUpdate);
};

const updateUserBusiness = (id, isBusiness) => {
  return usersServiceMongo.updateUserBusiness(id, !isBusiness);
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