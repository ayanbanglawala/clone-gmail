const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    sender:{
        type: String,
        required: true
    },
    reciever:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true,
        default:false
    },
    message:{
        type: String,
        required: true
    },
    starred:{
        type: Boolean,
        default: false
    },
    read:{
        type: Boolean,
        default: false
    },
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Mails', userSchema);