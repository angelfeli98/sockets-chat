
const { asycUpdateUser } = require('../controllers/user');

class UserOnline{

    static onlineUsers = []

    static get getUsers(){
        return UserOnline.onlineUsers;
    }

    static getUserOnline(id){
        return UserOnline.onlineUsers.find(userOnline => userOnline.connection_id == id );
    }

    static getUsersByRoom(room){
        return UserOnline.onlineUsers.filter(userOnline => userOnline.room == room);
    }

    static async deleteUserOnline(id){
        const user = UserOnline.onlineUsers.find(user => user.connection_id == id);
        await asycUpdateUser(user.id,  null );
        UserOnline.onlineUsers = UserOnline.onlineUsers.filter(user => user.connection_id != id);
        return user;
    }

    constructor(data){
        this.id = data._id;
        this.connection_id = data.connection_id;
        this.user = data.user;
        this.room = data.room;
        UserOnline.onlineUsers.push(this);
    }

    async updateIdConnection(){
        await asycUpdateUser(this.id, this.connection_id);
        return this;
    }
}


module.exports = UserOnline;