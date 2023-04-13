const testimonyServices = require('../services/testimonies.service');

const createTestimony = async (req, res) => {
  try {
    req.body.createdBy = req.user._id;
    const data = await testimonyServices.createTestimony(req.body);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to post testimony at the moment. Please try again later',
      status: 'failure',
    });
  }
};
const getAll = async (req, res) => {
  try {
    const data = await testimonyServices.getAll(req.query);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    return res.status(500).json({
      message:
        'Unable to fetch testimonies at the moment. Please try again later',
      status: 'failure',
    });
  }
};
const getAllApproved = async (req, res) => {
  try {
    const data = await testimonyServices.getAllApproved(req.query);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    return res.status(500).json({
      message:
        'Unable to fetch testimonies at the moment. Please try again later',
      status: 'failure',
    });
  }
};

const approveTestimony = async (req, res) => {
  try {
    const data = await testimonyServices.approveTestimony(
      req.params.id,
      req.user._id
    );
    return res.status(data.statusCode).json(data);
  } catch (error) {
    return res.status(500).json({
      message:
        'Unable to approve testimony at the moment. Please try again later',
      status: 'failure',
    });
  }
};

module.exports = Object.freeze({
  createTestimony,
  getAll,
  approveTestimony,
  getAllApproved,
});
