
class BoxChat{

    #ulChatBox = document.createElement('ul');

    constructor(user){
        this.#ulChatBox.classList.add('disable');
        this.#ulChatBox.classList.add('chat-list');
        this.#ulChatBox.classList.add('p-20');
        this.#ulChatBox.id = 'divChatbox';
        const userAttribue = document.createAttribute('idname');
        userAttribue.value = user;

        this.#ulChatBox.attributes.setNamedItem(userAttribue);
    }

    get getBoxChat(){
        return this.#ulChatBox;
    }
}

export{
    BoxChat
}