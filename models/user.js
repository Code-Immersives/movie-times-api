const mongoose = require('mongoose'),
  Schema = mongoose.Schema

let userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  password: { type: String, required: true, length: 8}
})

let User = mongoose.model('User', userSchema)

module.exports = User
