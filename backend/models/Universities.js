const mongoose = require('mongoose');
const { Schema } = mongoose;

const universitiesSchema = new Schema({
    
    university_name: {
        type: String,
        required: true,
    },
    university_address: {
        type: String,
        required: false
    },
    univercity_logo: {
        type: String,
        required: false
    },
    university_location: {
        type: String,
        required: true,
    },
    about_university: {
        type: String,
        required: true
    },
    university_type: {
        type: String,
        required: true
    },
    campus_accommodation: {
        type: String,
        required: false
    },
    intake_months: {
        type: Array,
        required: false
    },
    total_students: {
        type: String,
        required: false
    },
    ielts_requirements: {
        type: String,
        required: false
    },
    toefl_requirements: {
        type: String,
        required: false
    },
    pte_requirements: {
        type: String,
        required: false
    },
    university_website: {
        type: String,
        required: false
    }

});

const Universities = mongoose.model('Universities', universitiesSchema);
module.exports = Universities;