const User = require('../models/user.model');

const createUser = async (data) => {
  return await new User(data);
};

const saveUser = async (userInstance) => {
  return await userInstance.save();
};

const getAll = async (query = () => {}) => {
  // more stuffs would be done here eventually, such as pagination, filters, population, etc.
  return await User.find(query).select('-password');
};

const getOne = async (query = {}) => {
  return await User.findOne(query);
};

module.exports = Object.freeze({
  createUser,
  saveUser,
  getAll,
  getOne,
});
