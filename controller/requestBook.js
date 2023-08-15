const Post = require('../modals/Post');
const RequestBook = require('../modals/RequestBook');
const Admin = require('../modals/Adim');
const Book = require('../modals/Book')
const User = require('../modals/User')

const addBookRequest = async (req, res) => {
    let success = false;
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        let user = await User.findById(req.user.id)
        if (!user) {
            user = await Admin.findById(req.user.id)
            if (!user)
                return res.status(400).json({ success, error: "Please Login" })
        }
        if (!post)
            return res.status(400).json({ success, error: "Post does not exist" });
        const existingRequest = await Book.findOne({
            user: req.user.id,
            post: id
        });
        if (existingRequest) {
            return res.status(400).json({ success, error: "Request already exists for this user and post" });
        }
        console.log(req.body.name, req.body.email)
        const postId = post.id;
        const adminId = post.admin;
        
        const book = new Book({
            user: req.user.id,
            post: postId,
            title: post.title,
            lastdate : post.lastDate,
            location : post.location
        })
        const newRequest = await RequestBook.create({
            post: postId,
            admin: adminId,
            user: req.user.id,
            reqId: book.id,
            name: req.body.name,
            title: post.title,
            email : req.body.email
        });
        await book.save()
        success = true;
        res.status(201).json({ success: true, post });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "Internal server error" });
    }
}


const getRequests = async (req, res) => {
    let success = false
    try {
        const admin = await Admin.findById(req.user.id);
        if (!admin)
            return res.status(400).json({ success, error: "Invalid Credentials" })
        const posts = await RequestBook.find({ admin: req.user.id })
        return res.status(200).json({ success: true, posts })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "Internal server error" });
    }
}

const AcceptRequest = async (req, res) => {
    let success = false;
    const id = req.params.id
    try {
        const admin = await Admin.findById(req.user.id);
        if (!admin)
            return res.status(400).json({ success, error: "Invalid Credentials" })
        const data = {
            status: "Accepted"
        }
        const book1 = await RequestBook.findById(id)
        const book = await Book.findByIdAndUpdate(book1.reqId, { $set: data }, { new: true })
        if (!book)
            return res.status(400).json({ success, error: "No book request are there of this id" })
        success = true;
        const book2 = await RequestBook.findByIdAndDelete(id);
        return res.status(200).json({ success, message: "Booking is accepted successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "Internal server error" });
    }
}
const RejectRequest = async (req, res) => {
    let success = false;
    const id = req.params.id
    try {
        const admin = await Admin.findById(req.user.id);
        if (!admin)
            return res.status(400).json({ success, error: "Invalid Credentials" })
        const data = {
            status: "Rejected",
            reason: req.body.reason + ". For futher info contact us by our contact us page"
        }
        const book1 = await RequestBook.findById(id)
        const book = await Book.findByIdAndUpdate(book1.reqId, { $set: data }, { new: true })
        if (!book)
            return res.status(400).json({ success, error: "No book request are there of this id" })
        success = true;
        const book2 = await RequestBook.findByIdAndDelete(id);
        return res.status(200).json({ success, message: "Booking is rejected Successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "Internal server error" });
    }
}

const getBook = async (req, res) => {
    let success = false;
    try {
        const posts = await Book.find({
            user : req.user.id
        });
        if(!posts) 
        return res.status(400).json({success, error:"No Booking exist"})
    success = true;
    return res.status(200).json({success, posts})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "Internal server error" });
    }
}


module.exports = {
    addBookRequest,
    getRequests,
    AcceptRequest,
    RejectRequest,
    getBook
};
