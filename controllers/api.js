const { hashSync, compareSync } = require("bcrypt")
const jwt  = require('jsonwebtoken')
const UserModel = require("../models/user")

exports.protected = (req, res) => {
  console.log(req.user)

  res.send({
    message: 'ok'
  })
}

exports.register = async (req, res) => {
  const data = await UserModel.create({
    username: req.body.username,
    password: hashSync(req.body.password, 10),
    job: req.body.job,
    role: req.body.role
  })

  res.status(201).send({
    message: 'User created successfully',
    user: {
      username: data.username,
      job: data.job,
      role: data.role
    }
  })
}

exports.login = async (req, res) => {
  // query user ke db
  const userData = await UserModel.findOne({ username: req.body.username })

  // kalau usernya ga exist, kasih response user not found
  if (!userData){
    return res.status(404).send({
      message: 'User not found'
    })
  }
  
  // kalau passwordnya salah
  // if( hashSync(req.body.password) !== userData.password ){
  if( !compareSync(req.body.password, userData.password) ){
    return res.status(401).send({
      message: 'Incorrect Password'
    })
  }

  const payload = {
    username: userData.username,
    job: userData.job,
    role: userData.role
  }

  const token = jwt.sign(payload, "supersecretkey", { expiresIn: '1d' });

  res.send({
    message: 'Login Success',
    token: `Bearer ${token}`
  })
}

