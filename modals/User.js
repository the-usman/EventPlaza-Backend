const mongoose = require('mongoose')
const {Schema} = mongoose

const User= new Schema ({
    name:{
        type: String,
        required:true,
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    Date : {
        type : Date,
        default : Date.now()
    },
    type:{
        type:String,
        default : "User"
    },
    image : {
        type:String,
        default: "defualt.png"
    }
})


module.exports = mongoose.model('user', User)