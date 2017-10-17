const db = require('../models')

module.exports = {
  search: function (req, res) {
    let query = req.query // {rating: 'PG13'}
    db.Movie.search(query, (err, movies) => {
      if (err) res.json(err)
      if (!err) res.json(movies)
    })
  },
  getAll: function (req, res) {
    console.log('decoded token info', req.decoded)
    db.Movie.search('title=starwars')
    db.Movie.find({})
      .populate('cinemas')
      .exec((err, movies) => {
        movies[0].upcaseRating()
        if (err) res.json({message: err, status: 204})
        res.json(movies)
      })
  },
  getSingle: function (req, res) {
    db.Movie.find({_id: req.params.id }, (err, movie) => {
      if (err) res.json({message: err, status: 204})
      // movie.upcaseRating
      if (!err) res.json(movie)
    })
  },
  create: function (req, res) {
    let newMovie = new db.Movie(req.body)
    console.log('creating a movie', newMovie)
    newMovie.save((err, movie) => {
      if (err) res.json({message: err, status: 302})
      res.json(movie)
    })
  },
  update: function (req, res) {
    db.Movie.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, movie) => {
      if (err) res.json({message: err, status: 304})
      res.json(movie)
    })
  },
  destroy: function (req, res) {
    db.Movie.findOneAndRemove({_id: req.params.id}, (err) => {
      if (err) res.json({message: err, status: 304})
      res.json({message: `Movie with ${req.params.id} deleted`, status: 200})
    })
  }
}
