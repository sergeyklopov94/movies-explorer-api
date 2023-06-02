require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');
const { limiter } = require('./middlewares/limiter');

const router = require('./routes/index');

const { MONGO } = require('./utils/config');

const { START_SERVER_MESS } = require('./utils/constants');

const { PORT = 3000, NODE_ENV, DB } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(NODE_ENV === 'production' ? DB : MONGO, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(limiter);
app.use(helmet());

app.use('/', router);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(START_SERVER_MESS);
});
