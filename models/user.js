const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt')

let userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true},
  firstName: String,
  lastName: String,
  password: { type: String, required: true, minlength: 8 },
  homeCinema: { type: Schema.Types.ObjectId, ref: 'Cinema' },
  favMovies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }] // associations/relationships
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

userSchema.statics.addFavMovie = function (movieId, email, cb) {
  this.findOneAndUpdate({email: email}, {$push: movieId}, {new: true})
    .exec(cb)
}
userSchema.statics.addOrUpdateCinema = function (cinemaId, email, cb) {
  this.findOneAndUpdate({email: email}, {cinema: cinemaId}, {new: true})
    .exec(cb)
}
let User = mongoose.model('User', userSchema)

module.exports = User

// add to the userSchema
// home cinema that points to one cinema doc
// an array of favorite movies that points to the movieSchema

// two document level methods that add movies to favorites array
    // and another that adds or creates a home cinema
