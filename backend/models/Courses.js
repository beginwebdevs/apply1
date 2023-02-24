const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    aa_program_id: {
        type: String,
        required: false,
    },
    aa_institute: {
        type: Schema.Types.ObjectId,
        ref: 'Universities'
    },
    is_active: {
        type: Boolean,
        required: true,
        default: 1
    },
    course_level: {
        type: String,
        required: true
    },
    field_of_study: {
        type: String,
        required: true
    },
    area_of_study: {
        type: String,
        required: true
    },
    sub_area_of_study: {
        type: String,
        required: true
    },
    course_type: {
        type: String,
        required: true
    },
    course_name: {
        type: String,
        required: true
    },
    course_duration: {
        type: String,
        required: true
    },
    intakes: {
        type: String,
        required: true
    },
    post_study_work_visa: {
        type: String,
        required: true
    },
    session_starts: {
        type: Date,
        required: false
    },
    program_overview: {
        type: String,
        required: false
    },
    admission_process: {
        type: String,
        required: false
    },
    no_of_units: {
        type: String,
        required: false
    },
    careers: {
        type: String,
        required: false
    },
    assessment: {
        type: String,
        required: false
    },
    progression: {
        type: String,
        required: false
    },
    total_elective_units: {
        type: String,
        required: false
    },
    units: {
        type: String,
        required: false
    },
    scholarships: {
        type: String,
        required: false
    },
    course_ranking: {
        type: String,
        required: false
    },
    course_summary: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    tags: {
        type: String,
        required: false
    },
    application_fees: {
        type: String,
        required: false
    },
    tutation_fees: {
        type: String,
        required: false
    },
    cost_of_livinng: {
        type: String,
        required: false
    },
    qualification: {
        type: String,
        required: false
    },
    deadline: {
        type: String,
        required: false
    },
    min_stipend: {
        type: String,
        required: false
    },
    max_stipend: {
        type: String,
        required: false
    },
    minimum_education: {
        type: String,
        required: false
    },
    min_gpa: {
        type: String,
        required: false
    },
    ielts_requirement: {
        type: String,
        required: false
    },
    toefl_requirement: {
        type: String,
        required: false
    },
    pte_requirement: {
        type: String,
        required: false
    },
    destination: {
       type: String,
       required: false
    }

});

const Courses = mongoose.model('courses', courseSchema);
module.exports = Courses;