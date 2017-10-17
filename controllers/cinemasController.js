const db = require('../models')

// const findCinema = (err, cinema) => {
//   console.log(res)
//   if (err) res.json(err)
//   if (!err) res.json(cinemas)
// }

module.exports = {
  getAll: function (req, res) {
    db.Cinema.find({})
      .exec((err, cinemas) => {
        if (err) res.json(err)
        if (!err) res.json(cinemas)
      })
  },
  getSingle: function (req, res) {
    db.Cinema.find({_id: req.params.id})
      .exec((err, cinema) => {
        if (err) res.json(err)
        if (!err) res.json(cinema)
      })
  },
  search: function (req, res) {
    let zip = req.query.zip
    db.Cinema.find({ 'location.zip': { $lte: zip} })
      .exec((err, cinemas) => {
        if (err) res.json(err)
        if (!err) res.json(cinemas)
      })
  }
}
