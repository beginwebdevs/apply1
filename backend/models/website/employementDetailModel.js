const mongoose = require('mongoose');
const { Schema } = mongoose;


const employementDetailSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    satart_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    type_of_employment: {
        type: String,
        required: true
    },
    field_of_experience: {
       type: String,
       required: true
    }
})

const EmployementsDetailes = mongoose.model('EmployementsDetailes', employementDetailSchema);
module.exports = EmployementsDetailes;