const mongoose = require('mongoose');
const { Schema } = mongoose;

const englishTestSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    exam_status: {
        type: String
    },
    test_name: {
        type: String
    },
    test_date: {
        type: Date
    },
    speaking: {
        type: String
    },
    listening: {
        type: String
    },
    writing: {
        type: String
    },
    reading: {
        type: String
    },
    over_all: {
        type: String
    }
})


const EnglishDetailes = mongoose.model('EnglishDetailes', englishTestSchema);
module.exports = EnglishDetailes;