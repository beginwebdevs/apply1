const mongoose = require('mongoose');


const {Schema} = mongoose;

const adminSchema =new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    permission: {
        type: String
    }
})



const Admins = mongoose.model('Admins', adminSchema);
module.exports = Admins;

