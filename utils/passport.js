const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport');
const UserModel = require('../models/user');
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "supersecretkey";


passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    const userData = await UserModel.findOne({ username: jwt_payload.username })
    if(userData){
      return done(null, userData)
    }
    else{
      return done(null, false)
    }
}));