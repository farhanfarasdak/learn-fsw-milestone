const express = require('express')
const bodyParser = require('body-parser');
const { User, Biodatas } = require('./models')

const app = express()
const jsonParser = bodyParser.json()

app.use('/css', express.static(__dirname+'/css'))
app.use('/js', express.static(__dirname+'/js'))
app.set('view engine', 'ejs')

// VIEWS

app.get('/example/:id', (req,res) => {
  res.render('example')
})

app.get('/home', (req,res) => {
  res.render('home')
})

app.get('/detail/example', (req,res) => {
  res.render('example')
})

app.get('/detail/:id', async (req, res) => {
  const resp = await fetch(`http://localhost:7070/user-biodata/${req.params.id}`)
  const data = await resp.json()

  res.render('detail', { userDetail: data })
})

// API CREATE
app.post('/register', jsonParser, async (req, res)=> {
  try {
    // INSERT KE DATABASE USER
    const dataUser = await User.create({
      username: req.body.username
    })
    // INSERT KE DATABASE BIODATA
    const biodatas = await Biodatas.create({
      fullname: req.body.fullname,
      address: req.body.address,
      job: req.body.job,
      age: req.body.age,
      UserId: dataUser.id
    })
    res.status(201).send('Done Insert User')
  } catch (error) {
    res.status(403).send('Username Already Exist')
  }
})


// API READ
app.get('/find/:username', async (req,res) => {
  // SELECT * FROM Users WHERE username=req.params.username
  const data = await User.findOne({
    where: {
      username: req.params.username
    }
  })
  if (data != null){
    res.send(data)
  }else{
    res.status(404).send('User not found')
  }
})

app.get('/user-biodata/:id', async (req, res) => {
  const data = await User.findByPk(req.params.id, {
    include: Biodatas
  })

  res.send(data)
})

// API UPDATE
app.put('/biodata/:id', jsonParser, async (req,res) => {
  // SELECT * FROM Biodatas WHERE id = req.param.id
  const data = await Biodatas.findByPk(req.params.id)
  data.fullname = req.body.fullname
  data.address = req.body.address
  data.age = req.body.age
  data.job = req.body.job
  data.save()
  res.status(202).send('Data has been edited')
})

app.listen(7070, () => {
  console.log('APP IS RUNNING')
})