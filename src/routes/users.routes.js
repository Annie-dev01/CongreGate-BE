const express = require('express');
const {
  createUser,
  loginAdminUser,
} = require('../controllers/users.controllers');
const {
  registrationValidator,
  loginValidator,
} = require('../middlewares/inputValidators');
const { protectAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', protectAdmin, registrationValidator, createUser);
router.post('/admins/login', loginValidator, loginAdminUser);

module.exports = router;
