const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tripSchema = new Schema({
    title: {
        type:String
    },
    description: {
        type:String
    },
    rating: {
        type: Number
    }, 
    latitude : {
        type: Number
    },
    longitude: {
        type: Number
    },
    visitDate: {
        type: Date
    },
    photo: {
        type: String
    }
}, {timestamps: true})

const Trip = mongoose.model('Trip', tripSchema)
module.exports = Trip