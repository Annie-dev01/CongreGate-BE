const Testimony = require('../models/testimony.model');

const createTestimony = async (data) => {
  return await new Testimony(data);
};

const saveTestimony = async (testimonyInstance) => {
  return await testimonyInstance.save();
};

const getAll = async (query = () => {}) => {
  // more stuffs would be done here eventually, such as pagination, filters, population, etc.
  const skip = Number(query.skip) || 0;
  const limit = Number(query.limit) || 10;

  const data = await Testimony.find(query)
    .limit(limit)
    .skip(skip)
    .sort('-createdAt')
    .populate('createdBy', 'firstName lastName');
  return {
    data,
    count: await Testimony.count(query),
    skip,
    limit,
  };
};

const getOne = async (query = {}) => {
  return await Testimony.findOne(query);
};

const updateTesimony = async (query = {}, update = {}, options = {}) => {
  return await Testimony.findOneAndUpdate(query, update, options);
};

module.exports = Object.freeze({
  createTestimony,
  saveTestimony,
  getAll,
  getOne,
  updateTesimony,
});
