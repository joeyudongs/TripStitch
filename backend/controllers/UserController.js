const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

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
              return res
                .status(200)
                .json({ username: user.username, userid: user._id});
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
          .save().then(() => {
            res.json({
                userid: user._id,
            })
        })

      }
      res.status(400).json({ error: "Passwords not matching" });
    } 
    else {res.status(400).json({ error: "Username or Password Missing" });}
  }
  );


module.exports = router