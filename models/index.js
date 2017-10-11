const mongoose = require('mongoose'),
  Schema = mongoose.Schema

let movieSchema = new Schema({
  title: { type: String },
  genre: [String],
  rating: String,
  fanRating: Number,
  runtime: Number,
  release_date: Date,
  poster: String,
  cinemas: [{ type: Schema.Types.ObjectId, ref: 'Cinema' }]
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
