const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'pmtuv41!49',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res)=> {
    res.send('it is working');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

//the :id is the parameter
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })


app.put('/image', (req, res)=> {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res)=> {image.handleApiCall(req, res)})

// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
//   });

// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
//     // res == false
// });


app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})

//1st:
// root res = this is working

//2nd:
//signin -> POST, respond with success//fail
            //POST because you want to send a secured password in the body

//register -> POST, respond with user

//profile with optional parameter of :userId --> GET, respond with user

//image --> PUT return updated user