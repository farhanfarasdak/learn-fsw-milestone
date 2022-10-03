const express = require('express')
const app = express()
const swaggerUI = require('swagger-ui-express')
const swaggerJSON = require('./cp8.json')

app.get('/', (req, res) => {
  res.send('Hellow guys')
})

// GET USER /user
app.get('/user', (req, res) => {
  res.send({
    id: 10,
    name: 'John',
    job: "Engineer"
  })
})
// POST USER /user
// PUT USER /user/:id

// Swagger docs
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerJSON))

app.listen('3030', () => {
  console.log('App is running')
})