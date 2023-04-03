const mongoose = require('mongoose');
const { Schema } = mongoose;

const courselocationSchema = new Schema({
    cricos_provider_code: {
        type: String,
        required: true,
    },
    institution_name: {
        type: String,
        required: true
    },
    cricos_course_code: {
        type: String,
        required: true,
        unique: true
    },
    location_name: {
        type: String,
        required: true
    },
    location_city: {
        type: String,
        required: true
    },
    location_state: {
        type: String,
        required: true
    },

});

const Courseslocation = mongoose.model('courseslocation', courselocationSchema);
module.exports = Courseslocation;