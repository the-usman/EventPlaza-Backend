const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdimSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now()
        },
        type:{
            type:String,
            default:"Adim"
        }
    }
)

module.exports = mongoose.model('adim', AdimSchema)