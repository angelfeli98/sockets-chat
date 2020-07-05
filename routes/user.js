
const express = require('express');
const app = express.Router();
const User = require('../controllers/user');
const Middlewares = require('../middlewares/verifyToken');

app.post('/savedUser', User.savedUser);
app.post('/login', User.loginUser);
app.post('/initChat', Middlewares.decodedToken);

module.exports = app;