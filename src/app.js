require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');
const { limiter } = require('./middlewares/limiter');

const router = require('./routes/index');

const { MONGO } = require('./utils/config');

const { START_SERVER_MESS } = require('./utils/constants');

const { PORT = 3000, NODE_ENV, DB } = process.env;

const app = express();

const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
