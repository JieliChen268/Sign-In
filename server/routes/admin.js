const express = require('express'),
User = require('../models/user'),
AdminUser = require('../models/adminUser'),
bcrypt = require('bcryptjs')

/* apoc require statement must always go after the explicit loading of the 
* .env file */
require('dotenv').load()


module.exports = (() => {
'use strict'
var checkAuth = require('./index.js').checkAuth
const router = express.Router()

router.post('/register',(req,res) => {
  console.log("inside admin registration");
  console.log(req.body.username)
  console.log(req.body.password)
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err) {
      res.status(499).send()
    }
    else {
      
      const newAdmin = new AdminUser({
        
        username: req.body.username,
        password: req.body.password
      })

      AdminUser.create(newAdmin, (err) => {
        if(err)
        throw err;
      
      })
      res.redirect("/admin")
    }
  })
})

/* All Users listing endpoint. */
router.get('/list/allusers', (req,res) => {
    User.find({}, function(err,users) {
      if (err) throw err
      else {
        const userMap = {}
          users.forEach(function(user) {
            userMap[user._id] = user
          })
        res.send(JSON.stringify(userMap))         
      }
    }) 
  })

  /* User listing by pageination */


router.get('/list/users/:id', (req,res) => {
    User.find({}, function(err,users) {
      if (err) throw err
      else {
        const userMap = {}
        console.log("backend pagination method called")
        var last_user = req.params.id*10;
       // res.send(JSON.stringify(users[0]._id));
          for(var i=last_user-10;i<last_user;i++) {
            //var key= users[i]._id
            userMap[i] = users[i];
          }
        res.send(JSON.stringify(userMap))         
      }
    })
  })



  return router
})()