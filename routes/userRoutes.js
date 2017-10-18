const UsersRouter = require('express').Router()
const UsersController = require('../controllers').UsersController
UsersRouter.route('/signup')
  .post(UsersController.signUp)
UsersRouter.route('/login')
  .post(UsersController.logIn)

module.exports = UsersRouter
