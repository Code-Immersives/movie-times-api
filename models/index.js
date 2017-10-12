const mongoose = require('mongoose'),
  Schema = mongoose.Schema

let movieSchema = new Schema({
  title: { type: String, required: true, unique: true},
  genre: [String],
  rating: String,
  fanRating: Number,
  runtime: {
    type: Number,
    min: [60, 'Movie time is too short'],
    max: 240
  },
  release_date: {type: Date, default: Date.now()},
  poster: String,
  cinemas: [{ type: Schema.Types.ObjectId, ref: 'Cinema' }]
})
movieSchema.methods.upcaseRating = function (next) {
  console.log('using upcaseRating', this)
  return this.rating
}
// AnimalSchema.statics.search = function search (name, cb) {
//   return this.where('name', new RegExp(name, 'i')).exec(cb)
// }

movieSchema.statics.search = function (query, cb) {
  console.log(query)
  return this.where('rating', query.rating).exec(cb)
}

movieSchema.pre('save', function (next) {
  console.log('doing something before save', this)
  this.title = this.title.toLowerCase()
  next()
})

let cinemaSchema = new Schema({
  location: {
    address: String,
    city: String,
    state: String,
    zip: Number
  },
  name: String,
  rooms: [{ movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
    showtimes: [Number],
    imax: Boolean,
    roomNumber: Number
  }]
})

let Movie = mongoose.model('Movie', movieSchema)
let Cinema = mongoose.model('Cinema', cinemaSchema)

module.exports = {Movie, Cinema}
