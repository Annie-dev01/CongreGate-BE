const userService = require('../services/users.service');

const createUser = async (req, res) => {
  try {
    const data = await userService.createUser(req.body);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    res.status(500).json({
      message: 'Unable to create user at the moment. Please try again later.',
      error,
    });
  }
};

module.exports = Object.freeze({
  createUser,
});
