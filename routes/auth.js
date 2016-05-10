var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/main');


//new user register
router.post('/register', function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter a valid email and password to register.' });
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    //Saving user
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, message: 'This user already exists!' });
      }
      res.json({ success: true, message: 'Successfully created new user.' });
    });
  }
});

//Authenticating the User and get a JWT
router.post('/login', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({ success: false, message: 'User not found, Try again!' });
    } else {
      // Check if passwords match!
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Create token for authenticated user
          var token = jwt.sign(user, config.secret, {
            expiresIn: 86400 // 1 day in seconds
          });
          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.send({ success: false, message: 'Authentication failed, passwords dont match'})
        }
      });
    }
  });
});

//Protect dashboard route with JWT
router.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.send('Auth works! User id is: ' + req.user._id + '.');
});


module.exports = router;
