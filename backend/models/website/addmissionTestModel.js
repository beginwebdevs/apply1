const mongoose = require('mongoose');
const {Schema} = mongoose;

const addmissionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    test_name: {
        type: String,
    }
});

const AddmissionTests = mongoose.model('AddmissionTests', addmissionSchema);
module.exports = AddmissionTests;