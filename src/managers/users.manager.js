const User = require("../models/user.model.js");

const addUser_manager = async (user_p) => {
  return await User.create(user_p);
};

const getUser_manager = async (filtro = {}) => {
  return await User.findOne(filtro).lean();
};

module.exports = {
  addUser_manager,
  getUser_manager,
};
