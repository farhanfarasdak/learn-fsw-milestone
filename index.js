const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const path = require('path')
const md5 = require('md5')
const { printHelloWorld, printHiFarhan } = require('./js/custom')
const { retrieveAllData, searchData, getDatabyId, printUrl, replaceData, deleteData } = require('./js/retrieveData')

const app = express()
const jsonParser = bodyParser.json()

app.use('/js', express.static(__dirname+'/js'))
app.use(printUrl)
// GET POST PUT DELETE

// localhost:3000/
app.get('/', function (req, res) {
  res.send(retrieveAllData('products.json'))
})

app.get('/cc', function (req, res) {
  let data = retrieveAllData('creditCard.json')
  // filter
  for(let i = 0; i<data.length; i++){
    data[i].pin = "******"
  }
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
  let filteredData = searchData(queryName, queryWarna)

  if(filteredData.length != 0){
    res.send(filteredData)
  }else{
    res.status(404).send("DATA NOT FOUND")
  }
})

app.get('/:id', function (req, res) {
  let result = getDatabyId(req.params.id)
  
  if(result != undefined){
    res.send(result)
  }else{
    res.status(404).send("DATA NOT FOUND")
  }
})

app.post('/', jsonParser, (req, res) => {
  let data = retrieveAllData('products.json')
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

app.put('/:id', jsonParser, (req, res) => {
  let data = replaceData(parseInt(req.params.id), req.body)
  fs.writeFileSync('./products.json', JSON.stringify(data))
  res.send(data)
})

app.delete('/:id', (req, res) => {
  let id = parseInt(req.params.id)
  let result = deleteData(id)
  fs.writeFileSync('./products.json', JSON.stringify(result))
  res.send(result)
})

app.listen(3000)

// Challenge 
// 1. Pindahin chapter 3 chapter 4 ke route
// 2. buat users.json
// 3. bikin API login yg ngecek apakah input ada di dalam users.json
// 4. bikin get '/' yg membalikan users.json