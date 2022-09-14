const { compareSync } = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy
const UserModel = require('../models/user.js')

passport.use(new LocalStrategy(
  function(username, password, done) {

    UserModel.findOne({ username: username }, function (err, user) {

      // if error
      if (err) { return done(err); }

      // if user not found
      if (!user) { return done(null, false); }

      // if wrong password
      if ( !compareSync(password, user.password) ) { return done(null, false); }

      // if all good
      return done(null, user);
    });
  }
));

passport.serializeUser( (user, cb) => {
  process.nextTick( () => {
    return cb(null, {
      id: user.id
    })
  })
})

passport.deserializeUser( (user, cb) => {
  process.nextTick( async () => {
    const userData = await UserModel.findById(user.id)
    return cb(null, userData)
  })
})

