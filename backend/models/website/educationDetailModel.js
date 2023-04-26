const mongoose = require('mongoose');
const {Schema} = mongoose;

const educationDetailSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    level_of_education: {
        type: String,
        default: null
    },
    degree_name: {
        type: String,
        default: null
    },
    name_of_institution: {
        type: String,
        default: null
    },
    attended_from: {
        type: String,
        default: null
    },
    course_status: {
        type: String,
        default: null
    },
    attended_till: {
        type: String,
        default: null
    },
    primary_language_of_instruction: {
        type: String,
        default: null
    },
    score_type: {
        type: String
    },
    marks: {
        type: String,
        default: null
    },
    certificate: {
        type: String,
        default: null
    },
    country_of_institution: {
        type: String,
        default: null
    }
})

const EducationDetailes = mongoose.model('EducationDetailes', educationDetailSchema);
module.exports = EducationDetailes;