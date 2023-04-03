const mongoose = require('mongoose');
const {Schema} = mongoose;

const standerdTestSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    test_name: {
        type: String,
        required: true
    },
    certificate: {
        type: String
    }
})

const StanderdTests = mongoose.model('StanderdTests', standerdTestSchema);
module.exports = StanderdTests;