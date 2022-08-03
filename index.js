const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()
const jsonParser = bodyParser.json()

// GET POST PUT DELETE

// localhost:3000/
app.get('/', function (req, res) {
  let data = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
  res.send(data)
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


app.listen(3000)