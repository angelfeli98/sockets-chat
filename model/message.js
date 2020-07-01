
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

module.exports = mongoose.model('Message', MessageSchema);