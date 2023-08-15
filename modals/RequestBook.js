const mongoose = require('mongoose')
const {Schema} = mongoose;

const RequestBook = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    admin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "admin"
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'post'
    },
    date :{
        type : Date,
        default : Date.now()
    },
    reqId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
    },
    name : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('requestbook', RequestBook )