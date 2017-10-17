const MoviesRouter = require('express').Router()
const moviesController = require('../controllers').moviesController
const jwt = require('jsonwebtoken')
const SECRET = require('../config').SECRET || 'testCODE'

const authenticate = (req, res, next) => {
  // 1 - let's check everywhere for the user's token
  let token = req.body.token || req.param('token') || req.headers['x-access-token']
  if (token) {
    // 2 -  decode the token with the servers secret
    jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
        res.status(403).send({success: false, message: err.message})
      } else {
        req.decoded = decodedToken
        next()
      }
    })
  } else {
		// 3 - If we can't find a token at all, we'll just send back an error message
    res.status(403).send({success: false, message: 'no token provided'})
  }
}

MoviesRouter.route('/movies')
  .get(authenticate, moviesController.getAll)
  .post(moviesController.create)
MoviesRouter.use(authenticate)
MoviesRouter.route('/movies/:id')
  .get(moviesController.getSingle)
  .put(moviesController.update)
  .delete(moviesController.destroy)
MoviesRouter.route('/search')
  .get(moviesController.search)

module.exports = MoviesRouter
