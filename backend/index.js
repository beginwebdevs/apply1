const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
var bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');

connectToMongo();



const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(express.json({limit: '8mb'}))
app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
//app.use(semiauthMiddleware)
app.use('/', express.static('appp'));
app.use('/storage', express.static('storage'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// AVAILABLE ROUTES

app.use('/api/universities', require('./routes/universities'))
app.use('/api/courses', require('./routes/courses'))
app.use('/api/profile', require('./routes/profileController'));
app.use('/api/users', require('./routes/users'))
app.use('/api/fields', require('./routes/fieldofstudy'));
app.use('/api/email', require('./routes/verifyMail'))





// if(process.env.NODE_ENV == "production") {
//   app.use(express.static("frontend/build"));
// }


app.listen(port, () => {
  console.log(`Example app listening on port ${port || process.env.PORT}`)
})