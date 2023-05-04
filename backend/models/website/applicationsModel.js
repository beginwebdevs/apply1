const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'courses'
    },
    status: {
        type: String
    },
    personal_info : {
        type: Schema.Types.ObjectId,
        ref: 'PesonalDetailes'
    },
    study_preference:{
        type: Schema.Types.ObjectId,
        ref: 'PreferenceStudy'
    },
    edu_info: [{
        type: Schema.Types.ObjectId,
        ref: 'EducationDetailes'
    }],
    english_test: [{
        type: Schema.Types.ObjectId,
        ref: 'EnglishDetailes'
    }],
    standerd_test: {
        type: Schema.Types.ObjectId,
        ref: 'StanderdTests'
    },
    employement: [{
        type: Schema.Types.ObjectId,
        ref: 'EmployementsDetailes'
    }]
    
}, {
    timestamps: true
})

const Application = mongoose.model('Applications', applicationSchema);
module.exports = Application;