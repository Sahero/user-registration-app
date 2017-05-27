const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

//Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    birthdate: req.body.birthdate,
    address: req.body.address,
    admin: false
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to register user ' + err });
    }
    else {
      res.json({ success: true, msg: 'User registered' });
    }
  });
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 //in secs 1 week
        });
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.firstName + " " + user.lastName,
            username: user.username,
            email: user.email
          }

        });
      }
      else {
        return res.json({ sucess: false, msg: "Wrong username or password " });
      }
    });
  });
});

//Authenticate
router.post('/socialAuthenticate', (req, res, next) => {

  const id = req.body.id;
  const name = req.body.name;
  const provider = req.body.provider;
  const email = req.body.email;
  const image = req.body.image;
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const gender = req.body.gender;
  
  // var user = {
  //   id: d.uid,
  //   name: d.name, 
  //   username: d.provider,
  //   email: d.email,
  //   image: d.image
  // }

  User.getUserByUsername(id, (err, user) => {
    if (err) throw err;
    if (!user) {
      let newUser = new User({
        firstName: firstName,
        middleName: '',
        lastName: lastName,
        gender: gender,
        username: id,
        email: email,
        password: id,
        birthdate: '',
        address: '',
        image: image,
        provider: provider,
        admin: false
      });

      User.addUser(newUser, (err, user) => {
        /*if (err) {
          res.json({ success: false, msg: 'Failed to register user ' + err });
        }
        else {
          res.json({ success: true, msg: 'User registered' });
        }*/
      });
      //return res.json({ success: false, msg: "User not found" });
    }
    else
    {
       const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 //in secs 1 week
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.firstName + " " + user.lastName,
            username: user.username,
            email: user.email
          }

        });
    }
  });
});

//Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  //res.json(req.user);
  //res.json(req.query.name);
  User.findOne({ username: req.query.username }, function (err, user) {
    if (err) {
      res.json(err);
    } else {
      res.json(user);
    }
  });

});

//Home
router.get('/', (req, res, next) => {
  User.find({}, function (err, users) {
    if (err) {
      res.json(err);
    } else {
      res.json(users);
    }
  });

});

router.get('/getcount', passport.authenticate('jwt', { session: false }), (req, res, next) => {

  User.find()
    .count()
    .exec(function (err, users) {
      if (err) {
        res.json(err);
      } else {
        res.json(users);
      }
    });

});

router.get('/getbypagenum', passport.authenticate('jwt', { session: false })
  , (req, res, next) => {

    let pagenum = parseInt(req.headers.pagenum);
    let perPage = parseInt(req.headers.itemsperpage);
    //const perPage = 5;
    let start = (pagenum) * perPage;
    let end = start + perPage;

    User.find()
      .sort({ _id: -1 })
      .skip(start)
      .limit(end - start)
      .exec(function (err, users) {
        if (err) {
          res.json(err);
        } else {
          res.json(users);
        }
      });

  });

module.exports = router;
