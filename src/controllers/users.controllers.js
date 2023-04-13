const userService = require('../services/users.service');

const createUser = async (req, res) => {
  try {
    req.body.createdBy = req.user._id;
    const data = await userService.createUser(req.body);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    res.status(500).json({
      message: 'Unable to create user at the moment. Please try again later.',
      error,
    });
  }
};
const loginAdminUser = async (req, res) => {
  try {
    const data = await userService.loginAdminUser(req.body);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    res.status(500).json({
      message: 'Unable to login admin at the moment. Please try again later.',
      error,
    });
  }
};

const markLateUser = async (req, res) => {
  try {
    const data = await userService.markLateUser(req.params.id);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    res.status(500).json({
      message:
        'Unable to mark late member at the moment. Please try again later.',
      error,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const data = await userService.deleteUser(req.params.id);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    res.status(500).json({
      message: 'Unable to delete member at the moment. Please try again later.',
      error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await userService.getUsers(req.query);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    res.status(500).json({
      message: 'Unable to fetch members at the moment. Please try again later.',
      error,
    });
  }
};

module.exports = Object.freeze({
  createUser,
  loginAdminUser,
  markLateUser,
  getAllUsers,
  deleteUser,
});
