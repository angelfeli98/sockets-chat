


const socket = io();

const socketEvents = () => {
    socket.on('connect', () => {

        socket.emit('enterChat', 'Felipe')
        console.log('Conection made with server');
    })

    socket.on('disconnect', () => {
        console.log('Lost Conection');
    })
}


export{
    socketEvents
}

