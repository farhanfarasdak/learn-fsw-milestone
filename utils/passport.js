const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport');
const { User } = require('../models');
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "kpukerenkey";


passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    const userData = await User.findOne({
      where: { username: jwt_payload.username }
    })
    if(userData){
      return done(null, {
        id: userData.id,
        username: userData.username,
        role: userData.role,
        CandidateId: userData.CandidateId
      })
    }
    else{
      return done(null, false)
    }
}));