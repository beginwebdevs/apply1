const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const Application = require('../models/website/applicationsModel');
const PersonalDetailes = require('../models/website/personalDetailModel');
const PreferenceStudy = require('../models/website/preferenceStudyModel');
const EducationDetailes = require('../models/website/educationDetailModel');
const EnglishDetailes = require('../models/website/englishTestModel');
const StanderdTests = require('../models/website/standerdTestModel');
const EmployementsDetailes = require('../models/website/employementDetailModel');
const Users = require('../models/website/users.Model')


router.post('/create', authMiddleware, async (req, res) => {
    const { user } = req;
    if(!user) return res.end();
    const {course} = req.body;
    if(!course) return res.end();


    const existedApplication = await Application.findOne({course: course, user: user._id})

    if(existedApplication){
        return res.json({err: true, message: 'Application already created for this course'})
    }

    //row data
    let applicationData = {course, user:user._id}


    //validating data with pesonal detail
    const perData = await PersonalDetailes.findOne({user_id: user._id});
    if(perData){
        applicationData.personal_info = perData._id
    }

    //validating data with study preferences
    const studyPre = await PreferenceStudy.findOne({user_id: user._id});
    if(studyPre){
        applicationData.study_preference = studyPre._id
    }


    //validating data with education detail
    const eduData = await EducationDetailes.find({user_id: user._id});
    console.log(eduData)
    let edu_id = []
    if(eduData){
        eduData.forEach((ed) => {
            edu_id.push(ed._id)
        })
        applicationData.edu_info = edu_id
    }



    //validating data with english test
    const engData = await EnglishDetailes.find({user_id: user._id})
    let eng_id = []
    if(engData){
        engData.forEach((en) => {
            eng_id.push(en._id)
        })
        applicationData.english_test = eng_id
    }


    //validating data with standerd test
    const sttData = await StanderdTests.findOne({user_id: user._id});
    if(sttData){
        applicationData.standerd_test = sttData._id
    }


    //validating data with employement

    const empData = await EmployementsDetailes.findOne({user_id: user._id});
    if(empData){
        applicationData.employement = empData._id
    }

   


    const application = await Application.create({
        ...applicationData,
        status: 'Pending'
    })

    const upduser = await Users.findOneAndUpdate({_id: user._id}, {$set: {stage: 'Applicant'}})



    res.json({sucess: true, application, message: 'application created got application page for next step'})

    
    
})

router.get('/get', authMiddleware, async (req, res) => {
    if(!req.user) return res.end()
    const {id} = req.query
    let applications;
    if(id){
        applications = await Application.findOne({user: req.user._id, _id:id}).populate({path: 'course', populate: {path: 'aa_institute'}}).populate('personal_info').populate('edu_info').populate('english_test').populate('study_preference').populate('standerd_test').populate('employement');
    }else{
        applications = await Application.find({user: req.user._id}).populate({path: 'course', populate: {path: 'aa_institute'}});
    }
    
    res.json(applications)
})

router.get('/all', async (req, res) => {
    const applications = await Application.find().populate({path: 'course', populate: {path: 'aa_institute'}}).populate('personal_info');
    res.json(applications)
})

router.post('/updatestatus', async (req, res) => {
    const updatedApplication = await Application.findOneAndUpdate({_id: req.body.id}, {$set: {status: req.body.status}}, {returnDocument:'after'});
    res.json({updatedApplication, success: true})
})

router.post('/submit', authMiddleware, async (req, res) => {
    const user = req.user;

    const updatedApplication = await Application.findOneAndUpdate({_id: req.body.id}, {status: 'Submitted'}, {returnDocument: 'after'});
    res.json(updatedApplication)
})

module.exports = router;