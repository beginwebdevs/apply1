
const express = require('express');
const router = express.Router();
const FieldOfStudies = require('../models/FieldOfStudy');
const AreaOfStudies = require('../models/AreaOfStudy');
const CourseTypes = require('../models/CourseType');


router.post('/createfiedldofstudy', (req, res) => {
    const {title, child} = req.body;
    if(!title){
        return res.status(400).json({message: "Title is required"});
    }

    const field = FieldOfStudies.create({
        title, child
    })

    res.json({success: true, field});
})
router.get('/fiedldofstudy', async (req, res) => {
    let field = await FieldOfStudies.find();
    res.json(field);
})


router.post('/createarealdofstudy', (req, res) => {
    const {title, child} = req.body;
    if(!title){
        return res.status(400).json({message: "Title is required"});
    }

    const field = AreaOfStudies.create({
        title, child
    })

    res.json({success: true, field});
})

router.get('/areaofstudy', async (req, res) => {
    let field = await AreaOfStudies.findOne({title: req.query.title});
    res.json(field);
})

router.post('/createcoursetype', async (req, res) => {

    const field = await CourseTypes.create({
        title: req.body.title
    })
    res.json(field);
})
router.get('/coursetype', async (req, res) => {
    let field = await CourseTypes.find();
    res.json(field)
})



module.exports = router;