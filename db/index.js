const {User} = require('./User');
const {Post} = require('./Post');
const {sequelize, Sequelize} = require('./db');

User.hasMany(Post)
Post.belongsTo(User)

module.exports = {
    Post,
    User,
    sequelize,
    Sequelize
};
