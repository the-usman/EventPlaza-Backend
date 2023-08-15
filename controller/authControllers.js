const { body, validationResult } = require('express-validator')
const User = require('../modals/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config.json')
const Adim = require('../modals/Adim')
const JWT_SECRET = config.JWT_SECRET;



const createUser = async (req, res) => {
    let success = false
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ success, error: error.array() })
    }

    const user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json({ success, error: "User Already Exist" })
    }

    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password.toString(), salt)

    try {
        const newUser = await User.create({
            name: req.body.name.toString(),
            email: req.body.email.toString(),
            password: secPass
        })
        const data = {
            user: {
                id: newUser.id
            }
        }

        const token = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, token })
    } catch (error) {
        console.log("Error Occurred", error)
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
        const comparePass = await bcrypt.compare(req.body.password.toString(), user.password)
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
        const user1 = await User.findById(req.user.id)
        if (!user1) {
            const adim = await Adim.findById(userId).select('-password')
            if (adim) {
                return res.status(200).json({ success: true, user: adim })
            }
            return res.status(400).json({ success: false, error: 'Not Found' })
        }
        const user = await User.findById(userId).select('-password')

        success = true
        res.json({ success, user })
    } catch (error) {
        console.log("Error Ouccred", error)
        res.status(500).json({ success, error: "Internal Server error" })
    }
}


const createAdim = async (req, res) => {
    let success = false
    const error = validationResult(req);
    if (!error.isEmpty())
        return res.status(400).json({ success, error })
    const userId = req.user.id
    if (userId !== config.AdimId)
        return res.status(400).json({ success, error: "Invalid credentials" })
    try {
        const adim = await Adim.findOne({ email: req.body.email })
        if (adim)
            return res.status(400).json({ success, error: "Adim already exist" })
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password.toString(), salt)
        const newUser = await Adim.create({
            email: req.body.email.toString(),
            name: req.body.name.toString(),
            password: secPass
        })
        success = true
        res.status(200).json({ success, user: newUser })
    } catch (error) {
        console.log("Error Ouccred", error)
        res.status(500).json({ success, error: "Internal Server error" })
    }
}

const adimLogin = async (req, res) => {
    let success = false
    const error = validationResult(req)
    if (!error.isEmpty())
        return res.status(400).json({ success, error })
    try {
        const user = await Adim.findOne({ email: req.body.email })
        if (!user)
            return res.status(400).json({ success, error: "Invalid credentials" })
        const comparePass = await bcrypt.compare(req.body.password.toString(), user.password)
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

const getAdim = async (req, res) => {
    let success = false;
    if (req.user.id !== config.AdimId) {
        return res.status(401).json({ success, error: "Invalid credentials" });
    }
    try {
        const allAdims = await Adim.find().skip(1);
        res.json({ success: true, adims: allAdims });

    } catch (error) {
        console.log("Error occurred", error);
        res.status(500).json({ success, error: "Internal Server error" });
    }
}

const updateAdim = async (req, res) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    let success = false;
    try {
        if (req.user.id !== config.AdimId) {
            return res.status(401).json({ success, error: "Invalid credentials" });
        }
        const updatedAdim = {};
        const adim = await Adim.findById(id);
        if (!adim)
            return res.status(404).json({ success, error: "Not Found" });

        if (name) { updatedAdim.name = name; }
        if (email) { updatedAdim.email = email; }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt)
            updatedAdim.password = secPass;
        }
        const updated = await Adim.findByIdAndUpdate(id, { $set: updatedAdim }, { new: true });

        success = true;
        res.status(200).json({ success, updated });
    } catch (error) {
        console.log("Error occurred", error);
        res.status(500).json({ success, error: "Internal Server error" });
    }
}

const addAdimImage = async (req, res) => {
    let success = false;
    try {
        if (req.user.id !== config.AdimId)
            return res.status(400).json({ success, error: "Invalid credentials" })
        if (req.user.id !== config.AdimId) {
            return res.status(401).json({ success, error: "Invalid credentials" });
        }
        const data = {
            image: req.file.filename
        }
        const adim = await Adim.findByIdAndUpdate(req.params.id, { $set: data }, { new: true });
        success = true;
        res.status(200).json({ success, adim })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success, error: "internal server error" })
    }
}

const updateUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const user = await User.findById(req.user.id);
        const admin = !user ? await Adim.findById(req.user.id) : null;

        if (!user && !admin) {
            return res.status(400).json({ success: false, error: "No User Found" });
        }

        const data = {};
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);
            data.password = secPass;
        }
        if (name) {
            data.name = name;
        }
        if (email) {
            const checkMail = await User.findOne({ email: email });
            if (checkMail) {
                return res.status(401).json({ success: false, error: "This email is already occupied" });
            }
            data.email = email;
        }

        const updated = !user
            ? await Adim.findByIdAndUpdate(req.user.id, { $set: data }, { new: true })
            : await User.findByIdAndUpdate(req.user.id, { $set: data }, { new: true });

        return res.status(200).json({ success: true, updated });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = {
    getUser,
    Login,
    createUser,
    createAdim,
    adimLogin,
    getAdim,
    updateAdim,
    addAdimImage,
    updateUser
}