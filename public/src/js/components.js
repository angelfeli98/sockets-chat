
const path = window.location.pathname;
const hash = window.location;
import { Router } from './classes/router.js';
let buttonSingUp = document.querySelector('#SignUpSignIn');
let buttonSingIn = document.querySelector('#SignInSignIn');



const updateHtml = () => {
    buttonSingUp = document.querySelector('.logup');
    console.log(buttonSingUp);
}

// the action events button, location changes, etc
const events = () => {
    const router = new Router();

    window.addEventListener('load', () => {
        const token = sessionStorage.getItem('token');
        if(token)
            window.location.href = '/src/views/chat.html';

    });

    window.addEventListener('hashchange', () => {
        router.renderUrl(hash.hash);
    });


    if(buttonSingUp)
    buttonSingUp.addEventListener('click', async() => {
        hash.hash = '/signup';
    });

    if(buttonSingIn)
    buttonSingIn.addEventListener('click', async() => {
        const data = document.querySelector('#formEmailSingIn').value;
        const password = document.querySelector('#formPasswordSingIn').value;
        const rememberMe = document.querySelector('#remember').value;

        if(data && password){
            const body = JSON.stringify({ data, password });
            const res = await fetch('http://localhost:7070/user/login', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body
            });
            const ans = await res.json();
            if(ans.ok){
                (rememberMe == 'on') ? sessionStorage.setItem('token', ans.token) : localStorage.setItem('token', ans.token);
                router.setToken = ans.token;
                window.location.href = '/src/views/chat.html';
            }
            else if(ans.err.name == 'login error') alert(ans.err.message)

        }else alert('Data incompleted');
    });

}



const init = ()=>{
    events();
}

export{
    init
}