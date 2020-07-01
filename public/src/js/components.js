
const path = window.location.pathname;
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
        console.log(path);
        const token = localStorage.getItem('token')
        if(token){
            router.setToken = token;
            console.log('token');
            router.renderUrl('/home');
        }
        else
            router.renderUrl(path);
    });

    window.addEventListener('hashchange', () => {
        router.renderUrl(path);
    });


    if(buttonSingUp)
    buttonSingUp.addEventListener('click', async() => {
        router.renderUrl('/signup');
    });

    if(buttonSingIn)
    buttonSingIn.addEventListener('click', async() => {
        const data = document.querySelector('#formEmailSingIn').value;
        const password = document.querySelector('#formPasswordSingIn').value;

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
                sessionStorage.setItem('token', ans.token);
                router.setToken = ans.token;
                hash.hash = '/home';
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