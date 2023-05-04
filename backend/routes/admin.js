const express = require('express');
const router = express.Router()
const Admins = require('../models/website/adminModel');
const jwt = require('jsonwebtoken')
const Tokens = require('../models/Tokens');
const bcryptjs = require('bcryptjs')
const fs = require('fs')
const path = require('path')

const Users = require('../models/website/users.Model')

const PersonalDetailes = require('../models/website/personalDetailModel');
const EmployementsDetailes = require('../models/website/employementDetailModel');
const EducationDetailes = require('../models/website/educationDetailModel');
const EnglishDetailes = require('../models/website/englishTestModel');
const AddmissionTests = require('../models/website/addmissionTestModel');
const PreferenceStudy = require('../models/website/preferenceStudyModel');
const StanderdTests = require('../models/website/standerdTestModel');
const Applications = require('../models/website/applicationsModel');
const savedModel = require("../models/website/savedModel");

const accessTokenSecrete = 'b24cd70fa9134d5019250ccc9e43e223aea3974dab998c870cf42f4ddf3b14745cbaf3fe9c8a5a7eedf74c5dc48b84d641d07a90f09bb4a568c7f6e47a5f437b';
const refreshTokenSecrete = 'df67b54b8e77a814b5b3dea73f78a7a5bb216f744d5dc9e98b769e4718c5da641beff1c29863398afef1f740a1eb573916107a9a80bbc986703fc8375aa12582';

router.post('/create', async (req, res) => {

    const admin = await Admins.findOne({email: req.body.email});
        if(admin){
            return res.status(400).json({message: 'Email already in use'})
        }
       
        const salt = await bcryptjs.genSalt(10);
        const hashP = await bcryptjs.hash(req.body.password, salt)
        console.log(hashP)
        const data = {...req.body, password: hashP}
        const newAdmin = await Admins.create(data)
        res.json(newAdmin)


})

router.post('/login', async (req, res) => {

    const {email, password, remember} = req.body;

        if(!email) return res.status(400).json({message: "Email is required"});
        if(!password) return res.status(400).json({message: "Password is required"});

        let admin = await Admins.findOne({email});

        if(!admin) return res.status(400).json({message: "Email does not exist"});

        const match = await bcryptjs.compare(password, admin.password);

        if(!match) return res.status(400).json({message: "Wrong Password"});

        if(remember){
            const accessToken = await jwt.sign({_id: admin._id, email: admin.email}, accessTokenSecrete, {expiresIn: '1 days'});
            const refreshToken = await jwt.sign({_id: admin._id, email: admin.email}, refreshTokenSecrete, {expiresIn: '360 days'});

            const token = await Tokens.findOneAndUpdate({user_email: email},{
                token: refreshToken,
                user_id: admin._id,
                user_email: admin.email
            }, {returnDocument: 'after', upsert: true});

            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })
            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })

            return res.json({status: true, admin, message: "Logged in."})
        }
        if(!remember){
            const accessToken = await jwt.sign({_id: admin._id, email: admin.email}, accessTokenSecrete, {expiresIn: '1 days'});
            const refreshToken = await jwt.sign({_id: admin._id, email: admin.email}, refreshTokenSecrete, {expiresIn: '1 days'});

            const token = await Tokens.findOneAndUpdate({user_email: email}, {
                token: refreshToken,
                user_id: admin._id,
                user_email: email
            }, {returnDocument: 'after', upsert: true});

            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true
            })
            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true
            })

            return res.json({status: true, admin, message: "Logged in."})
        }


})

router.post('/auto', async (req, res) => {
    const {accessToken, refreshToken: refreshTokenFromCookie} = req.cookies;
    if(accessToken){
        let adminData;
        try {

            adminData = jwt.verify(accessToken, accessTokenSecrete)
            
        } catch (error) {
            console.log(error)
            return res.status(400).json({message: "Token Expired"});
        }
    
    if(adminData){
        let admin = await Admins.findOne({_id: adminData._id});
        return res.json({status: true, admin, message: "Logged in."})
    }
    }

    if(refreshTokenFromCookie){
        const adminData = jwt.verify(refreshTokenFromCookie, refreshTokenSecrete);
        if(adminData){

        const accessToken = await jwt.sign({_id: admin._id, email: admin.email}, accessTokenSecrete, {expiresIn: '1 days'});
        const refreshToken = await jwt.sign({_id: admin._id, email: admin.email}, refreshTokenSecrete, {expiresIn: '360 days'});

        const token = await Tokens.findOneAndUpdate({user_email: email},{
            token: refreshToken,
            user_id: admin._id,
            user_email: admin.email
        }, {returnDocument: 'after', upsert: true});

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })

        return res.json({status: true, admin, message: "Logged in."})

        }
    }

    res.json({auth: false})
})


