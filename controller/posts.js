const { validationResult } = require('express-validator');
const Adim = require('../modals/Adim');
const Post = require('../modals/Post');
const fs = require('fs');
const path = require('path');
const addPost = async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty())
        return res.status(400).json({ success, error })
    try {
        const adim = Adim.findById(req.user.id)
        if (!adim)
            return res.status(400).json({ success, error: "Unathurized action" })

        console.log(req.body.title, req.body.content, req.body.date, req.body.location, req.body.price)
        const post = await Post.create(
            {
                title: req.body.title,
                content: req.body.content,
                lastDate: req.body.date,
                location: req.body.location,
                price: req.body.price
            }
        )
        success = true;
        res.status(200).json({ success, message: "Post Successully created", id: post.id })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success, error: "Internal server error" })
    }
}

const addImage = async (req, res) => {
    let success = false;
    try {
        const adim = await Adim.findById(req.user.id);
        if (!adim)
            return res.status(400).json({ success, error: "Unauthorized action" });

        const id = req.params.id;
        console.log(id);
        console.log(req.file.filename)
        const data = {
            image: req.file.filename,
        };
        const updatedPost = await Post.findByIdAndUpdate(id, { $set: data }, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ success, error: "Post not found" });
        }
        success = true;

        res.status(200).json({ success, updatePost});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "Internal server error" });
    }
};


const updatePost = async (req, res) => {
    let success = false;
    const { title, content, lastDate, location, price } = req.body
    try {
        const adim = await Adim.findById(req.user.id)
        if (!adim)
            return res.status(400).json({ success, error: "Unathurized action" })
        const id = req.params.id;
        const post = await Post.findById(id);
        if (!post)
            return res.status(400).json({ success, error: "Post not Exist" })
        const newObject = {}
        if (title) (newObject.title = title)
        if (content) (newObject.content = content)
        if (lastDate) (newObject.lastDate = lastDate)
        if (location) (newObject.location = location)
        if (price) (newObject.price = price)
        const updatedPost = await Post.findByIdAndUpdate(id, { $set: newObject }, { new: true })
        success = true;
        res.status(200).json({ success, updatedPost })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "Internal server error" });
    }
}

const deletedFile = 'C:\\Users\\lenovo\\Desktop\\EventManagment\\back-end\\uploads';
const deletePost = async (req, res) => {
    const id = req.params.id;
    let success = false;
    try {
        const adim = await Adim.findById(req.user.id);
        console.log('Admin:', adim);
        if (!adim)
            return res.status(400).json({ success, error: "Unauthorized action" });
        const post = await Post.findById(id);
        console.log('Post:', post);
        if (!post)
            return res.status(400).json({ success, error: "Post not Exist" })
        const filenameToDelete = 'filename.jpg';

        const filePath = path.join(deletedFile, `${id}.png`);
        if (fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
                console.log(`Successfully deleted ${filenameToDelete}.`);
            } catch (err) {
                console.error(`Error deleting ${filenameToDelete}:`, err);
            }
        } else {
            console.log({ success, error: "Image not exist" });
        }
        const deletePost = await Post.findByIdAndDelete(id);
        success = true;
        res.status(200).json({ success, deletePost });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "Internal server error" });
    }
};

const getPosts = async (req, res) => {
    let success = false;
    try {
        const page = req.body.page || 1;
        const numOfPost = req.body.numOfPost || 5;
        const skipCount = (page - 1) * numOfPost;
        const allPost = await Post.find().skip(skipCount).limit(numOfPost);
        success = true;
        res.status(200).json({success, allPost})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "Internal server error" });
    }
}

module.exports = {
    addPost,
    addImage,
    updatePost,
    deletePost,
    getPosts
}