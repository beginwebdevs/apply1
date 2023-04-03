const mongoose = require('mongoose');
const {Schema} = mongoose;

const preferenceStydySchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    education_country: [{
        type: String
    }],
    field_of_study: {
        type: String,
    },
    level_of_study: {
        type: String,
    },
    start_year: {
        type: String,
    }
})

const PreferenceStudy = mongoose.model('PreferenceStudy', preferenceStydySchema);
module.exports = PreferenceStudy;