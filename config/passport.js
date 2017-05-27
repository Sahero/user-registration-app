const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');
//const FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function (passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

    User.getUserById(jwt_payload._doc._id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      }
      else {
        return done(null, false);
      }
    });
  }));

 /* passport.use(new FacebookStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callbackURL
  },
    function (accessToken, refreshToken, profile, cb) {
      
      // asynchronous
      process.nextTick(function () {

        // find the user in the database based on their facebook id
        User.findOne({ 'id': profile.id }, function (err, user) {

          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
            return cb(err);

          // if the user is found, then log them in
          if (user) {
            return cb(null, user); // user found, return that user
          } else {
            // if there is no user found with that facebook id, create them
            var newUser = new User();

            // set all of the facebook information in our user model
            //newUser._id = profile.id; // set the users facebook id                   
            //newUser.token = token; // we will save the token that facebook provides to the user                    
            newUser.firstName = profile.name.firstName; // look at the passport user profile to see how names are returned
            newUser.lastName = profile.name.familyName;
            newUser.gender = profile.gender;
            newUser.username = profile.username;
            newUser.email = profile.email.value; // facebook can return multiple emails so we'll take the first
            newUser.birthdate = profile.birthdate;
            newUser.address = profile.address;
            newUser.admin = false;
            console.log(newUser);
            //newUser.profile = profile;
            // save our user to the database
            newUser.save(function (err) {
              if (err)
                throw err;

              // if successful, return the new user
              return cb(null, newUser);
            });
          }

        });
      });

    }));

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });*/

}

