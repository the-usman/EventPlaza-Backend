const User = require('../modals/User')
const Adim = require('../modals/Adim');
const Comment = require('../modals/Comment');

const addComment = async (req, res) => {
    let success = false;
    const id = req.params.id;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            const admin = await Adim.findById(req.user.id);
            if (!admin)
                return res.status(400).json({ success, error: "UnAthourized Action" })
        }
        const comment = await Comment.create({
            user: req.user.id,
            post: id,
            message: req.body.message
        })
        success = true;
        res.status(200).json({ success, comment })
    } catch (error) {
        console.log("Error Is  :  ", error);
        res.status(500).json({ success, error: "Internal server error" })
    }
}

const getComment = async (req, res) => {
    let success = false;
    const id = req.params.id;
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(400).json({ success, error: "UnAthourized Action" })
        }
        const comment = await Comment.find({ post: id });
        success = true;
        res.status(200).json({ success, comment })
    } catch (error) {
        console.log("Error Is  :  ", error);
        res.status(500).json({ success, error: "Internal server error" })
    }
}

const deleteComment = async (req, res) => {
    let success = false;
    const id = req.params.id;
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(400).json({ success, error: "UnAthourized Action" })
        }
        const comment = await Comment.find({ post: id });
        const commentUserIds = comment.map((com) => com.user);
        const deleteResult = await Comment.deleteMany({ user: { $in: commentUserIds } });
        if (deleteResult.deletedCount > 0) {
            res.json({ success: true, message: "Comments deleted successfully" });
        } else {
            res.json({ success: false, message: "No comments found to delete" });
        }
    } catch (error) {
        console.log("Error Is  :  ", error);
        res.status(500).json({ success, error: "Internal server error" })
    }
}

module.exports = {
    deleteComment,
    getComment,
    addComment
}