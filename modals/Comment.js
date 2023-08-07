const mongoose = require('mongoose')
const { Schema } = mongoose

const Comment = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    message: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('comment', Comment)