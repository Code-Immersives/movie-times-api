const CinemasRouter = require('express').Router()
const cinemasController = require('../controllers').cinemasController

CinemasRouter.route('/cinemas')
  .get(cinemasController.getAll)
CinemasRouter.route('/cinemas/search')
  .get(cinemasController.search)
CinemasRouter.route('/cinemas/:id')
  .get(cinemasController.getSingle)

module.exports = CinemasRouter
