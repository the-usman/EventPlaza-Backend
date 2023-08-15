const RemindMe = require('../modals/Remindme')
const Post = require('../modals/Post')
const User = require('../modals/User')
const Adim = require('../modals/Adim')

const addRemindMe = async (req, res) => {
    let success = false
    const id = req.params.id;
    try {
        let user = await User.findById(req.user.id)
        if (!user) {
            user = await Adim.findById(req.user.id)
            if (!user)
                return res.status(400).json({ success, error: "Please login or signup please" })
        }
        const favour = await RemindMe.create({
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

const getRemindMe = async (req, res) => {
    let success = false
    try {
        let user = await User.findById(req.user.id)
        if (!user) {
            user = await Adim.findById(req.user.id)
            if (!user)
                return res.status(400).json({ success, error: "Please login or signup please" })
        }
        const data = await RemindMe.find({ user: req.user.id })

        const RemindMePostIds = data.map((fav) => fav.post);
        const posts = await Post.find({ _id: { $in: RemindMePostIds } });
        success = true;
        res.status(200).json({ success, posts })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "internal server error" })
    }
}

const deleteRemindMe = async (req, res) => {
    let success = false;
    const id = req.params.id;
    try {
        let user = await User.findById(req.user.id)
        if (!user) {
            user = await Adim.findById(req.user.id)
            if (!user)
                return res.status(400).json({ success, error: "Please login or signup please" })
        }
        const removed = await RemindMe.findOneAndDelete({post : id});
        if(!removed){
            return res.status(400).json({success, error : "This post not exist in the RemindMe of your"})
        }
        success = true;
        res.status(400).json({success, removed})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "internal server error" })
    }
}

module.exports = {
    getRemindMe,
    deleteRemindMe,
    addRemindMe,
}