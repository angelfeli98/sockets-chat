
const { io } = require('../app');

io.on('connection', (client) => {
    console.log(`Client connected`);
})