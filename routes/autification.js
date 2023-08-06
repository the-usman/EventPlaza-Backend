const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const config = require('../config.json')
const fetchUser = require('../middleware/fetchUser')
const {getUser, createUser, Login, AdimLogin} = require('../controller/authControllers')


const JWT_SECRET = config.JWT_SECRET

router.post('/createuser', [
    body('name', "Enter the valid name").isLength({ min: 3 }),
    body('email', 'Enter the valid email').isEmail(),
    body('password', 'enter the valid password').isLength({ min: 3 })
], createUser)

router.post('/login', [
    body('email', "Enter the valid email").isEmail(),
    body('password', 'Enter the valid password').isLength({ min: 3 })
], Login)

router.get('/getuser', fetchUser, getUser )

router.post('/adimlogin', [
    body('email' , 'Enter the valid email').isEmail(),
    body('password', "Enter the valid password").exists()
], AdimLogin )

module.exports = router