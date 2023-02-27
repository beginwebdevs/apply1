const mongoose = require('mongoose');
const { Schema } = mongoose;

const areaOfStudySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    child: [
        {
            type: String,
            required: false
        }
    ]
})

const AreaOfStudies = mongoose.model('AreaOfStudies', areaOfStudySchema);
module.exports = AreaOfStudies;