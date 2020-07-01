
const hash = window.location;
import { Router } from './classes/router.js';
let buttonSingUp = document.querySelector('.logup');
let buttonSingIn = document.querySelector('.login');

// initial configutation
const config = () => {
    const router = new Router();
    if(hash.hash != '' && hash.hash != '/#')
        router.renderUrl(hash.hash);
}

const updateHtml = () => {
    buttonSingUp = document.querySelector('.logup');
    console.log(buttonSingUp);
}

// the action events button, location changes, etc
const events = () => {
    const router = new Router();

    window.addEventListener('hashchange', () => {
        router.renderUrl(hash.hash).then(() => {
            updateHtml();
        })
    })

    buttonSingUp.addEventListener('click', async() => {
        console.log('click');
        hash.hash = '/signup';
    })

    buttonSingIn('click', () => {

    })

}



const init = ()=>{
    config();
    events();
}

export{
    init
}