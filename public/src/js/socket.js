
const socket = io();

const socketEvents = () => {
    socket.on('connect', () => {
        console.log('Conection made with server');
    })
}


export{
    socketEvents
}

