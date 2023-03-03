const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseLevelSchema = new Schema ({
    title: {
        type: String,
        required: true
    }
})

const CourseLevels = mongoose.model('CourseLevels', courseLevelSchema);
module.exports = CourseLevels;