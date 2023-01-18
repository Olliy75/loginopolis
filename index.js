const express = require('express');
const app = express();
const { User } = require('./db');
const { Post } = require('./db');
const bcrypt = require('bcrypt');

const salt_count = 5;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', async (req, res, next) => {
  try {
    res.send('<h1>Welcome to Loginopolis!</h1><p>Log in via POST /login or register via POST /register</p>');
  } catch (error) {
    console.error(error);
    next(error)
  }
});

app.get('/me', async (req, res, next) => {
  const user = await User.findOne({where: {username: req.body.username}});
  const ismatch = await bcrypt.compare(req.body.password,user.password)
  if (ismatch){
    const output = await Post.findAll({where: {userid: user.id}})
    res.send(output)
  }
  else{
    res.send("incorrect username or password")
  }
});

// POST /register
// TODO - takes req.body of {username, password} and creates a new user with the hashed password
app.post('/register', async (req, res, next) => {
  const hashed = await bcrypt.hash(req.body.password,salt_count)
  const user = await User.create({username: req.body.username, password: hashed})
  res.send(`successfully created user ${req.body.username}`)
})
// POST /login
// TODO - takes req.body of {username, password}, finds user by username, and compares the password with the hashed version from the DB
app.post('/login', async (req,res,next)=>{  
  const user = await User.findOne({where: {username: req.body.username}});
  const ismatch = await bcrypt.compare(req.body.password,user.password)
  if (ismatch){
    res.send(`successfully logged in user ${req.body.username}`)
  }
  else{
    res.send("incorrect username or password")
  }
})
// we export the app, not listening in here, so that we can run tests
module.exports = app;
