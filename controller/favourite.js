const Favourite = require('../modals/Favourite')
const Post = require('../modals/Post')
const User = require('../modals/User')

const addFavorite = async (req, res) => {
    let success = false
    const id = req.params.id;
    try {
        const user = await User.findById(req.user.id)
        if (!user)
            return res.status(400).json({ success, error: "Please login or signup please" })
        const favour = await Favourite.create({
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

const getFavorite = async (req, res) => {
    let success = false
    try {
        const user = await User.findById(req.user.id)
        if (!user)
            return res.status(400).json({ success, error: "Please login or signup please" })
        const data = await Favourite.find({ user: req.user.id })

        const favoritePostIds = data.map((fav) => fav.post);
        const posts = await Post.find({ _id: { $in: favoritePostIds } });
        success = true;
        res.status(200).json({ success, posts })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "internal server error" })
    }
}

const deleteFavorite = async (req, res) => {
    let success = false;
    const id = req.params.id;
    try {
        const user = await User.findById(req.user.id)
        if (!user)
            return res.status(400).json({ success, error: "Please login or signup please" })
        const removed = await Favourite.findByIdAndDelete(id);
        if(!removed){
            return res.status(400).json({success, error : "This post not exist in the favourite of your"})
        }
        success = true;
        res.status(400).json({success, removed})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "internal server error" })
    }
}

module.exports = {
    getFavorite,
    deleteFavorite,
    addFavorite,
}