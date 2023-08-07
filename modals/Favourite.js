
const mongoose = require('mongoose');
const { Schema } = mongoose

const Favourite = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }
})

module.exports = mongoose.model('Favourite', Favourite)