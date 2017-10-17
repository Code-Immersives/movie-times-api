const mongoose = require('mongoose'),
  Schema = mongoose.Schema

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

let Cinema = mongoose.model('Cinema', cinemaSchema)

module.exports = Cinema
