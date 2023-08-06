const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: "defualt.png"
  },
  location: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now()
  },
  lastDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  }

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;