// create a user controller class that has 2 static methods
const User = require('../models').User
const Auth = require('../utils/authentication')

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
            res.json({...dbResponse, token: Auth.createToken(user)})
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
