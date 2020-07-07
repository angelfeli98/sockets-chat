

class Message{

    #messageLi = document.createElement('li');

    constructor(name , message, img, time, owner){
        const divImg = document.createElement('div');
        const image = document.createElement('img');
        image.src = img;
        divImg.classList.add('chat-img');
        divImg.appendChild(image);

        const divOwner = document.createElement('div');
        divOwner.classList.add('chat-content');

        const person = document.createElement('h5');
        person.innerText = name;
        divOwner.append(person);

        const divMessage = document.createElement('div');
        divMessage.classList.add('box');
        divMessage.innerText = message;

        divOwner.appendChild(divMessage);

        const divTime = document.createElement('div');
        divTime.classList.add('chat-time');
        divTime.innerText = time;

        if(owner){
            divMessage.classList.add('bg-light-inverse');
            this.#messageLi.classList.add('reverse');
            this.#messageLi.append(divOwner);
            this.#messageLi.append(divImg);
            this.#messageLi.append(divTime);
        }
        else{
            divMessage.classList.add('bg-light-info');
            this.#messageLi.append(divImg);
            this.#messageLi.append(divOwner);
            this.#messageLi.append(divTime);
        }
    }

    get getMessage(){
        return this.#messageLi;
    }

}

export{
    Message
}