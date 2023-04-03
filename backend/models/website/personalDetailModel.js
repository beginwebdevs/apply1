const mongoose = require('mongoose');
const {Schema} = mongoose;

const personalDetailSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    dob: {
        type: Date,
        default: ''
    },
    country_of_birth: {
        type: String
    },
    gender: {
        type: String
    },
    nationality: {
        type: String
    },
    dual_citizenship: {
        type: String
    },
    marital_status: {
        type: String
    }
})

const PersonalDetailes = mongoose.model('PesonalDetailes', personalDetailSchema);
module.exports = PersonalDetailes;