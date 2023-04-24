const { promisify } = require('util');

const userRepo = require('../dataAccess/userRepo');
const { buildResponse, buildFailedResponse } = require('../utils/responses');
const {
  hashPassword,
  comparePassword,
  generateJwt,
  generateSalt,
} = require('../utils');
const { BCRYPT_SALT } = require('../config/env');
const { redisClient } = require('../setup/redis');

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.setEx).bind(redisClient);

const createUser = async (payload) => {
  try {
    const foundEmail = await userRepo.getOne({ email: payload.email });

    if (foundEmail) {
      return buildFailedResponse({ message: 'Email already in use' });
    }

    const foundPhone = await userRepo.getOne({ phone: payload.phone });

    if (foundPhone) {
      return buildFailedResponse({ message: 'Phone already in use' });
    }

    const salt = await generateSalt(Number(BCRYPT_SALT));
    payload.password = await hashPassword(payload.password, salt);
    const userInstance = await userRepo.createUser(payload);
    const savedUser = await userRepo.saveUser(userInstance);
    return buildResponse({
      data: savedUser,
      message: 'User created successfully',
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const loginAdminUser = async (payload) => {
  try {
    const foundUser = await userRepo.getOne({ email: payload.email });
    if (!foundUser) {
      return buildFailedResponse({ message: 'User not found' });
    }

    if (!['admin', 'superAdmin'].includes(foundUser.role)) {
      return buildFailedResponse({ message: 'User not an Admin' });
    }

    // compare password
    const passwordIsValid = await comparePassword(
      payload.password,
      foundUser.password
    );
    if (!passwordIsValid) {
      return buildFailedResponse({ message: 'Invalid Password' });
    }

    const token = generateJwt({
      _id: foundUser._id,
      email: foundUser.email,
      phone: foundUser.phone,
      category: foundUser.category,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      role: foundUser.role,
    });

    delete foundUser.password;

    const responseData = {
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
      phone: foundUser.phone,
      role: foundUser.role,
    };

    return buildResponse({
      data: responseData,
      token,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};
const loginUser = async (payload) => {
  try {
    const foundUser = await userRepo.getOne({ email: payload.email });
    if (!foundUser) {
      return buildFailedResponse({ message: 'User not found' });
    }

    // compare password
    const passwordIsValid = await comparePassword(
      payload.password,
      foundUser.password
    );
    if (!passwordIsValid) {
      return buildFailedResponse({ message: 'Invalid Password' });
    }

    const token = generateJwt({
      _id: foundUser._id,
      email: foundUser.email,
      phone: foundUser.phone,
      category: foundUser.category,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      role: foundUser.role,
    });

    delete foundUser.password;

    const responseData = {
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
      phone: foundUser.phone,
      role: foundUser.role,
    };

    return buildResponse({
      data: responseData,
      token,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const markLateUser = async (id) => {
  try {
    const foundUser = await userRepo.getOne({ _id: id });
    if (!foundUser) {
      return buildFailedResponse({ message: 'Member not found' });
    }
    const updatedUser = await userRepo.updateUser(
      { _id: id },
      { isLate: true },
      { new: true }
    );

    return buildResponse({
      message: 'Member marked as late',
      data: updatedUser,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};
const deleteUser = async (id) => {
  try {
    const foundUser = await userRepo.getOne({ _id: id });
    if (!foundUser) {
      return buildFailedResponse({ message: 'Member not found' });
    }
    const updatedUser = await userRepo.updateUser(
      { _id: id },
      { deleted: true },
      { new: true }
    );

    return buildResponse({
      message: 'Member deleted',
      data: updatedUser,
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getUsers = async (query = {}) => {
  try {
    const redisData = await redisClient.get('users');
    if (redisData) {
      return buildResponse({
        message: 'User Fetched',
        data: JSON.parse(redisData),
      });
    }
    const foundUsers = await userRepo.getAll({
      ...query,
      isLate: false,
      deleted: false,
    });
    await redisClient.setEx('users', 3600, JSON.stringify(foundUsers));
    return buildResponse({ message: 'Users fetched', data: foundUsers });
  } catch (error) {
    try {
      const foundUsers = await userRepo.getAll({
        ...query,
        isLate: false,
        deleted: false,
      });
      return buildResponse({ message: 'Users fetched', data: foundUsers });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
};

const getOne = async (query) => {
  try {
    const response = await redisClient.get(query._id);
    if (response) {
      return buildResponse({
        message: 'User fetched',
        data: JSON.parse(response),
      });
    } else {
      const foundUser = await userRepo.getOne(query);

      await redisClient.setEx(query._id, 3600, JSON.stringify(foundUser));
      return buildResponse({ message: 'User fetched', data: foundUser });
    }
  } catch (error) {
    try {
      const foundUser = await userRepo.getOne(query);
      return buildResponse({ message: 'User fetched', data: foundUser });
    } catch (error) {
      throw new Error(error);
    }
  }
};

module.exports = Object.freeze({
  createUser,
  loginAdminUser,
  markLateUser,
  getUsers,
  deleteUser,
  loginUser,
  getOne,
});
