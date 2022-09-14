const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://farhan2:Farhan123!@cluster0.7unpxl8.mongodb.net/passport')

const userSchema = mongoose.Schema({
  username: String,
  password: String
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel