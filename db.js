const mongoose = require('mongoose')
const dbURL = "mongodb://127.0.0.1:27017/event-app"

async function connectToMongoDb() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/event-app');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}


module.exports = connectToMongoDb