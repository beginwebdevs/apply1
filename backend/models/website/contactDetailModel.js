const mongoose = require('mongoose');
const {Schema} = mongoose;

const contactDetailSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true,
    }
})

const ConatctDetailes = mongoose.model('ConatctDetailes', contactDetailSchema);
module.exports = ConatctDetailes;