const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect('mongodb://localhost:27017/TripStitchDB', {useNewUrlParser:true, useUnifiedTopology: true})
const db = mongoose.connection
const TripRoute = require('./controllers/TripController')

db.on('error', (err)=>{
    console.log(err)
})
db.once('open', ()=>{
    console.log('Database Connection Established!')
})

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api/trip', TripRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
