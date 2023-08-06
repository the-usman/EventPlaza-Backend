const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const config = require('../config.json')
const fetchUser = require('../middleware/fetchUser')
const { getUser, createUser, Login, createAdim, adimLogin, getAdim, updateAdim } = require('../controller/authControllers')
const Adim = require('../modals/Adim')


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

router.delete('/deleteAdim/:id', fetchUser, async (req, res)=>{
    let success = false
    const id = req.params.id;
    try{
        if(req.user.id !== config.AdimId){
            return res.status(400).json({success, error:"Invalid credential"})
        }
        const delete1 = await Adim.findByIdAndDelete(id);
        success = true;
        res.status(200).json({success, msg:"Adim Deleted Successfully"})
    } catch(error)
    {
        console.log("Error occurred", error);
        res.status(500).json({ success, error: "Internal Server error" });
    }
})

module.exports = router