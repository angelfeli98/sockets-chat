
class LiUser{

    #liUser = document.createElement('li');

    constructor(id, status, name, img){
        const aUser = document.createElement('a');

        const imgUser = document.createElement('img');
        imgUser.src = img;
        imgUser.classList.add('img-circle');
        imgUser.alt = 'user-img';

        const spanUser = document.createElement('span');
        spanUser.innerText = name;

        const smallUser = document.createElement('small');
        smallUser.classList.add('text-success');
        smallUser.innerText = status;

        spanUser.append(smallUser);

        aUser.append(imgUser);
        aUser.append(spanUser);

        this.#liUser.append(aUser);
        this.#liUser.id = id;
    }

    get getLiUser(){
        return this.#liUser;
    }
}

export{
    LiUser
}