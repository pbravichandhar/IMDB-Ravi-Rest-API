const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const { logError, returnError } = require('./_helpers/errorHandler')
const jwt = require('./_helpers/jwt');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// use JWT auth to secure the api
app.use(jwt());

// Initialize DB
require('./initDB')();

const userRoutes = require('./routes/user.route');
app.use('/users', userRoutes);

// Common Error handler
app.use(logError)
app.use(returnError)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`IMDB Server running @Port - ${PORT}...`);
});
