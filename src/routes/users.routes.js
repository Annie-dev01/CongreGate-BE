const express = require('express');
const {
  createUser,
  loginAdminUser,
  markLateUser,
  getAllUsers,
  deleteUser,
  loginUser,
} = require('../controllers/users.controllers');
const {
  registrationValidator,
  loginValidator,
} = require('../middlewares/inputValidators');
const { protectAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/admins/login', loginValidator, loginAdminUser);
router.post('/login', loginValidator, loginUser);
router.post('/', protectAdmin, registrationValidator, createUser);
router.patch('/mark-late-user/:id', protectAdmin, markLateUser);
router.get('/', protectAdmin, getAllUsers);
router.delete('/:id', protectAdmin, deleteUser);

module.exports = router;
