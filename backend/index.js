const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();

const app = express()
require('dotenv').config()
const port = process.env.PORT || 9000;

app.use(express.json())
app.use(cors())

// AVAILABLE ROUTES

app.use('/api/universities', require('./routes/universities'))
app.use('/api/courses', require('./routes/courses'))
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))


if(process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"));
}


app.listen()
