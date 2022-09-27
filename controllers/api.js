const { hashSync, compareSync } = require("bcrypt")
const jwt  = require('jsonwebtoken')
const { User, Candidate } = require("../models")

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
        username: data.username,
        role: data.role
      }
    })
  } catch (error) {
    res.status(422).send('Unable to create user')
  }
}

exports.login = async (req, res) => {
  // query user ke db
  const userData = await User.findOne({
    where: {
      username: req.body.username
    }, 
    include: Candidate
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

  const payload = {
    id: userData.id,
    username: userData.username,
    role: userData.role,
    Candidate: userData.Candidate
  }

  const token = jwt.sign(payload, "kpukerenkey", { expiresIn: '1d' });

  res.send({
    message: 'Login Success',
    token: `Bearer ${token}`,
    user: payload
  })
}

exports.createCandidate = async (req, res) => {
  try{
    const data = await Candidate.create({
      name: req.body.name
    })
  
    res.status(201).send({
      message: "Data created",
      data: data
    })
  }catch{
    res.status(422).send({
      message: "Unable to insert candidate"
    })
  }
}

exports.getCandidates = async (req, res) => {
  console.log(req.user)
  let data
  if(req.user.role === 'normal'){
    data = await Candidate.findAll()
  }else{
    data = await Candidate.findAll({
      include: User
    })
  }
  
  res.send(data)
}

exports.vote = async (req, res) => {
  const user = await User.findByPk(req.user.id)
  if(user.CandidateId){
    return res.status(403).send({
      message: 'You already vote, cannot vote twice'
    })
  }else{
    user.CandidateId = req.body.CandidateId
    user.save()

    res.status(202).send({
      message: 'Done voting'
    })
  }
}



