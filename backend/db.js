const mongoose = require('mongoose');
require('dotenv').config()
const mongoURI = "mongodb+srv://beginwebdevs:12345@applyassist.qxgig2x.mongodb.net/?retryWrites=true&w=majority";


const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=> {
        console.log("Connected to Mongo DB Successfully");
    })
}

module.exports = connectToMongo;
