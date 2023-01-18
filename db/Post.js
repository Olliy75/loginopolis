const {Sequelize, sequelize} = require('./db');

const Post = sequelize.define('post', {
  content: Sequelize.STRING
});

module.exports = { Post };
