const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const User = require('../modals/User');
const nodemailer = require('nodemailer');
const Contact = require('../modals/Contact');
const config = require('../config.json')
const Adim = require('../modals/Adim')

router.post('/', fetchUser, async (req, res) => {
    let success = false
    const userId = req.user.id;
    try {
        let user = await User.findById(req.user.id)
        if (!user) {
            user = await Adim.findById(req.user.id)
            if (!user)
                return res.status(400).json({ success, error: "Please login or signup please" })
        }
        const email = user.email;
        const server = email.split('@')[1]
        const transporter = nodemailer.createTransport({
            host: 'smtp.' + server,
            port: 465, 
            secure : true,
            auth: {
                user: config.email ,
                pass: config.paasword
            }
        });
        const mailOptions = {
            from: config.email,
            to: email,
            subject: "Thanks for contacting us!",
            text: "Thanks for contacting us!"
        };
        const adimSended = {
            from: config.email,
            to: config.email,
            subject: "A User Try to contact us",
            text: "Message is " + req.body.message
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(400).json({success, error: "Invalid email" });
            } else {
                console.log('Email sent: ' + info.response);
                return res.json({success, contact });
            }
        });
        transporter.sendMail(adimSended, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).json({ error: "Failed to send email" });
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        
        const contact = await Contact.create({
            name: req.body.name,
            message: req.body.message
        });
        return res.status(200).json({success : true , message: "Thanks for your feed back"})
    } catch (error) {
        console.log("Error Occurred", error);
        res.status(500).json({success, error: "Internal Server error" });
    }
});

module.exports = router;
