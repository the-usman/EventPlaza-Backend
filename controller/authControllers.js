const { body, validationResult } = require('express-validator')
const User = require('../modals/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config.json')
const fetchUser = require('../middleware/fetchUser')
const JWT_SECRET = config.JWT_SECRET;

const createUser = async (req, res) => {
    let success = false
    const error = validationResult(req)
    if (!error)
        return res.status(400).json({ success, error: error })
    const user = await User.findOne({ email: req.body.email })
    if (user)
        return res.status(400).send({ success, error: "User Already Exist" })
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)
    try {
        const user = await User.create(
            {
                name: req.body.name,
                email: req.body.email,
                password: secPass
            }
        )
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, token })
    } catch (error) {
        console.log("Error Ouccred", error)
        res.status(500).json({ success, error: "Internal Server error" })
    }
}

const Login = async (req, res) => {
    let success = false
    const error = validationResult(req)
    if (!error.isEmpty())
        return res.status(400).json({ success, error })
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user)
            return res.status(400).json({ success, error: "Invalid credentials" })
        const comparePass = await bcrypt.compare(req.body.password, user.password)
        if (!comparePass)
            return res.status(400).json({ success, error: "Invalid credentials" })
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, token })
    } catch (error) {
        console.log("Error Ouccred", error)
        res.status(500).json({ success, error: "Internal Server error" })
    }
}

const getUser = async (req, res) => {
    const userId = req.user.id;
    let success = false
    try {
        const user = await User.findById(userId).select('-password')
        success = true
        res.json({ success, user })
    } catch (error) {
        console.log("Error Ouccred", error)
        res.status(500).json({ success, error: "Internal Server error" })
    }
}

const AdimLogin = (req, res) => {
    let success = false
    const error = validationResult(req);
    if (!error.isEmpty())
        return res.status(400).json({success, error})
    try {
        const adimUserNameArray = config.AdimUserName;
        const adimPassArray = config.AdimPassword;
        let adim = false;
        let index = -1
        for (let i = 0; i < adimUserNameArray.length; i++) {
            const elementUsername = adimUserNameArray[i];
            const elementPass = adimPassArray[i];
            if (elementUsername === req.body.email && elementPass === req.body.password) {
                adim = true;
                index = i;
                break;
            }
        }
        const salt = bcrypt.genSalt(10);
        const secPass = bcrypt.hash(adimPassArray[index], salt) ;
        if (!adim)
            return res.status(400).json({success, error: "Invalid credentials"})
        const data = {
            adim:{
                username : adimUserNameArray[index],
                password : secPass
            }
        }
        success = true;
        const token = jwt.sign(data, JWT_SECRET)
        res.status(200).json({success, token})
    } catch (error) {
        console.log("Error Ouccred", error)
        res.status(500).json({ success, error: "Internal Server error" })
    }
}

module.exports = {
    getUser,
    Login,
    createUser,
    AdimLogin
}