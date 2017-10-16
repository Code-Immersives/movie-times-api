const MoviesRouter = require('express').Router()
const moviesController = require('../controllers').moviesController
MoviesRouter.route('/movies')
  .get(moviesController.getAll)
  .post(moviesController.create)
MoviesRouter.route('/movies/:id')
  .get(moviesController.getSingle)
  .put(moviesController.update)
  .delete(moviesController.destroy)
MoviesRouter.route('/search')
  .get(moviesController.search)

module.exports = MoviesRouter
