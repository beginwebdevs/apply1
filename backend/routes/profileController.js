const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

const PersonalDetailes = require('../models/website/personalDetailModel');
const EmployementsDetailes = require('../models/website/employementDetailModel');
const EducationDetailes = require('../models/website/educationDetailModel');
const EnglishDetailes = require('../models/website/englishTestModel');
const AddmissionTests = require('../models/website/addmissionTestModel');
const PreferenceStudy = require('../models/website/preferenceStudyModel');
const Users = require('../models/website/users.Model')
const StanderdTests = require('../models/website/standerdTestModel');
const Application = require('../models/website/applicationsModel');
const fs = require('fs');
const path = require('path')

router.post('/savepersonaldetail', authMiddleware,  async (req, res) => {
    
    const {user} = req;
    
    

   

    let personalDetail = await PersonalDetailes.findOneAndUpdate({user_id: user._id}, {$set: {
        ...req.body,
        user_id: user._id
    }}, {returnDocument: 'after', upsert: true})

    let updUser = await Users.findOneAndUpdate({_id: user._id}, {$set: {profile_status: 20, personal_detail: personalDetail._id}}, {returnDocument: 'after',upsert: false})

    if(req.body.application_id){
        let updApp = await Application.findOneAndUpdate({_id: req.body.application_id}, { personal_info: personalDetail._id })
    }


    res.json({personalDetail, updUser});

})

router.get('/getpersonaldetail', authMiddleware, async (req, res) => {
    let personalDetail = await PersonalDetailes.findOne({user_id: req.user._id}, {user_id: 0, _id: 0, __v: 0});
    res.json({personalDetail})
})

router.post('/saveemployementsdetail', authMiddleware, async (req, res) => {
    
    const { user } = req;

    const empData = await EmployementsDetailes.findOneAndUpdate({user_id: user._id}, {$set: {
        ...req.body,
        user_id: user._id
    }}, {upsert : true, returnDocument: 'after'});

    if(req.body.application_id){
        let updApp = await Application.findOneAndUpdate({_id: req.body.application_id}, { employement: empData._id })
    }

  

    res.json({empData})
})

router.get('/getemployementsdetail', authMiddleware, async (req, res) => {
    const employData = await EmployementsDetailes.findOne({user_id: req.user._id});
    res.json({employData});
})

router.post('/saveeducationdetail', authMiddleware, async (req, res) => {
    const { user } = req;

    const {certificate} = req.body;
    const educationData = req.body

    if(certificate != null){
        const buffer = Buffer.from(certificate.replace(/^data:image\/(png|jpg|jpeg|pdf);base64/, ''), 'base64');
        const fileExt = certificate.split(';')[0].split('/')[1];
        const certPath = `/uploads/certificate/education/${Date.now()}-${user._id}.${fileExt}`;

        fs.writeFile(path.resolve(__dirname, `..${certPath}`), buffer, {encoding: 'base64'}, (err, r) => {
            console.log('...')
        })

        educationData.certificate = certPath;
       // return console.log(buffer,certPath)
    }

    let educationDetail = await EducationDetailes.findOneAndUpdate({user_id: user._id}, {
        ...educationData,
        user_id: user._id
    }, {returnDocument: 'after', upsert: true})

    let updUser = await Users.findOneAndUpdate({_id: user._id}, {$set: {profile_status: 60}}, {returnDocument: 'after' ,upsert: false})
    if(req.body.application_id){
        let updApp = await Application.findOneAndUpdate({_id: req.body.application_id}, { edu_info: educationDetail._id })
    }
   
    res.json({educationDetail, updUser})
})

router.get('/geteducationdetail', authMiddleware, async (req, res) => {
    const { user } = req;

    if(user){
        let educationData = await EducationDetailes.find({user_id: user._id})
        res.json({educationData})
    }
})

router.post('/saveenglishtest', authMiddleware, async (req, res) => {

    const { user } = req;

    let englishTest = await EnglishDetailes.findOneAndUpdate({user_id: user._id}, {
        ...req.body,
        user_id: user._id
    }, {returnDocument: 'after', upsert: true})

    let updUser = await Users.findOneAndUpdate({_id: user._id}, {$set: {profile_status: 80}}, {returnDocument: 'after' ,upsert: false})
    if(req.body.application_id){
        let updApp = await Application.findOneAndUpdate({_id: req.body.application_id}, { english_test: englishTest._id })
    }

    res.json({englishTest, updUser})
})

router.get('/getenglishtest', authMiddleware, async (req, res) => {


    const englishTest = await EnglishDetailes.find({user_id: req.user._id});
    res.json(englishTest)
    
   
})

router.post('/saveaddmissiontest', authMiddleware, async (req, res) => {

    const { user } = req;

    if(user){
        let addmissionData = await AddmissionTests.create({
            ...req.body,
            user_id: user._id
        })
        res.json({addmissionData})
    }
})

router.get('/getaddmissiontest', authMiddleware, async (req, res) => {

    const { user } = req;

    if(user){
        let addmissionData = await AddmissionTests.find({user_id: user._id})
        res.json({addmissionData})
    }
})

router.post('/savestudypreference', authMiddleware, async (req, res) => {
    const { user } = req;

    const studyPreference = await PreferenceStudy.findOneAndUpdate({user_id: user._id}, {
        ...req.body,
        user: user._id
    }, {returnDocument: 'after', upsert: true})

    let updUser = await Users.findOneAndUpdate({_id: user._id}, {$set: {profile_status: 40}}, {returnDocument: 'after' ,upsert: false})
    if(req.body.application_id){
        let updApp = await Application.findOneAndUpdate({_id: req.body.application_id}, { study_preference: studyPreference._id })
    }

    res.json({studyPreference, updUser})

    
})

router.get('/getstudypreference', authMiddleware, async (req, res) => {
    const { user } = req;
    const studyPreference = await PreferenceStudy.findOne({user_id: user._id}, {user_id: 0, _id: 0, __v: 0});
    res.json({studyPreference})
})

router.post('/savestandertest', authMiddleware, async (req, res) => {
    const {user} = req;

    const {certificate} = req.body;
    const educationData = req.body

    if(certificate != null){
        const buffer = Buffer.from(certificate.replace(/^data:image\/(png|jpg|jpeg|pdf);base64/, ''), 'base64');
        const fileExt = certificate.split(';')[0].split('/')[1];
        const certPath = `/uploads/certificate/standerd_test/${Date.now()}-${user._id}.${fileExt}`;

        fs.writeFile(path.resolve(__dirname, `..${certPath}`), buffer, {encoding: 'base64'}, (err, r) => {
            console.log('...')
        })

        educationData.certificate = certPath;
       // return console.log(buffer,certPath)
    }


    const standerTest = await StanderdTests.findOneAndUpdate({user_id: user._id}, {
        ...educationData,
        user_id: user._id
    }, {returnDocument: 'after', upsert: true})

    let updUser = await Users.findOneAndUpdate({_id: user._id}, {$set: {profile_status: 100}}, {returnDocument: 'after' ,upsert: false})
    if(req.body.application_id){
        let updApp = await Application.findOneAndUpdate({_id: req.body.application_id}, { standerd_test: standerTest._id })
    }

    res.json({standerTest, updUser})
})

router.get('/getstandertest', authMiddleware, async (req, res) => {
    const standerTest = await StanderdTests.findOne({user_id: req.user._id});
    res.json({standerTest})
})

module.exports = router;