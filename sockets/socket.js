
const { io } = require('../app');

io.on('connection', (client) => {
    console.log(`Client connected ${client.id} `);

    client.on('enterChat', data => {
        console.log(`${data} entro al chat`);
    })

    client.on('disconnect', () => {
        console.log(`User disconnect ${client.id}`);
    })
})
