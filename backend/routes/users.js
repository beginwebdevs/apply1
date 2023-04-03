const express = require('express');
const router = express.Router()
const Users_controller = require('../controller/users.Controller');
const course_controller = require('../controller/course.controller');
const authMiddleware = require('../middlewares/auth-middleware')
const Users = require('../models/website/users.Model');
const PersonalDetailes = require('../models/website/personalDetailModel');




router.get('/allusers', async (req, res) => {
    let usersdata = await Users.find().populate('personal_detail');
    res.json(usersdata);
})



router.post('/adduser', async (req, res) => {
    let useradd = await Users.create({
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_phone: req.body.user_phone,
        user_password: req.body.user_password,
        is_active: req.body.is_active,
    });
    success = true;
    message = "User added";
    res.json({ success, message, useradd });

})


// ---------sendOtp----------------------------//
router.post("/sendOtp", Users_controller.sendOtp)

// ---------verifyOtp----------------------------//
router.post("/verifyOtp", Users_controller.verifyOtp)

// ---------saved_course----------------------------//
router.post("/saved_course", authMiddleware, course_controller.saved_course)

// ---------list_saved_course----------------------------//
router.post("/list_saved_course", authMiddleware, course_controller.list_saved_course)

// ---------delete_saved_course----------------------------//
router.get("/delete_saved_course/:id", authMiddleware, course_controller.delete_saved_course)

// ------------check_exit_save----------------------//
router.post("/check_exit_save", authMiddleware, course_controller.check_exit_save)
router.get('/refresh', Users_controller.refresh)



module.exports = router