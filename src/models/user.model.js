const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['member', 'admin', 'superAdmin'],
      default: 'member',
    },
    positions: [
      {
        type: String,
      },
    ],
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    isMarried: {
      type: Boolean,
      default: false,
    },
    spouse: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    anniversary: {
      type: String,
    },
    units: [
      {
        type: String,
      },
    ],
    address: {
      type: String,
    },
    occupation: {
      type: String,
    },
    profileImg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
