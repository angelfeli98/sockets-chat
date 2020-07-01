
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    text : {
        type : String,
        default : null
    },
    chat : {
        type : Schema.Types.ObjectId,
        required : [true, 'Chat must be provided']
    }
},
{
    timestamps : true
})