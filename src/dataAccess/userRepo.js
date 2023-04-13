const User = require('../models/user.model');

const createUser = async (data) => {
  return await new User(data);
};

const saveUser = async (userInstance) => {
  return await userInstance.save();
};

const getAll = async (query = () => {}) => {
  // more stuffs would be done here eventually, such as pagination, filters, population, etc.
  const skip = Number(query.skip) || 0;
  const limit = Number(query.limit) || 10;

  const data = await User.find(query)
    .select('-password')
    .limit(limit)
    .skip(skip)
    .sort('-createdAt');
  return {
    data,
    count: await User.count(query),
    skip,
    limit,
  };
};

const getOne = async (query = {}) => {
  return await User.findOne(query);
};

const updateUser = async (query = {}, update = {}, options = {}) => {
  return await User.findOneAndUpdate(query, update, options);
};

module.exports = Object.freeze({
  createUser,
  saveUser,
  getAll,
  getOne,
  updateUser,
});
