
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    owners : {
        type : [Schema.Types.ObjectId],
        ref : 'users',
        require : [true, 'Owners requires']
    },
    messages : {
        type : [Schema.Types.ObjectId],
        ref : 'messages',
        default : null
    },
    img : {
        type : String,
        default : null,
        required : false
    },
    files : {
        type : [String],
        default : null
    },
    imgs : {
        type : [String],
        default : null
    }
});

const opt = {
    message : '{PATH} must be provided'
}

ChatSchema.plugin(uniqueValidator, opt);

module.exports = mongoose.model('Chat', ChatSchema);