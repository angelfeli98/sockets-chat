
const socket = io()
const buttonSend = document.getElementById('send');
const textField = document.getElementById('message');
const divMessages = document.getElementById('messages');

const idClient = document.getElementById('idClient');

let userData;

const socketEvents = () => {
    socket.on('connect', async() => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        const res = await fetch('http://localhost:7070/user/initChat', {
            method : 'POST',
            headers : {
                'token' : token
            }
        })

        const ans = await res.json();
        userData = ans.user;
        socket.emit('enterChat', ans.user.user, ans.user._id, (onlineUsers) => {
            const usersOnline = onlineUsers.filter(user => user.id != ans.user._id);
            console.log(usersOnline);
        });
        console.log('Conection made with server');
    })

    socket.on('connectionMessage', (message, otherUsers) => {
        console.log(message);
        console.log(typeof(otherUsers));
        const usersOnline = otherUsers.filter(user => user.id != userData._id);
        console.log(usersOnline);
    })

    socket.on('disconnect', () => {
        console.log('Lost Conection');
    })

    buttonSend.addEventListener('click', () => {
        const message = textField.value;
        const mess = document.createElement('div');
        const p = document.createElement('p');
        p.innerText = `you said: ${message}`;
        mess.appendChild(p);
        divMessages.appendChild(mess);
        const id = idClient.value;
        (id == "") ? socket.emit('message', message) : socket.emit('privateMessage', message, id);
    })


    socket.on('message', (message)=>{
        const mess = document.createElement('div');
        const p = document.createElement('p');
        p.innerText = message;
        mess.appendChild(p);
        divMessages.appendChild(mess);
    })

    socket.on('privateMessage', (message) => {
        console.log(message);
    })
}

export{
    socketEvents
}

