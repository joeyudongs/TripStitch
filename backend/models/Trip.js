const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tripSchema = new Schema({
    title: {
        type:String
    },
    description: {
        type:String
    },
    comments: {
        type: String
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
    }
}, {timestamps: true})

const Trip = mongoose.model('Trip', tripSchema)
module.exports = Trip