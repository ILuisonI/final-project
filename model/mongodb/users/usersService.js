const { default: mongoose } = require("mongoose");
const User = require("./Users");

const registerUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

const getUserByEmail = (email) => {
  return User.findOne({ email });
};

const getUserById = (id) => {
  return User.findById(new mongoose.Types.ObjectId(id));
};

const getAllUsers = () => {
  return User.find();
};

const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};

const updateUser = (id, userToUpdate) => {
  return User.findByIdAndUpdate(id, userToUpdate, {
    new: true,
  });
};

const updateUserBusiness = (id, isBusiness) => {
  return User.findByIdAndUpdate(id, { isBusiness: isBusiness }, {
    new: true,
  });
};

module.exports = {
  registerUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  deleteUser,
  updateUser,
  updateUserBusiness,
};
