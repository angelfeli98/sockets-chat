

import { Message } from '../components/messageClass.js';
import { LiUser } from '../components/chatUsers.js';
import { BoxChat } from '../components/boxChat.js';

const socket = io(),
      buttonSend = document.getElementById('send'),
      textMessages = document.querySelector('textarea'),
      ulonlineUsers = document.getElementById('divUsuarios'),
      chatTitle = document.getElementById('chatTitle'),
      usersChats = document.getElementById('usersChat');

let userData;
let usersOnlineGlobal = [];
let actualdiv;
let actualChat;

const generateGeneralChat = () => {
    const html = `
    <li id = "chat">
        <a href="javascript:void(0)" class="active"> Chat of <span> everyone</span></a>
    </li>
    `;
    return html;
}

const socketEvents = () => {
    socket.on('connect', async() => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        const res = await fetch('https://chatangel98.herokuapp.com/user/initChat', {
            method : 'POST',
            headers : {
                'token' : token
            }
        })

        const ans = await res.json();
        userData = ans.user;

        socket.emit('enterChat', ans.user.user, ans.user._id, (onlineUsers) => {
            const usersOnline = onlineUsers.filter(user => user.id != ans.user._id);
            usersOnlineGlobal = usersOnline;
            ulonlineUsers.innerHTML = '';
            ulonlineUsers.innerHTML = generateGeneralChat();
            actualdiv = document.getElementById('chat');
            usersChats.innerHTML = '';

            actualChat = document.querySelector('#divChatbox');
            usersOnline.forEach(userOnline => {
                const src = '../../../assets/images/users/user_uknow.jpg';
                const liOnlineUser = new LiUser(userOnline.id, 'online', userOnline.user, src);
                const chatBox = new BoxChat(userOnline.id);
                usersChats.append(chatBox.getBoxChat);
                ulonlineUsers.append(liOnlineUser.getLiUser);
            });
        });
        console.log('Conection made with server');
    })

    socket.on('connectionMessage', (message, otherUsers) => {
        console.log(message);
        const usersOnline = otherUsers.filter(user => user.id != userData._id);
        usersOnlineGlobal = usersOnline;
        ulonlineUsers.innerHTML = '';
        usersChats.innerHTML = '';
        ulonlineUsers.innerHTML = generateGeneralChat();
        usersOnline.forEach(userOnline => {
            const src = '../../../assets/images/users/user_uknow.jpg';
            const liOnlineUser = new LiUser(userOnline.id, 'online', userOnline.user, src);
            const chatBox = new BoxChat(userOnline.id);
            usersChats.append(chatBox.getBoxChat);
            ulonlineUsers.append(liOnlineUser.getLiUser);
        });
    })

    socket.on('disconnect', () => {
        console.log('Lost Conection');
    })

    buttonSend.addEventListener('click', () => {
        const message = textMessages.value;
        if(message != ''){
            const src= '../../../assets/images/users/user_uknow.jpg';
            const date = new Date();
            const now = `${date.getHours()}:${(date.getMinutes() < 10)? `04${date.getMinutes()}` : date.getMinutes()}`;
            const liMessage = new Message('You', message, src, now, true);

            const data = {
                message,
                name : userData.user,
                now,
                src,
                id : userData._id
            }

            textMessages.value = '';

            actualChat.append(liMessage.getMessage);
            let goal;
            usersOnlineGlobal.forEach(user => {
                if(user.id == actualdiv.id)
                    goal = user;
            });
            (actualdiv.id == 'chat')? socket.emit('message', data): socket.emit('privateMessage', data, goal.connection_id);
        }
    })


    socket.on('message', (data)=>{
        const liMesaage = new Message(data.name, data.message, data.src, data.now, false);
        const ulChat = document.querySelector('#divChatbox');
        ulChat.append(liMesaage.getMessage);
    })

    socket.on('privateMessage', (message, friend) => {
        const idname = `ul[idname="${message.id}"]`;
        const boxCaht = document.querySelector(idname);

        const userMessage = new Message(message.name, message.message, message.src, message.now, false);
        boxCaht.append(userMessage.getMessage);
    })
}

const doomEvents = () => {

    ulonlineUsers.addEventListener('click', (element) => {
        let liUser;
        element.path.forEach(element =>{
            if(element.nodeName == 'LI'){
                liUser = element
            }
        });

        const id = liUser.id;
        if(id != 'chat'){
            const user = usersOnlineGlobal.find(userOnline => userOnline.id == id)
            chatTitle.innerText = user.user;
        }
        else{
            chatTitle.innerHTML = 'General'
        }
        actualChat.classList.add('disable');
        const adivUserOnline = liUser.querySelector('a');
        actualdiv.querySelector('a').classList.remove('active');
        adivUserOnline.classList.add('active');
        actualdiv = liUser;
        const idname = `ul[idname="${actualdiv.id}"]`;
        actualChat = document.querySelector(idname);
        actualChat.classList.remove('disable');
    })
}

export{
    socketEvents,
    doomEvents
}

