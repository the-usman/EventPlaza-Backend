const Book = require('../modals/Book')
const Post = require('../modals/Post')
const User = require('../modals/User')

const addBook = async (req, res) => {
    let success = false
    const id = req.params.id;
    try {
        const user = await User.findById(req.user.id)
        if (!user)
            return res.status(400).json({ success, error: "Please login or signup please" })
        const favour = await Book.create({
            user: req.user.id,
            post: id
        })
        success = true;
        res.status(200).json({ success, favour })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "internal server error" })
    }
}

const getBook = async (req, res) => {
    let success = false
    try {
        const user = await User.findById(req.user.id)
        if (!user)
            return res.status(400).json({ success, error: "Please login or signup please" })
        const data = await Book.find({ user: req.user.id })

        const BookPostIds = data.map((fav) => fav.post);
        const posts = await Post.find({ _id: { $in: BookPostIds } });
        success = true;
        res.status(200).json({ success, posts })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "internal server error" })
    }
}

const deleteBook = async (req, res) => {
    let success = false;
    const id = req.params.id;
    try {
        const user = await User.findById(req.user.id)
        if (!user)
            return res.status(400).json({ success, error: "Please login or signup please" })
        const removed = await Book.findByIdAndDelete(id);
        if(!removed){
            return res.status(400).json({success, error : "This post not exist in the Book of your"})
        }
        success = true;
        res.status(400).json({success, removed})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "internal server error" })
    }
}

module.exports = {
    getBook,
    deleteBook,
    addBook,
}