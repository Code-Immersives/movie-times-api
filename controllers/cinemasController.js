const db = require('../models')

module.exports = {
  getAll: function (req, res) {
    db.Cinema.find({})
      .exec((err, cinemas) => {
        if (err) res.json(err)
        if (!err) res.json(cinemas)
      })
  }
}
