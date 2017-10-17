const UsersRouter = require('express').Router()
// const usersController = require('../controllers').usersController
const User = require('../models').User
const jwt = require('jsonwebtoken')
const SECRET = require('../config').SECRET || 'testCODE'
const createToken = ({email, lastName}) => {
  return jwt.sign({ email, lastName }, SECRET, { expiresIn: '1h' })
}
UsersRouter.route('/signup')
  .post((req, res) => {
    let newUser = new User(req.body)
    newUser.save((err, user) => {
      if (err) {
        res.json(err)
      } else {
        res.json(user)
      }
    })
  })
UsersRouter.route('/login')
  .post((req, res) => {
    let email = req.body.email.toLowerCase()
    let password = req.body.password

    User.findOne({email: email})
      .exec((err, user) => {
        if (err) {
          res.json(err)
        } else if (user) {
          let dbResponse = user.verifyPW(password)
          if (dbResponse.valid) {
            res.json({...dbResponse, token: createToken(user)})
          } else {
            res.json(dbResponse)
          }
        } else {
          res.json({message: 'no user found'})
        }
      })
  })

module.exports = UsersRouter
