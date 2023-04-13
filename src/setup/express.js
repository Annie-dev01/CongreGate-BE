const express = require('express');
require('express-async-errors');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const userRoutes = require('../routes/users.routes');
const { errorHandler } = require('../middlewares/error.middleware');

const app = express();
// const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(limiter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.use(errorHandler);

app.use('/api/v1/users', userRoutes);

//default route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to congreGate',
  });
});

module.exports = app;
