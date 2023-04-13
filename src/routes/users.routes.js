const express = require('express');
const { createUser } = require('../controllers/users.controllers');
const { registrationValidator } = require('../middlewares/inputValidators');

const router = express.Router();

router.post('/', registrationValidator, createUser);

module.exports = router;
