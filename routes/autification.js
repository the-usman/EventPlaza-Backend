const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const config = require('../config.json')
const fetchUser = require('../middleware/fetchUser')
const { getUser, createUser, Login, createAdim, adimLogin, getAdim, updateAdim, addAdimImage, updateUser} = require('../controller/authControllers')
const Adim = require('../modals/Adim')
const multer = require('multer');
const path = require('path')
const User = require('../modals/User')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'C:\\Users\\lenovo\\Desktop\\EventManagment\\back-end\\uploads\\profile');
    },
    filename: (req, file, cb) => {
        const filename = req.user.id + path.extname(file.originalname)
        cb(null, filename)
    }
})

const upload = multer({ storage: storage })


const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'C:\\Users\\lenovo\\Desktop\\EventManagment\\back-end\\uploads\\profile');
    },
    filename: (req, file, cb) => {
        const filename = req.params.id + path.extname(file.originalname)
        cb(null, filename)
    }
})

const upload1 = multer({ storage: storage1 })

router.post('/addimage', fetchUser, upload.single('image'), async (req, res) => {
    let success = false;
    console.log(req.file.filename)
    try {
        const data = {
            image: req.file.filename
        }
        const user = await User.findByIdAndUpdate(req.user.id, { $set: data }, { new: true });
        success = true;
        res.status(200).json({success, user})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "internal server error" })
    }
})


router.post('/createuser', [
    body('name', "Enter the valid name").isLength({ min: 3 }),
    body('email', 'Enter the valid email').isEmail(),
    body('password', 'enter the valid password').isLength({ min: 3 })
], createUser)

router.post('/login', [
    body('email', "Enter the valid email").isEmail(),
    body('password', 'Enter the valid password').isLength({ min: 3 })
], Login)

router.get('/getuser', fetchUser, getUser)


router.post('/createadim', fetchUser, [
    body('name', "Enter the valid name").isLength({ min: 3 }),
    body('email', 'Enter the valid email').isEmail(),
    body('password', 'enter the valid password').isLength({ min: 3 })
], createAdim);

router.post('/adimlogin', [
    body('email', "Enter the valid email").isEmail(),
    body('password', 'Enter the valid password').isLength({ min: 3 })
], adimLogin);

router.get('/getAdim', fetchUser, getAdim);

router.post('/updateAdim/:id', fetchUser, updateAdim);

router.delete('/deleteAdim/:id', fetchUser, async (req, res) => {
    let success = false
    const id = req.params.id;
    try {
        if (req.user.id !== config.AdimId) {
            return res.status(400).json({ success, error: "Invalid credential" })
        }
        const delete1 = await Adim.findByIdAndDelete(id);
        success = true;
        res.status(200).json({ success, delete1 })
    } catch (error) {
        console.log("Error occurred", error);
        res.status(500).json({ success, error: "Internal Server error" });
    }
})

router.post('/adminimage/:id', fetchUser, upload1.single("image"), addAdimImage)
router.post('/updateuser', fetchUser, updateUser)

module.exports = router