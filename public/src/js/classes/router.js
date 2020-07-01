
class Router{

    static routerActive = null;

    #url = 'http://localhost:7070/user';
    #token = null;
    #routes = {
        '/' : () => {
            console.log('HOME');
            },
        '/signup' :  () => {
            console.log('SIGNUP');
        },
        '/home' : () => {
            console.log('CHAT');
            },
        '/sigin' : () => {
            console.log('SINGIN');
        }
    }

    #left = document.querySelector('.left');
    #right = document.querySelector('.right');

    constructor(){
        Router.routerActive = (Router.routerActive) ? Router.routerActive : this;
        return Router.routerActive;
    }

    set setToken(token){
        this.#token = token;
    }

    async renderUrl(url){
        if(this.#routes[url]){
            window.location.hash = url;
            this.#routes[url]();
        }
        else console.log('Page not found 404');
    }

    async verify(){
        const res = await fetch(this.#url + '/token', {
            method : 'POST',
            headers : {
                'token' : this.#token
            }
        })

        const data = await res.json();

        if(data.ok) this.renderChat();
        else window.location.hash = '';
    }

    async rederSignUp(){
        // this.#right.innerHTML = html;
        document.getElementById('divSingIn').classList.add('disabe');
        document.getElementById('divSingUp').classList.remove('disabe');
        document.querySelector('.divWellcome').classList.remove('disabe');
    }

    async rederLogin(){

        // this.#right.innerHTML = htmlRight;
        // this.#left.innerHTML = htmlLeft;
        document.getElementById('divSingIn').classList.remove('disabe');
        document.getElementById('divSingUp').classList.add('disabe');
        document.querySelector('.divWellcome').classList.remove('disabe');
    }

    renderChat(){
        document.querySelector('.divWellcome').classList.add('disabe');
        document.getElementById('divSingIn').classList.add('disabe');
        document.getElementById('divSingUp').classList.add('disabe');

    }
}

export{
    Router
}