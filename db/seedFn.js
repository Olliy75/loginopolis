const {sequelize} = require('./db');
const {User} = require('./');
const {Post} = require('./');
const users = require('./seedData');
const bcrypt = require('bcrypt');

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  for (let i = 0; i < users.length; i++){
    users[i].password = await bcrypt.hash(users[i].password,5)
  }
  let userArray = await User.bulkCreate(users);

  let post = await Post.create(
    {
      content: "abcdefg"
    }
  )
  await userArray[0].addPost(post)
  post = await Post.create(
    {
      content: "hijklm"
    }
  )
  await userArray[0].addPost(post)
  post = await Post.create(
    {
      content: "nopgrs"
    }
  )
  await userArray[1].addPost(post)
  post = await Post.create(
    {
      content: "tuvwxyz"
    }
  )
  await userArray[2].addPost(post)


};

module.exports = seed;
