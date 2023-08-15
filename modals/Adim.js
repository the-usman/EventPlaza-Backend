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
        image :{
            type : String,
            default : "default.png"
        },
        type:{
            type:String,
            default:"admin"
        }
    }
)

module.exports = mongoose.model('adim', AdimSchema)