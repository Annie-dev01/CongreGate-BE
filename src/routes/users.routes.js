const express = require('express');
const {
  createUser,
  loginAdminUser,
} = require('../controllers/users.controllers');
const {
  registrationValidator,
  loginValidator,
} = require('../middlewares/inputValidators');

const router = express.Router();

router.post('/', registrationValidator, createUser);
router.post('/admins/login', loginValidator, loginAdminUser);

module.exports = router;
