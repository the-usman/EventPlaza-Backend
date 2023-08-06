const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config.json')
const JWT_SECRET = config.JWT_SECRET;
const adimUserNameArray = config.AdimUserName;
const adimPassArray = config.AdimPassword;

const checkAdim = (req, res, next) => {
    let success = false;
    const token = req.header('token');
    if (!token)
        return res.status(400).json({ success, error: "login with valid credential" });
    try {
        const data = jwt.verify(token, JWT_SECRET)
        const compare = bcrypt.compare(data.adim.password, req.password)
        if (!compare)
            return res.status(400).json({ success, error: "login with valid credential" });
        req.adim = data.adim
    } catch (error) {
        console.log("Error Ouccred", error)
        res.status(500).json({ success, error: "Internal Server error" })
    }
    next();
}