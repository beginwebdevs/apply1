const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({

    mobile_number: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: ''
    },
    profile_status: {
        type: Number,
        required: false,
        default: 0
    },
    personal_detail: {
        type: Schema.Types.ObjectId,
        ref: 'PesonalDetailes'
    },
    education_detail: [{
        type: Schema.Types.ObjectId,
        ref: 'EducationDetailes'
    }],
    admission_test: {
        type: Schema.Types.ObjectId,
        ref: 'AddmissionTests'
    },
    study_preference: {
        type: Schema.Types.ObjectId,
        ref: 'PreferenceStudy'
    },
    english_test: [
        {
            type: Schema.Types.ObjectId,
            ref: 'EnglishDetailes'
        }
    ],
    stage: {
        type: String,
        default: 'User Created'
    },
    priority: {
        type: String,
        default: 'Hot'
    },
    notes: {
        type: String,
        default: ''
    }
});

const Users = mongoose.model('Users', usersSchema);
module.exports = Users;