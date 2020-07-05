
const { io } = require('../app');
const { asycUpdateUser } = require('../controllers/user');
const User = require('../classes/user');
const { makeMessage } = require('./events/events');

io.on('connection', (client) => {
    console.log(`Client connected ${client.id} `);

    client.on('enterChat', async(name, id, callback) => {
        const info = {_id : id , user : name , connection_id : client.id};
        const user  = new User(info);
        await user.updateIdConnection();
        console.log(`${name} is into chat with connection_id: ${user.connection_id}`);
        const message = `${name} joing to the chat`;
        client.broadcast.emit('connectionMessage', message, User.onlineUsers);
        callback(User.onlineUsers);
    })

    client.on('disconnect', async() => {
        const user = await User.deleteUserOnline(client.id);
        const message = `${user.user} left the chat`
        client.broadcast.emit('connectionMessage', message);
        console.log(`User disconnect ${client.id}`);
    })

    client.on('message', (data) => {
        const message = makeMessage(client.id, data);
        client.broadcast.emit('message', message);
    })

    client.on('privateMessage', (data, goal) => {
        const message = makeMessage(client.id, data);
        client.broadcast.to(goal).emit('privateMessage', message);
    })
})
