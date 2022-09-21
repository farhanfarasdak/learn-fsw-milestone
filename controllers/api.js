const { hashSync, compareSync } = require("bcrypt")
const jwt  = require('jsonwebtoken')
const { User, Server } = require("../models")

exports.protected = (req, res) => {
  console.log(req.user)

  res.send({
    message: 'ok'
  })
}

exports.register = async (req, res) => {
  try {
    const data = await User.create({
      username: req.body.username,
      password: hashSync(req.body.password, 10),
      role: req.body.role
    })
  
    res.status(201).send({
      message: 'User created successfully',
      user: {
        id: data.id,
        username: data.username,
        role: data.role
      }
    })
  } catch (error) {
    res.status(422).send({
      message: 'Failed to create user'
    })
  }
}

exports.login = async (req, res) => {
  // query user ke db
  const userData = await User.findOne({
    where: {
      username: req.body.username,
    },
    include: Server
  })

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
  let serverData = null
  console.log(userData)
  if(userData.ServerId !== null){
    serverData = userData.Server
  }

  const payload = {
    id: userData.id,
    username: userData.username,
    role: userData.role,
    serverData: serverData,
  }

  const token = jwt.sign(payload, "supersecretkey", { expiresIn: '1d' });

  res.send({
    message: 'Login Success',
    token: `Bearer ${token}`,
    user: payload
  })
}

exports.createServer = async (req,res) => {
  try {
    const data = await Server.create({
      name: req.body.name
    })

    res.status(201).send(data)
  } catch (error) {
    res.status(422).send({
      message: 'Failed to create server'
    })
  }
}

exports.getServer = async (req, res) => {
  const data = await Server.findAll()
  res.send(data)
}

exports.chooseServer = async (req, res) => {
  const user = await User.findByPk(req.user.id)
  if(user.ServerId !== null){
    return res.status(403).send('User has already picked his server')
  }
  user.ServerId = req.body.ServerId
  user.save()
  res.status(202).send('User has picked his server')
}