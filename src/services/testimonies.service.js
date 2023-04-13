const testimonyRepo = require('../dataAccess/testimonyRepo');
const { buildResponse, buildFailedResponse } = require('../utils/responses');

const createTestimony = async (payload) => {
  try {
    const testimonyInstance = await testimonyRepo.createTestimony(payload);

    const savedTestimony = await testimonyRepo.saveTestimony(testimonyInstance);
    return buildResponse({
      message: 'Testimony posted. Awaiting Admin Approval',
      data: savedTestimony,
    });
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

const getAll = async (query = {}) => {
  try {
    const testimonies = await testimonyRepo.getAll(query);
    return buildResponse({ message: 'Testimonies Fetched', data: testimonies });
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};

const getAllApproved = async (query = {}) => {
  try {
    const testimonies = await testimonyRepo.getAll({
      ...query,
      approved: true,
    });
    return buildResponse({ message: 'Testimonies Fetched', data: testimonies });
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};

const approveTestimony = async (id, userId) => {
  try {
    const foundTestimony = await testimonyRepo.getOne({ _id: id });
    if (!foundTestimony) {
      return buildFailedResponse({ message: 'Testimony not Found' });
    }
    const approvedTestimony = await testimonyRepo.updateTesimony(
      { _id: id },
      { approved: true, approvedBy: userId },
      { new: true }
    );
    return buildResponse({
      message: 'Testimony Approved',
      data: approvedTestimony,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = Object.freeze({
  createTestimony,
  getAll,
  approveTestimony,
  getAllApproved,
});
