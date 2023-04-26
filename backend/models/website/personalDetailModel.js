const mongoose = require('mongoose');
const {Schema} = mongoose;

const personalDetailSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    first_name: {
        type: String,
        default: null
    },
    last_name: {
        type: String,
        default: null
    },
    dob: {
        type: Date,
        default: null
    },
    country_of_birth: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        default: null
    },
    nationality: {
        type: String,
        default: null
    },
    dual_citizenship: {
        type: String,
        default: null
    },
    marital_status: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    postal_code: {
        type: String,
        default: null
    }
})

const PersonalDetailes = mongoose.model('PesonalDetailes', personalDetailSchema);
module.exports = PersonalDetailes;