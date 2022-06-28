const express = require('express');
const bodyParser =require('body-parser');
const User = require('../models/user');
const passport = require('passport');
const authenticate = require('../authenticate');
const nodemailer = require('nodemailer');


var router = express.Router();
router.use(bodyParser.json());

router.post('/report', (req, res) =>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'example@gmail.com',
            pass: '12345'
        }
    });

    var mailOptions = {
        from: 'example@gmail.com',
        to: req.body.mail,
        subject: 'Report',
        text: req.body.message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.json({success: false, info: error});
        } else {
            
            res.json({success: true, status: 'Successful!'});
        }
    });   
})



module.exports = router;
