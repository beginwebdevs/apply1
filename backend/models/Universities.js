const mongoose = require('mongoose');
const { Schema } = mongoose;

const universitiesSchema = new Schema({
    
    aa_institute_id: {
        type: String,
        required: false
    },
    cricos_provider_code:{
        type: String,
        required: false
    },
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
        required: false,
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
    },
    cricos_provider_code: {
        type: String,
        required: false
    },
    is_institution_source_destination_both: {
        type: String,
        required: true
    },
    sector: {  
        type: String,
        required: false
    },
    cep_section: {
        type: String,
        required: false
    },
    is_institution_recognized: {
        type: Boolean,
        required: false
    },
    contact1: {
        type: String,
        required: true
    },
    contact2: {
      type: String,
      required: true
    },
    banners: {
        type: String,
        required: true
    },
    qsworld_university_bankings: {
        type: String,
        required: true
    },
    times_higher_education_world_university_rankings: {
        type: String,
        required: true
    },
    qsasian_university_rankings: {
        type: String,
        required: true
    },
    academic_rankingof_world_universities: {
        type: String,
        required: true
    },
    amenities: {
        type: String,
        required: true
    },
    on_site_accommodation: {
        type: String,
        required: true
    },
    departments: {
        type: String,
        required: false
    },
    scholarships: {
        type: String,
        required: false
    },
    video_link: {
        type: String,
        required: true
    },
    year_established: {
        type: String,
        required: true
    },
    fee_range:{
       type: String,
       required: false
    },
    course_duration_range: {
        type: String,
        required: false
    },
    application_fees: {
        type: String,
        required: true
    },
    delivery_mode: {
        type: String,
        required: true
    },
    articulation: {
        type: String,
        required: true
    },
    session_starts:{
        type: String,
        required: true
    },
    admission_process: {
        type: String,
        required: true
    }

});

const Universities = mongoose.model('Universities', universitiesSchema);
module.exports = Universities;