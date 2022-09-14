const { hashSync } = require("bcrypt")
const passport = require("passport")
const UserModel = require("../models/user")


exports.login = (req, res) => {
  res.render('login')
}

// exports.submitLogin = (req, res) => {
//   const staticUsername = 'admin'
//   const staticPassword = 'admin123'

//   if(staticUsername === req.body.username && staticPassword === req.body.password){
//     res.redirect('/protected')
//   }else{
//     res.redirect('/login')
//   }
// }

exports.logout = (req, res) => {
  req.logout( () => {
    res.redirect('/login')
  })
}

exports.submitLogin = passport.authenticate('local', {
  successRedirect: '/protected',
  failureRedirect: '/login'
})

exports.protected = (req, res) => {
  if(req.isAuthenticated()){
    res.render('protected', { username: req.user.username })
  }else{
    res.redirect('/login')
  }
  console.log(req.session)
  console.log(req.user)
}

exports.register = (req, res) => {
  res.render('register')
}

exports.submitRegister = async (req, res) => {
  const data = await UserModel.create({
    username: req.body.username,
    password: hashSync(req.body.password, 10)
  })
  res.render('protected', { user: data })
}

