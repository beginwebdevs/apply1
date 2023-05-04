
const axios = require('axios');
const jwt = require('jsonwebtoken');
const Tokens = require('../models/Tokens');
const Users = require("../models/website/users.Model");

const accessTokenSecrete = 'b24cd70fa9134d5019250ccc9e43e223aea3974dab998c870cf42f4ddf3b14745cbaf3fe9c8a5a7eedf74c5dc48b84d641d07a90f09bb4a568c7f6e47a5f437b';
const refreshTokenSecrete = 'df67b54b8e77a814b5b3dea73f78a7a5bb216f744d5dc9e98b769e4718c5da641beff1c29863398afef1f740a1eb573916107a9a80bbc986703fc8375aa12582'


// -------------------- user sent otp -------------------- //
exports.sendOtp = async (req, res) => {
    const { mobile } = req.body;

    if(!mobile) {
        res.status(400).json({success: false, message: "Mobile are required"})
    }

    axios.get(`https://2factor.in/API/V1/426b85b5-e8b6-11ed-addf-0200cd936042/SMS/+91${mobile}/AUTOGEN`)
        .then((success) => {
            if (success.status == 200) {
                return res.json({
                    status: true,
                    message: `OTP Sent On ${mobile}`,
                })
            }
        })
        .catch((error) => {
            
            return res.json({
                status: false,
                message: `error while sending otp`,
            })
        })
}

// -------------------- user verifyOtp/refilter -------------------- //
exports.verifyOtp = async (req, res) => {
    const { mobile, otp } = req.body

    if(!otp){
        return res.status(400).json({status: false, message: "OTP Required"});
    }

    const isValidOtp = await axios.get(`https://2factor.in/API/V1/426b85b5-e8b6-11ed-addf-0200cd936042/SMS/VERIFY3/+91${mobile}/${otp}`)

    

    if (isValidOtp.data.Status == 'Success') {

        let user = await Users.findOne({ mobile_number: mobile })

        if (!user) {
            user = await new Users({
                mobile_number: mobile,
            }).save()
        }
        
        const accessToken = await jwt.sign({_id: user._id, mobile: user.mobile}, accessTokenSecrete, {expiresIn: '1h'})
        const refreshToken = await jwt.sign({_id: user._id,  mobile: user.mobile}, refreshTokenSecrete, {expiresIn: '7d'})

       

        const token = await Tokens.create({
            user_id: user._id,
            token: refreshToken
        })

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })

        res.json({status: true, user, message: "Logged in."})


    } else {
        return res.json({
            status: false,
            message: `Please Enter Correct OTP`,
            data: []
        })

    }


}


exports.refresh = async (req, res) => {

   

    const {refreshToken: refreshTokenFromCookie} = req.cookies;
    let userData


    try {
        userData = await jwt.verify(refreshTokenFromCookie, refreshTokenSecrete)
    } catch (error) {
        return res.status(401).json({message: "Invalid Token"});
    }

    let token;

    try {
        token = await Tokens.findOne({token: refreshTokenFromCookie, user_id: userData._id})
        if(!token.token){
            return res.status(500).json({message: "Invalid this"});
        }
    } catch (error) {
        return res.status(500).json({message: "Invalid Token 1"});
    }

    console.log(token)


    const user = await Users.findOne({_id: token.user_id}).populate('');

    if(!user){
        return res.status(500).json({message: "user not found"});
    }



    const accessToken = await jwt.sign({_id: user._id}, accessTokenSecrete, {expiresIn: '1h'})
    const refreshToken = await jwt.sign({_id: user._id}, refreshTokenSecrete, {expiresIn: '7d'})

    try {
        await Tokens.updateOne({user_id: user._id}, {token: refreshToken});
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }

    res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true
    })
    res.cookie('accessToken', accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true
    })

    res.json({status: true, user, message: "Logged in."})


}