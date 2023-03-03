const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationsSchema = new Schema({
    cricos_provider_code: {
        type : Schema.Types.ObjectId,
        required: true
    },
    institution_name: {
        type: String,
        required: false
    },
    location_name: {
        type: String,
        required: false
    },
    location_type: {
        type: String,
        required: false
    },
    address_line_1 : {
        type: String,
        required: false
    },
    address_line_2: {
        type: String,
        required: false
    },
    address_line_3: {
        type: String,
        required: false
    },
    address_line_4: {
        type: String,
        required: false
    },
    city: {
        type: String,
        require: false
    },
    state: {
        type: String,
        required: false
    },
    postcode: {
        type: String,
        required: false
    }

})

const Locations = mongoose.model('Locations', locationsSchema);
module.exports = Locations;