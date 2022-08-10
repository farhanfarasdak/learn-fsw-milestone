const express = require('express')
const path = require('path')
const app = express()

app.use('/css', express.static(__dirname+'/css'))
app.use('/js', express.static(__dirname+'/js'))
app.use('/assets', express.static(__dirname+'/assets'))

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
  // res.sendFile(path.join(__dirname + '/views/home.html'))
  products = [
    {
      nama: "Baju",
      harga: 3000
    },
    {
      nama: "Jersey",
      harga: 10000
    },
    {
      nama: "Sarung",
      harga: 3000
    },
    {
      nama: "Celana",
      harga: 10000
    }
  ]
  res.render("home", { nama: "Farhan", productsData: products })
})

app.get('/slider', (req, res)=>{
  // res.sendFile(path.join(__dirname + '/views/slider.html'))
  res.render("slider", { css: "css/slider.css", js: "js/slider.js" })
})

app.get('/parallax', (req, res)=>{
  // res.sendFile(path.join(__dirname + '/views/parallax.html'))
  res.render("parallax", { css: "css/parallax.css" })
})

app.listen(5000, () =>{
  console.log("Application is running at localhost:5000")
})