
const express = require('express');
const app = express.Router();
const User = require('../controllers/user');

app.post('/savedUser', User.savedUser);
app.post('/login', User.loginUser);

module.exports = app;