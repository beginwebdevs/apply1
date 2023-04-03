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
    },
    degree_name: {
        type: String,
    },
    name_of_institution: {
        type: String
    },
    attended_from: {
        type: Date
    },
    course_status: {
        type: String
    },
    attended_till: {
        type: Date
    },
    primary_language_of_instruction: {
        type: String
    },
    score_type: {
        type: String
    },
    marks: {
        type: String
    },
    certificate: {
        type: String
    },
    country_of_institution: {
        type: String
    }
})

const EducationDetailes = mongoose.model('EducationDetailes', educationDetailSchema);
module.exports = EducationDetailes;