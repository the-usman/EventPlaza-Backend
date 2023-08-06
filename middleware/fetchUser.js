const jwt = require('jsonwebtoken')
const config = require('../config.json')
const JWT_SECRET = config.JWT_SECRET

const fetchUser = (req, res, next) => {
    const token = req.header('token');
    let success = false; 
    if (!token)
        return res.status(400).json({ success, error: "Please auhticate with the coorect token" })
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
    } catch (error) {
        console.log("Error Ouccred", error)
        res.status(500).json({ success, error: "Internal Server error" })
    }
    next();
}

module.exports = fetchUser