const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt')

let userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true},
  firstName: String,
  lastName: String,
  password: { type: String, required: true, minlength: 8 }
})

userSchema.pre('save', function (next) {
  let currentUser = this
  let hashedPW = bcrypt.hashSync(currentUser.password, 8)
  currentUser.password = hashedPW
  next()
})

userSchema.methods.verifyPW = function (textPW) {
  let currentUser = this
  let isValid = bcrypt.compareSync(textPW, currentUser.password)
  return isValid ? {valid: true, message: 'successfully logged in'} : {valid: false, message: 'incorrect credentials please try again'}
}

let User = mongoose.model('User', userSchema)

module.exports = User
