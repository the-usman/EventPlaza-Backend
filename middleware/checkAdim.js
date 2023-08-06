const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config.json')
const JWT_SECRET = config.JWT_SECRET;
const adimUserNameArray = config.AdimUserName;
const adimPassArray = config.AdimPassword;

const checkAdim = (req, res, next) => {
    
    next();
}

