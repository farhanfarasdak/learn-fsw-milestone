const express = require('express')
const bodyParser = require('body-parser')
const { ClassRoom, Student } = require('./models')

const app = express()
const jsonParser = bodyParser.json()

app.use('/css', express.static(__dirname+'/css'))
app.use('/js', express.static(__dirname+'/js'))
app.set('view engine', 'ejs')

// RENDERING VIEW
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/dashboard-classroom', async (req, res) => {
  const classRoom = await fetch('http://localhost:8090/class-room')
  const data = await classRoom.json()
  console.log(data)
  res.render('classroom', { classRooms: data })
})

app.get('/dashboard-classroom/:id', async (req, res) => {
  const students = await fetch(`http://localhost:8090/class-room/${req.params.id}/student`)
  const data = await students.json()

  res.render('students', { data: data })
})


// CREATE
app.post('/class-room', jsonParser, async (req, res) =>{
  // { "name": "10 A" }
  const className = req.body.name
  const data = await ClassRoom.create({
    name: className
  })

  res.status(201).send(data)
})

app.post('/student', jsonParser, async (req, res) => {
  const data = await Student.create({
    name: req.body.name,
    ClassRoomId:req.body.ClassRoomId
  })

  res.status(201).send(data)
})


// READ
app.get('/class-room', async (req, res) => {
  // SELECT * FROM ClassRooms;
  const data = await ClassRoom.findAll()
  res.send(data)
})

app.get('/class-room/:id/student', async (req, res) => {
  // 1 option
  // const data = await Student.findAll({
  //   where: {
  //     ClassRoomId: req.params.id
  //   }
  // })

  // 2 option
  const data = await ClassRoom.findByPk(req.params.id, {
    include: Student
  })
  res.send(data)
})

app.listen(8090, () => {
  console.log("App is running")
})