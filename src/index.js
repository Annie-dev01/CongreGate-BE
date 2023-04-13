const app = require('./setup/express.js');
const logging = require('./setup/logging.js');
const database = require('./setup/database.js');
const seedAdmin = require('./seeding/index.js');

logging();
database();
seedAdmin();

module.exports = app;
