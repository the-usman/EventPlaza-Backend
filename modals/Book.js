
const mongoose = require('mongoose');
const { Schema } = mongoose

const Book = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    status : {
        type : String,
        default : "Pending"
    },
    reason : {
        type : String,
        default : ""
    },
    title : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    lastdate : {
        type : Date,
        required : true
    }
})

module.exports = mongoose.model('Book', Book)