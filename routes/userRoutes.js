const UsersRouter = require('express').Router()
// const usersController = require('../controllers').usersController
const User = require('../models').User

// function Person(name, email){
//   this.name = name
//   this.email = email
// }
//
// let Tony = new Person('tony', 'email')

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
        } else {
          let dbResponse = user.verifyPW(password)
          res.json(dbResponse)
        }
      })
  })

module.exports = UsersRouter
