const mongoose = require('mongoose');
const {Schema} = mongoose;

const preferenceStydySchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    education_country: [{
        type: String,
        default: null

    }],
    field_of_study: {
        type: String,
        default: null
    },
    level_of_study: {
        type: String,
        default: null
    },
    start_year: {
        type: String,
        default: null
    }
})

const PreferenceStudy = mongoose.model('PreferenceStudy', preferenceStydySchema);
module.exports = PreferenceStudy;