const express = require('express');
const {
  createTestimony,
  getAll,
  approveTestimony,
  getAllApproved,
} = require('../controllers/testimonies.controllers');
const {
  registrationValidator,
  loginValidator,
  testimonyValidator,
} = require('../middlewares/inputValidators');
const { protectAdmin, protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', protect, testimonyValidator, createTestimony);
router.get('/', protectAdmin, getAll);
router.get('/approved-testimonies', getAllApproved);
router.patch('/approve/:id', protectAdmin, approveTestimony);

module.exports = router;
