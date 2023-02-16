const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const privateKey = `MIICWwIBAAKBgHP1EaGgqEE5LiXH9uIbX3IEhtpSwX8wKC7oPJd44E2/35UoG4PuXJPUXBCGS51/fsignZ1JgQ8Gx2XFNgC6tfkd0lzcqn9czbMKFMwezpbD3iGTGD65RhirSFJfQjoornzNACzRRtlh6bvUIsc3PA7O9CkaTfTDZ0MudIg/5XyjAgMBAAECgYAudZhU29vOFizpMk82lKUPN8UYIGQqo47WDHKKdgHY5PGd/23W1F//Uux4KnaNahHQLJo59MNi0+J8YiGa9TQHS0XFdXN3GiO06CvxEvuhEfGJhQl4BvIPoj77k9WsihJDf6I6VTtQ8l6yz+tvnpncOtjmG++OFklX3aJLLwFvkQJBALz+PWIDrFR83oBiGbOHDN1YE2L9HgSrqQlB/iUUyUT/X1kfyLvP5lnLRqx6XJgLKHBMtjiPrs8I+FVrWtDNPv0CQQCdEc9israWak4TQQG2NOC2oO4WVqC2EJfgH1kEGFbwXrTDtRWbOt8qXMOrrpUl/c4MPbeCb7FbCQDIIPpBowwfAkAbijjLpZlhHmkV8DWqkY1wW7tHe3b6W0FglftA0AycP1JXnGgV5i+8+gAsdhA0H7we0S7kgxuIE9iMKf6r2pzJAkA+OqkslFuMum9WZ4HzG34QPTA2/3lKyMYzUJgm7DG9p/f8Nclqp+d01C3d3hxPYf/5j5YeAnyE8csyfwZHbP7HAkEAlYwYbC+VLTKBBmMyZRADYBSZSqp5gTn3DIT9RX4Bpj5bPmBRVnohZlzbSDSS8UmOGiU0AG1jNhbop8xB5y5SGQ==`;


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
                .json({ username: user.username, message: "Login successful" });
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
                message: 'New User Registered!'
            })
        })

      }
      res.status(400).json({ error: "Passwords not matching" });
    } 
    else {res.status(400).json({ error: "Username or Password Missing" });}
  }
  );


module.exports = router