// create a user controller class that has 2 static methods
const User = require('../models').User
const jwt = require('jsonwebtoken')
const SECRET = require('../config').SECRET || 'testCODE'
const createToken = ({email, lastName}) => {
  conosle.log(email)
  return jwt.sign({ email, lastName }, SECRET, { expiresIn: '1h' })
}
class UsersController {
  static signUp (req, res) {
    let newUser = new User(req.body)
    newUser.save((err, user) => {
      if (err) {
        res.json(err)
      } else {
        res.json(user)
      }
    })
  }
  static logIn (req, res) {
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
  }
}

module.exports = UsersController
