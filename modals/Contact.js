const mongoose = require('mongoose')
const {Schema} = mongoose

const Contact = new Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    message:{
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true
    },
    Date : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model('contact', Contact)