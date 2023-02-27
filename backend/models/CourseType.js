const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseTypeSchema = new Schema ({
    title: {
        type: String,
        required: true
    }
})

const CourseTypes = mongoose.model('CourseTypes', courseTypeSchema);
module.exports = CourseTypes;