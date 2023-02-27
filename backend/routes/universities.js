const express = require('express');
const router = express.Router()
const Universities = require('../models/Universities');


router.get('/alluniversities', async (req, res) => {
    let alluniv = await Universities.find();
    res.json(alluniv);
})


router.get('/filterunivercity', async (req, res) => {
    let data = {}   
    let page = req.query.page;
    if(req.query.university_name) {
        data.university_name = req.query.university_name;
    }
    if(req.query.university_location) {
        data.university_location = req.query.university_location;
    }
    if(req.query.id) {
        data._id = req.query.id;
    }
    
    let requireddata = await Universities.find(data).limit(6).skip(page * 6);
    let totalFRecords = await Universities.find(data).count()
    let totalFPage = Math.ceil(totalFRecords / 6);
    res.json({requireddata, totalFRecords, totalFPage});
})


router.post('/adduniversity', async (req, res) => {
   
        let univadd = await Universities.create({
            university_name: req.body.university_name,
            univercity_address: req.body.univercity_address,
            univercity_logo: req.body.univercity_logo,
            university_location: req.body.university_location,
            about_university: req.body.about_university,
            university_type: req.body.university_type,
            campus_accommodation: req.body.campus_accommodation,
            intake_months: req.body.intake_months,
            total_students: req.body.total_students,
            ielts_requirements: req.body.ielts_requirements,
            toefl_requirements: req.body.toefl_requirements,
            pte_requirements: req.body.pte_requirements,
            university_website: req.body.university_website,
        });
        success = true;
        message = "University added";
        res.json({ success, message, univadd });
    }
)




module.exports = router