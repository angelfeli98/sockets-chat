
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.resolve(__dirname, 'public/src')));

module.exports.io = socketIO(server);
require('./sockets/socket');


module.exports = {
    server
}