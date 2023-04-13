const Joi = require('joi');

const registrationValidator = async (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    middleName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
    positions: Joi.array(),
    dateOfBirth: Joi.string().required(),
    gender: Joi.string().required(),
    isMarried: Joi.boolean(),
    spouse: Joi.string(),
    anniversary: Joi.string(),
    units: Joi.array(),
    address: Joi.string().required(),
    occupation: Joi.string().required(),
    profileImg: Joi.string(),
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: 'error', message: error.details[0].message });
  }
};

const loginValidator = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: 'error', message: error.details[0].message });
  }
};

const testimonyValidator = async (req, res, next) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string(),
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: 'error', message: error.details[0].message });
  }
};

module.exports = Object.freeze({
  registrationValidator,
  loginValidator,
  testimonyValidator,
});
