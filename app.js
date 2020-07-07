
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const api = require('./routes/user');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cors());

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin','*');
    res.header('Acces-Control-Allow-Headers','X-API-KEY,Origin,X-Requested-With,Content-Type,Accept, Acces-Control-Requested-Method');
    res.header('Acces-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.header('Allow','GET,PUT,DELETE,POST');
    next();
})

app.use('/user', api);

module.exports.io = socketIO(server);
require('./sockets/socket');


module.exports = {
    server
}