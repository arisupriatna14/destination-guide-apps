'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {});

  User.beforeCreate((user, Option) => {
    const saltRounds = 10
    let salt = bcrypt.genSaltSync(saltRounds)
    let hash = bcrypt.hashSync(user.password, salt);
    user.salt = salt
    user.password = hash
  })

  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Destination, {
      through: models.DestinationViewHistory
    })
    User.hasMany(models.DestinationViewHistory)
  };
  return User;
};