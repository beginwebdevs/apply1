const savedModel = require("../models/website/savedModel")
const mongoose = require('mongoose');

exports.saved_course = async (req, res) => {

    //console.log(req.user);

    const savedCourse = await savedModel.findOne({course: req.body.course_id});

    if(savedCourse){
        const d = await savedModel.findOneAndDelete({course: req.body.course_id})
        return res.json({
            status: true,
            message: "Course remover Successfully ....!"
        })
    }


    new savedModel({
        user_id: req.user._id,
        course: req.body.course_id,

    }).save()
        .then(data => {
            return res.json({
                status: true,
                message: "Course Saved Successfully ....!",
                data: data
            })
        }).catch(err => {
            return res.json({
                status: false,
                message: `Somethings went wrong..!`,
                data: err
            })
        })



}


exports.list_saved_course = async (req, res) => {


    const {page} = req.query;

    const savedCourse = await savedModel.find({user_id: req.user._id}).limit(6).skip(page * 6).populate({path: 'course', populate: {path: 'aa_institute'}});
    const total = await savedModel.find({user_id: req.user._id})
    res.json({savedCourse, totalPage: total.length / 6, total: total.length});

  
   
}

exports.delete_saved_course = async (req, res) => {

    savedModel.findOneAndUpdate({ course_id: mongoose.Types.ObjectId(req.params.id) }, {
        status: false
    }).then(data => {
        return res.json({
            status: true,
            message: "Course Saved Updated ....!",
            data: data
        })
    }).catch(err => {
        console.log(err)
        return res.json({
            status: false,
            message: `Somethings went wrong..!`,
            data: err
        })
    })



}


exports.check_exit_save = async (req, res) => {

    // savedModel.find({ course_id: mongoose.Types.ObjectId(req.body.course_id), user_id: mongoose.Types.ObjectId(req.body.id), status: true }).then(data => {
    //     return res.json({
    //         status: true,
    //         message: "Course Saved Updated ....!",
    //         data: data
    //     })
    // }).catch(err => {
    //     console.log(err)
    //     return res.json({
    //         status: false,
    //         message: `Somethings went wrong..!`,
    //         data: err
    //     })
    // })

    



}
