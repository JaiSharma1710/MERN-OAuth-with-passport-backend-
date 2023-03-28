const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });
const Router = require('./routes/routes');
const cors = require('cors');
const activatePassport = require('./passport');

const app = express();

//to prevent cors error
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PATCH, DELETE, PUT',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  }),
);

//to read the res.body
app.use(express.json());

//to activate passport
activatePassport();

//routes
app.use('/', Router);

module.exports = app;
