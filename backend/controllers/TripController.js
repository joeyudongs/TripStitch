const express = require('express')
const router = express.Router()
const Trip = require('../models/Trip')
const upload = require('../middlewares/upload')

router.get('/', (req, res, next) => {
    Trip.find() 
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
})

router.post('/show', (req, res, next) => {
    let tripID = req.body.tripID
    Trip.findById(tripID) 
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occurred!'
        })
    })
})

router.post('/store', upload.single('photo'), (req, res, next) => {
    let trip = new Trip({
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        visitDate: req.body.visitDate
    })
    if (req.file) {
        trip.photo = req.file.path
    }
    trip.save()
    .then(response => {
        res.json({
            message: 'Trip Added Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occurred!'
        })
    })
})

router.post('/update', (req, res, next) => {
    let tripID = req.body.tripID

    let updateData = {
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        visitDate: req.body.visitDate
    }

    Trip.findByIdAndUpdate(tripID, {$set: updateData})
    .then(() => {
        res.json({
            message: 'Trip updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occurred!'
        })
    })
})

router.post('/delete', (req, res, next) => {
    let tripID = req.body.tripID
    Trip.findByIdAndRemove(tripID)
    .then(() => {
        res.json({
            message: 'Trip delete Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occurred!'
        })
    })
})

module.exports = router