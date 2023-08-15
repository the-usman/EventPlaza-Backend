const express = require('express');
const { addPost, addImage, updatePost, deletePost, getPosts, getEditPost } = require('../controller/posts');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:\\Users\\lenovo\\Desktop\\EventManagment\\back-end\\uploads\\post');
    },
    filename: function (req, file, cb) {
        const filename = req.params.id + path.extname(file.originalname);
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });



router.post('/createpost', fetchUser, addPost);
router.post('/addimage/:id', fetchUser, upload.single('image'), addImage);
router.post('/updatepost/:id', fetchUser, updatePost)
router.delete('/deletepost/:id', fetchUser, deletePost)
router.get('/getpost/:page', getPosts)
router.get('/geteditpost',fetchUser, getEditPost)
module.exports = router;
