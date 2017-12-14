const express = require('express'),
User = require('../models/user')

/* apoc require statement must always go after the explicit loading of the 
* .env file */
require('dotenv').load()
var checkAuth = require('./index.js').checkAuth
module.exports = (() => {
'use strict';

const router = express.Router();


/*endpoint to provide partial list of useres based on keyword search*/
/*router.get('/list/:keyword', (req,res) => {
console.log("Listing users who matched the search")
//res.json({message:"User list here!"})
User.find({username: {$regex: req.params.keyword}},{_id:0,displayName:1,username:1,email:1}, function(err, users) {
  if (err) throw err;
  var userMap = {};

  users.forEach(function(user) {
    userMap[user.email] = user;
  });
res.send(JSON.stringify(userMap));

})
}); */


/* User registration API endpoint */
router.post('/register', (req, res) => {
// Confirm passwords match.

/* if (req.body.password !== req.body.passwordConf) {
  const err = new Error('Passwords do not match!')
  err.status = 400
  throw err
}*/

// If user already exists...
/*User.find({email : req.body.email}, function(err, docs)  {
  console.log(err);
  if(docs.length){
    const err = new Error('User already exists!')
    err.status = 400
    res.json({ message: 'User already exists!' })
    
    //res.locals.messages=req.flash()
    //res.render('register',{title: "Register"});
  }
else {

  const newUser = new User({
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
    telephone: req.body.telephone,
    isOfficialVisit: req.body.isOfficialVisit,
    isEscortRequired:req.body.isEscortRequired,
    escortName:req.body.escortName
  })

  console.log(err);
  
  console.log("newUser created");

  // Attempt to create the new user in the database.
  User.create(newUser, (err) => {
    console.log(newUser)
    console.log("newUser created in database")
    console.log(err.name)
    console.log(err.message)
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        if (err.message.search('name') != '-1') {
          res.statusMessage = 'name'
          return res.status(409).send()
        }
        else if (err.message.search('email') != '-1') {
          res.statusMessage = 'email'
          return res.status(409).send()
        }  
      }
      
        throw err
    } 
    res.status(200).send();
    console.log(res.status);
    console.log(newUser);
    console.log("newUser created in database later"); 
  })
}
})*/

console.log("visitors->register->Very Busy");

const newUser = new User({
  name: req.body.name,
  company: req.body.company,
  email: req.body.email,
  telephone: req.body.telephone,
  isOfficialVisit: req.body.isOfficialVisit,
  isEscortRequired: req.body.isEscortRequired,
  escortName: req.body.escortName
})   

console.log("New VISITOR user created");
// Attempt to create the new user in the database.
User.create(newUser, (err) => {
  console.log(newUser)
  //console.log(err.name)
  //console.log(err.message)
  res.status(200).send();          
}) 

})

/*Reset password for a user*/
router.post('/reset', function(req, res){
var password = req.body.password;
var password2 = req.body.password2;

req.checkBody('password', 'Password is required').notEmpty();
req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

var errors = req.validationErrors();

    if(errors){
        res.render('login',{
            errors:errors
        });
    } else {
        res.redirect('/login');
        
    }
});

// update single user
router.put('/update/:id', (req, res, next) => {
console.log("Endpoint: update user");  
User.update(User.findById(req.params.id) , req.body, (err, result) => {        
// if the user is not in the database
if (err) {
console.log("User record doesn't exist!")
res.status(204).send();
}      
// if the user is found
else{

// update the  user in the database is done.
console.log("success");
res.status(200).send();
}
})
})  

/*endpoint of read a single user*/
router.get('/:id',(req,res)=> {
User.find(User.findById(req.params.id),(err,user)=> {
console.log('Endpoint: Read a user')
//console.log(req.params.id);
console.log(user);
if (err) {
console.log("User not fount");
}
else {
res.send(JSON.stringify(user));
console.log('read a user success');
//console.log(user);
//res.status(304).send()
//res.json({message: 'user found'});
}
})
});

/*endpoint of delete a single user*/ 
router.get('/delete/:id', (req, res) => {
User.remove(User.findById(req.params.id), (err,user) => {
console.log('Endpoint: Delete a user')
if(err){
  console.log('Error in delete a user');
  res.status(204).send();
}
else {
  console.log('delete a user success'); 
  res.status(200).send();
}
})
});//End of Endpoint

/* Friend addition API endpoint. */
router.post('/add/friend', (req, res) => {
/* WARNING: Does not check to see if relationship is already established,
* may create duplicate friend relationship. */

const queryString = 
`MATCH (a:User),(b:User) 
WHERE a.username = '${req.body.sUsername}' AND b.username = '${req.body.tUsername}'
CREATE (a)-[r:isFriends {connects:a.username + "<-->" + b.username}]->(b)`

const query = apoc.query(queryString)
query.exec().then((result) => {
res.status(200).send()
}, (fail) => {
res.status(500).send()
})
})

/* Friend list API endpoint */
router.get('/list/friend/:username/:degree', (req, res) => {
/* Returns a list of friends for the username specified in the path. If 
* degree parameter is 2 it returns friends-of-friends etc. for larger 
* values. List returned does not include relationship details. 
*/

const queryString = 
`MATCH (a:User), (b:User)
WHERE a.username="${req.params['username']}" and (a) -[:friend*1..${req.params['degree']}]- (b)
RETURN distinct b.username`
const query = apoc.query(queryString)

query.exec().then((result) => {
const resultArray = []
const dataLength = result[0]['data'].length
for (const i = 0; i < dataLength; i++) {
resultArray.push(result[0]['data'][i]['row'][0])
}

res.json({
'data': resultArray,
'length': dataLength
})
}, (fail) => {
console.log(fail)
})
})

/* Friend graph API endpoint */
router.get('/list/friend/connections/:username/:degree', (req, res) => {
/* Returns a JSON object where each key is a user in the friend graph and 
* each value is a list of users the key user is connected to. */

const queryString = 
`MATCH (u:User {username: '${req.params['username']}'})-[r:friend*1..${req.params['degree']}]-(v:User)
WHERE u <> v
RETURN r`
const query = apoc.query(queryString)

query.exec().then((result) => {
const resultMap = new Map()
for (const i = 0; i < result[0]['data'].length; i++) {
const dataList = result[0]['data'][i]['row'][0]
for (const j = 0; j < dataList.length; j++) {
  const rowNames = dataList[j]['connects'].split('<-->')
  rowNames = rowNames.sort()
  if ( resultMap.has(rowNames[0]) ) {
    if ( !resultMap.get(rowNames[0]).includes(rowNames[1]) ) {
      resultMap.get(rowNames[0]).push(rowNames[1])
    }
  } else {
    resultMap.set(rowNames[0], [rowNames[1]])
  }
}
}
const jsonObj = {}
resultMap.forEach((value, key) => {
jsonObj[key] = value
})
res.json(jsonObj)
}, (fail) => {
console.log(fail) 
})
})


/* Friend Shortest Path API endpoint */
router.get('/list/friend/shortest/:username1/:username2', (req, res) => {
/* Returns a list of friends for the username specified in the path. 
* The list of friends returned is the shortest path between the user
* and the requested user.
*/
const queryString = 
`MATCH (a:User), (b:User), p= shortestPath((a)-[:isFriends*]-(b))
WHERE a.username='${req.params['username1']}' AND b.username='${req.params['username2']}'
RETURN p`
const query = apoc.query(queryString)

query.exec().then((result) => {
const resultArray = []
const dataLength = result[0]['data'][0]['row'][0].length
for (var i = 0; i < dataLength; i++) {
if(JSON.stringify(result[0]['data'][0]['row'][0][i]).search('username') != -1) {
  resultArray.push(result[0]['data'][0]['row'][0][i])
}
}
console.log(resultArray)
res.json({
'data': resultArray,
'length': dataLength
})
}, (fail) => {
console.log(fail)
})
})

return router
})();