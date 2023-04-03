const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({

    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "courses",
        
    }
});

const Users = mongoose.model('saved_courses', usersSchema);
module.exports = Users;