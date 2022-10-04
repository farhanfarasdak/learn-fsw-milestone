const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use('/js', express.static(__dirname + '/js'))

app.get('/', (req, res) => {
  res.render('home')
})

app.listen('7000', () => {
  console.log('FE App is running at port 7000')
})