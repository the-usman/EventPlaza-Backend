const mongoose = require('mongoose');
const {Schema} = mongoose

const post = new Schema({
    title:{
        type:String,
        required : true
    },
    description :
    {
        type : String,
        required : true
    },
    tag : {
        type: String,
        defualt : "default"
    },
    ticketPrice : 
    {
        type:Number,
        defualt : 0
    },
    Date :
    {
        type: Date,
        default : Date.now()
    }

})


module.exports = mongoose.model('post', post)
