const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://farhan-baru:Farhan123!@cluster0.7unpxl8.mongodb.net/passport-jwt')

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  job: String,
  role: String
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel