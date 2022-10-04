const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({
  origin: 'http://localhost:7000'
}))

app.get('/', (req, res) => {
  res.send({
    message: 'I am called from BE service'
  })
})

app.listen('5000', () => {
  console.log('BE App is running at port 5000')
})