const express = require('express')
const app = express()

const swaggerJSON = require('./swagger.json')
const swaggerUI = require('swagger-ui-express')

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON))


app.listen('9000', () => {
  console.log('APP IS RUNNING AT 9000')
})