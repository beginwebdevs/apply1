const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const authMiddleware = require('../middlewares/auth-middleware');
const Users = require('../models/website/users.Model')


router.post('/sendotp', async (req, res) => {

    const {email} = req.body;
    if(!email){
        return res.status(400).json({message: "Email i required"})
    }

    const opt = crypto.randomInt(100000, 999999);

    const ttl = 1000 * 60 * 5;
    const expires = Date.now() + ttl;
    const hash = await crypto.createHmac('sha256', process.env.HASH_SECRETE).update(`${email}.${opt}.${expires}`).digest('hex');

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'subhash@beginwebstudio.com', // generated ethereal user
          pass: 'Shiva@1937', // generated ethereal password
        }
    })

    const mailRes = await transporter.sendMail({
        from: 'subhash@beginwebstudio.com',
        to: email,
        subject: 'OTP',
        text: `Your OTP for verifying mail on applyassist is ${opt}`
    })

    if(mailRes.accepted[0]){
        return res.json({status: true, hash: `${hash}.${expires}`, email})
    }

    console.log(mailRes)



    
    res.json({status: false})
})

router.post('/verify', authMiddleware, async (req, res) => {
    const {otp, hash, email} = req.body;

    if(!otp || !hash || !email){
        return res.json({status: false, message: 'Every field is required'});
    }

    let [hashedOtp, expires] = hash.split('.');

    if(Date.now() > +expires){
        return res.json({status: false, message:'OTP Expired'})
    }

    let computedHash = await crypto.createHmac('sha256', process.env.HASH_SECRETE).update(`${email}.${otp}.${expires}`).digest('hex');

    if(hashedOtp !== computedHash){
        return res.json({status: false, message: 'Wrong OTP'})
    }

    const {user} = req;

    let updUser = await Users.findOneAndUpdate({_id: user._id}, {$set: {email: email}}, {returnDocument: 'after'});

    

    res.json({status: true, updUser});

})


module.exports = router;