
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type : String,
        unique : true,
        required : [true, 'Name not provided']
    },
    email : {
        type : String,
        unique : true,
        required : [true, 'email not provide']
    },
    password : {
        type : String,
        unique : true,
        required : [true, 'password not provided']
    },
    img : {
        type : String,
        required : false,
        default : null,
    },
    friends : {
        type : [ Schema.Types.ObjectId ],
        ref : 'friend',
        default : null,
    },
    google : {
        type : Boolean,
        default : false
    }
}
,
{
    timestamps : true
});

UserSchema.methods.toJSON = function(){
    const user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

const opt = {
    message : '{PATH} must be unique'
}

UserSchema.plugin(uniqueValidator, opt);

module.exports = mongoose.model('User', UserSchema);