
import { socketEvents } from './sokcets/socket.js';
const buttonLogUp = document.querySelector('.logup');



const events = () => {

    (buttonLogUp)
    buttonLogUp.addEventListener('click', () => {
        console.log('click');
    });

}



const init = () => {
    socketEvents();
    events();
}


export{
    init
}