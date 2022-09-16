const express = require('express')
const passport = require('passport')
require('./utils/passport')
const apiRouter = require('./routes/api')

const app = express()
const port = 8989

app.use(passport.initialize())

app.use(apiRouter)

app.listen(port, () => {
  console.log(`App is running at port ${port}`)
})