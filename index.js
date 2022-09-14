const express = require('express')
const pageRouter = require('./routes/page')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('./utils/passport')

const app = express()
const port = 9090

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

// setup express session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://farhan2:Farhan123!@cluster0.7unpxl8.mongodb.net/passport',
    collectionName: 'sessions'
  }),
  saveUninitialized: true,
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24
  }
}))

// setup passport
app.use(passport.initialize())
app.use(passport.session())

app.use(pageRouter)


app.listen(port, () => {
  console.log(`App is running at port ${port}`)
})