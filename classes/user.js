
const { asycUpdateUser } = require('../controllers/user');

class UserOnline{

    static onlineUsers = []

    static get getUsers(){
        return UserOnline.onlineUsers;
    }

    constructor(data){
        this.id = data._id;
        this.connection_id = data.connection_id;
        this.room = null;

        asycUpdateUser(this.id, { connection_id : this.connection_id });

        UserOnline.onlineUsers.push(this);
    }

    get getUserOnline(id){
        return UserOnline.onlineUsers.find(userOnline => userOnline.connection_id == id )
    }

    deleteUserOnline(id){
        const user = UserOnline.onlineUsers.find(user => user.connection_id == id);
        asycUpdateUser(user.id, { conection_id : null });
        UserOnline.onlineUsers =  UserOnline.onlineUsers.filter(user => user.conection_id != id);
    }
}


module.exports = UserOnline;