router.post('/adduser', async (req, res) => {

   

    const userdata = await Users.findOneAndUpdate({mobile_number: req.body.personalInfo.mobile_number}, {$set: {...req.body.personalInfo}}, {upsert: true, returnDocument: 'after'})

    let eduCert = null
    let stenCert = null

    if(req.body.educationInfo[0].certificate){
        
        const certificatee = req.body.educationInfo[0].certificate;
        const buffere = Buffer.from(certificatee.replace(/^data:image\/(png|jpg|jpeg|pdf);base64/, ''), 'base64');
        const fileExte = certificatee.split(';')[0].split('/')[1];
        const certPathe = `/uploads/certificate/education/${Date.now()}-${userdata._id}.${fileExte}`;

        fs.writeFile(path.resolve(__dirname, `..${certPathe}`), buffere, {encoding: 'base64'}, (err, r) => {
            console.log('...')
        })

        eduCert = certPathe;
       return console.log(eduCert)
    }

    if(req.body.stenderedInfo.certificate){
        const certificate = req.body.stenderedInfo.certificate
        const buffer = Buffer.from(certificate.replace(/^data:image\/(png|jpg|jpeg|pdf);base64/, ''), 'base64');
        const fileExt = certificate.split(';')[0].split('/')[1];
        const certPath = `/uploads/certificate/standerd_test/${Date.now()}-${userdata._id}.${fileExt}`;

        fs.writeFile(path.resolve(__dirname, `..${certPath}`), buffer, {encoding: 'base64'}, (err, r) => {
            console.log('...')
        })

        stenCert = certPath;
       // return console.log(buffer,certPath)
    }
    
    
    const personaldata = await PersonalDetailes.findOneAndUpdate({user_id: userdata._id}, {$set: {...req.body.personalInfo, user_id: userdata._id}}, {upsert: true, returnDocument: 'after'})
    const englistdata = await EnglishDetailes.findOneAndUpdate({user_id: userdata._id}, {$set: {...req.body.englisgInfo[0], user_id: userdata._id}}, {upsert: true, returnDocument: 'after'});
    const educationdata = await EducationDetailes.findOneAndUpdate({user_id: userdata._id}, {$set: {...req.body.educationInfo[0], user_id: userdata._id, certificate: eduCert}}, {upsert: true, returnDocument: 'after'})
    const preferencedata = await PreferenceStudy.findOneAndUpdate({user_id: userdata._id}, {$set: {...req.body.preferenceInfo, user_id: userdata._id}}, {upsert: true, returnDocument: 'after'});
    const standerdata = await StanderdTests.findOneAndUpdate({user_id: userdata._id}, {$set: {...req.body.stenderedInfo, user_id: userdata._id, certificate: stenCert}}, {upsert: true, returnDocument: 'after'})
    const upd = await Users.findOneAndUpdate({_id: userdata.id}, {$set: {personal_detail: personaldata._id, profile_status: 100}})


    res.json({userdata, personaldata, englistdata, educationdata, preferencedata, standerdata})
})

router.post('/updatepriority', async (req, res) => {
    const upd = await Users.findOneAndUpdate({_id: req.body.user_id}, {$set: {priority: req.body.Priority}}, {returnDocument: 'after'})
    res.json(upd)
})

router.post('/updateuser', async (req, res) => {
    const upd = await Users.findOneAndUpdate({_id: req.query.user_id}, {$set : {...req.body}})
    res.json(upd)
})

router.get('/apicationbyuser', async (req, res) => {

    const applications = await Applications.find({user: req.query.user_id}).populate({path: 'course', populate: {path: 'aa_institute'}}).populate('personal_info').populate('edu_info').populate('english_test').populate('study_preference').populate('standerd_test').populate('employement')
    if(applications){
        res.json(applications)
    }else{
        res.json([])
    }
})

router.get('/userdetails', async (req, res) => {
    const education = await EducationDetailes.find({user_id: req.query._id},{_id:0});
    const english = await EnglishDetailes.find({user_id: req.query._id},{_id:0})
    const employement = await EmployementsDetailes.find({user_id: req.query._id},{_id:0});
    const standered = await StanderdTests.find({user_id: req.query._id},{_id:0});
    const preference = await PreferenceStudy.find({user_id: req.query._id},{_id:0});
    const saved = await savedModel.find({user_id: req.query._id},{_id:0});
    const application = await Applications.find({user: req.query._id},{_id:0})
    
    res.json({education, english, employement, standered, preference, saved, application})
})

router.post('/updateuserall', async (req, res) => {
    const updPersonal = await PersonalDetailes.findOneAndUpdate({user_id: req.body.user_id}, req.body.personalInfo);
    const updEnglish = await EnglishDetailes.findOneAndUpdate({user_id: req.body.user_id}, req.body.educationInfo[0]);
    const updEducation = await EducationDetailes.findOneAndUpdate({user_id: req.body.user_id}, req.body.educationInfo[0]);
    const updPref = await PreferenceStudy.findOneAndUpdate({user_id: req.body.user_id}, req.body.preferenceInfo);
    const updStander = await StanderdTests.findOneAndUpdate({user_id: req.body.user_id}, req.body.stenderedInfo)
    //console.log(req.body)
    res.json({success: true})
})

router.get('/deleteuser', async (req, res) => {
    const use = await Users.deleteOne({_id: req.query.user_id});
    const per = await PersonalDetailes.deleteMany({user_id: req.query.user_id});
    const edu = await EducationDetailes.deleteMany({user_id: req.query.user_id});
    const eng = await EnglishDetailes.deleteMany({user_id: req.body.user_id});
    const sta = await StanderdTests.deleteMany({user_id: req.query.user_id});
    const emp = await EmployementsDetailes.deleteMany({user_id: req.query.user_id});
    const sav = await savedModel.deleteMany({user_id: req.query.user_id});
    const appl = await Applications.deleteMany({user: req.query.user_id})

    let usersdata = await Users.find().populate('personal_detail');
    res.json(usersdata);
})

module.exports = router