
class Router{

    static routerActive = null;

    #url = 'http://localhost:7070/user';
    #token = null;
    #routes = {
        '' : () => {
                this.rederLogin();
            },
        '#' : () => {
                this.rederLogin();
            },
        'signup' :  () => {
                this.rederSignUp();
            },
        'home' : () => {
                this.verify();
            }
    }

    #left = document.querySelector('.left');
    #right = document.querySelector('.right');

    constructor(){
        Router.routerActive = (Router.routerActive) ? Router.routerActive : this;
        return Router.routerActive;
    }

    async renderUrl(url){
        const page = url.split('/')[1];
        this.#left.classList.add('disabe');
        this.#right.classList.add('disabe');
        console.log(page);
        if(this.#routes[page]) this.#routes[page]();
        else if(!!!page) await this.rederLogin();
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

        if(data.ok) console.log('Go to chat');
        else window.location.hash = '';
    }

    async rederSignUp(){
        console.log(`Render SignUp`);
        const html = `
        <div class="form">
            <table class="tableForm">
                <th class="th1"></th>
                <th class="th2"></th>
                <th class="th3"></th>
                <th class="th4"></th>
            </table>
            <h1 class="title-left"> Sing Up </h1>
            <form action="">
                <label for="formUser">User</label><br>
                <input id="formUser" type="text" required autocomplete="username"><br>
                <label for="formEmail">Email</label><br>
                <input id="formEmail" type="email" required><br>
                <label for="formPassword">Password</label><br>
                <input id="formPassword" type = "password" required autocomplete="current-password"><br>
                <label for="formConfirPassword">Confirm password</label><br>
                <input id="formConfirmPassword" type = "password" required autocomplete="current-password"><br>
                <label for = "file">Image</label>
                <input id="formFile" type="file"><br>
            </form>
            <button class="login" onclick="">Sign Up</button>
            <label>
                <input type="checkbox" checked="checked" name="remember"> Remember me
            </label>
        </div>
        `;
        this.#right.innerHTML = html;
        this.#left.classList.remove('disabe');
        this.#right.classList.remove('disabe');
    }

    async rederLogin(){
        const html = `
        <div class="form">
            <table class="tableForm">
                <th class="th1"></th>
                <th class="th2"></th>
                <th class="th3"></th>
                <th class="th4"></th>
            </table>
            <h1 class="title-left"> Sing In </h1>
            <form action="">
                <label for="formEmail">User or email</label><br>
                <input id="formEmail" type="email" required autocomplete="username"><br>
                <label for="formPassword">Password</label><br>
                <input id="formPassword" type = "password" required autocomplete="current-password"><br>
            </form>
            <button class="login" onclick="">Sing In</button>
            <button class="logup" onclick="" >Sign Up</button><br>
            <label>
                <input type="checkbox" checked="checked" name="remember"> Remember me
            </label>
        </div>
        `;
        this.#right.innerHTML = html;
        this.#left.classList.toggle('disabe');
        this.#right.classList.toggle('disabe');
    }

}

export{
    Router
}