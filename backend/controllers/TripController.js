const express = require('express')
const router = express.Router()
const Trip = require('../models/Trip')
const upload = require('../middlewares/upload')
const User = require('../models/User')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const privateKey = '';

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

// login route
// does the user in database exist
router.post("/login", async function (req, res, next) {
    if (req.body.username && req.body.password) {
      const user = await User.findOne()
        .where("username")
        .equals(req.body.username)
        .exec();
      if (user) {
        return bcrypt
          .compare(req.body.password, user.password)
          .then((result) => {
            if (result === true) {
              const token = jwt.sign({ id: user._id }, privateKey, {
                algorithm: "RS256",
              });
              return res
                .status(200)
                .json({ username: user.username, access_token: token });
            } else {
              return res.status(401).json({ error: "Invalid credentials." });
            }
          })
          .catch((error) => {
            return res.status(500).json({ error: error.message });
          });
      }
      return res.status(401).json({ error: "Invalid credentials." });
    } else {
      res.status(400).json({ error: "Username or Password Missing" });
    }
  });

const saltRounds = 10;
// hash and store password
router.use(function (req, res, next) {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      req.hashedPassword = hash;
      next();
    });
  });
});

// register route
// create new user, return id and username
router.post("/register", async function (req, res, next) {
    if (req.body.username && req.body.password && req.body.passwordConfirmation) {
      if (req.body.password === req.body.passwordConfirmation) {
        const user = new User({
          username: req.body.username,
          password: req.hashedPassword,
        });
        return user
          .save()
          .then((savedUser) => {
            const token = jwt.sign({ id: user._id }, privateKey, {
              algorithm: "RS256",
            });
            return res.status(201).json({
              id: savedUser._id,
              username: savedUser.username,
              access_token: token,
            });
          })
          .catch((error) => {
            return res.status(500).json({ error: "Something went wrong." });
          });
      }
      res.status(400).json({ error: "Passwords not matching" });
    } else {
      res.status(400).json({ error: "Username or Password Missing" });
    }
  });

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