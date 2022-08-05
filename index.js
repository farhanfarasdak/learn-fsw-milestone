const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const path = require('path')
const md5 = require('md5')
// const { myFunc } = require('./js/custom')

const app = express()
const jsonParser = bodyParser.json()

app.use('/js', express.static(__dirname+'/js'))

// GET POST PUT DELETE

// localhost:3000/
app.get('/', function (req, res) {
  let data = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
  // myFunc()
  res.send(data)
})

app.get('/masuk', function(req, res) {
  res.sendFile(path.join(__dirname + '/masuk.html'))
})

app.get('/sudah-masuk', function(req, res) {
  res.sendFile(path.join(__dirname + '/sudahmasuk.html'))
})

app.get('/search', function (req, res) {
  let queryName = (req.query.name || "").toLowerCase()
  let queryWarna = (req.query.warna || "").toLowerCase()
  let data = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
  let filteredData = []

  // looping and filter
  for(let i = 0; i < data.length; i++){
    if(data[i].name.toLowerCase().includes(queryName) && data[i].warna.toLowerCase().includes(queryWarna)){
      filteredData.push(data[i])
    }
  }

  if(filteredData.length != 0){
    res.send(filteredData)
  }else{
    res.status(404).send("DATA NOT FOUND")
  }
})

app.get('/:id', function (req, res) {
  let result

  let data = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
  // find result
  for(let i = 0; i<data.length; i++){
    if(data[i].id == parseInt(req.params.id)){
      result = data[i]
    }
  }
  
  if(result != undefined){
    res.send(result)
  }else{
    res.status(404).send("DATA NOT FOUND")
  }
})

app.post('/', jsonParser, (req, res) => {
  let data = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
  let newId = data[data.length -1].id + 1
  req.body.id = newId
  data.push(req.body)
  fs.writeFileSync('./products.json', JSON.stringify(data))
  res.status(201).send(data)
})

app.post('/login', jsonParser, (req, res) => {
  const PASSWORD = "9cf452b375e430338103a9c5cff21462"
  if(PASSWORD === md5(req.body.password)){
    res.send("Authorized")
  }else{
    res.status(401).send("Unauthorized")
  }
})

app.listen(3000)

// Challenge 
// 1. Pindahin chapter 3 chapter 4 ke route
// 2. buat users.json
// 3. bikin API login yg ngecek apakah input ada di dalam users.json
// 4. bikin get '/' yg membalikan users.json