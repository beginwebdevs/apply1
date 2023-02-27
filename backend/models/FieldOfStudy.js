const mongoose = require('mongoose');
const { Schema } = mongoose;

const fieldOfStudySchema = new Schema({
    title: {
        type: String,
        reqyired: true
    },
    child: [
        {
            type: String,
            required: false
        }
    ]
});

const FieldOfStudies = mongoose.model('FieldOfStudies', fieldOfStudySchema);
module.exports = FieldOfStudies;