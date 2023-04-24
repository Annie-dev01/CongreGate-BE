const app = require('./setup/express.js');
const logging = require('./setup/logging.js');
const database = require('./setup/database.js');
const seedAdmin = require('./seeding/index.js');
const { redisConnect, redisClient } = require('./setup/redis.js');

logging();
database();
seedAdmin();
redisConnect();

module.exports = app;
