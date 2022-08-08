const fs = require('fs')

const retrieveAllData = (source) => {
  return JSON.parse(fs.readFileSync(source, 'utf-8'))
}

const searchData = (name, warna) => {
  let data = retrieveAllData('products.json')
  let filteredData = []

  // looping and filter
  for(let i = 0; i < data.length; i++){
    if(data[i].name.toLowerCase().includes(name) && data[i].warna.toLowerCase().includes(warna)){
      filteredData.push(data[i])
    }
  }
  return filteredData
}

const getDatabyId = (id) => {
  let data = retrieveAllData('products.json')
  // find result
  let result
  for(let i = 0; i<data.length; i++){
    if(data[i].id == parseInt(id)){
      result = data[i]
    }
  }

  return result
}

const printUrl = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`)
  next()
}

const replaceData = (id, body) => {
  let data = retrieveAllData('products.json')
  for(let i = 0; i < data.length; i++){
    if(data[i].id === id){
      data[i].name = body.name,
      data[i].harga = body.harga,
      data[i].warna = body.warna
    }
  }

  return data
}

const deleteData = (id) => {
  let result = []
  let data = retrieveAllData('products.json')
  for(let i = 0; i < data.length; i++){
    if(data[i].id != id){
      result.push(data[i])
    }
  }
  return result
}

module.exports = {
  retrieveAllData,
  searchData,
  getDatabyId,
  printUrl,
  replaceData,
  deleteData
}