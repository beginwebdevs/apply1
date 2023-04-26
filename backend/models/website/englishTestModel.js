const mongoose = require('mongoose');
const { Schema } = mongoose;

const englishTestSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    exam_status: {
        type: String,
        default : null
    },
    test_name: {
        type: String,
        default: null
    },
    test_date: {
        type: Date,
        default: null
    },
    speaking: {
        type: String,
        default: null
    },
    listening: {
        type: String,
        default: null
    },
    writing: {
        type: String,
        default: null
    },
    reading: {
        type: String,
        default: null
    },
    over_all: {
        type: String,
        default: null
    },
    need_help: {
        type: Boolean,
        default: false
    }
})


const EnglishDetailes = mongoose.model('EnglishDetailes', englishTestSchema);
module.exports = EnglishDetailes;