const mongoose = require('mongoose');
const {Schema} = mongoose;

const tokenSchema = ({
    token:{

        type: String,
        require: true
    },
    user_id: {

        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
})

const Tokens = mongoose.model('Tokens', tokenSchema);
module.exports = Tokens;