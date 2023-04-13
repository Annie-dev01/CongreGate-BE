const dotenv = require('dotenv');

// loading .env
dotenv.config();

const { NODE_ENV, PORT, DBURL, HOST_NAME, BCRYPT_SALT, JWT_SECRET } =
  process.env;

module.exports = { NODE_ENV, PORT, DBURL, HOST_NAME, BCRYPT_SALT, JWT_SECRET };
