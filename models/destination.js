'use strict';
module.exports = (sequelize, DataTypes) => {
  var Destination = sequelize.define('Destination', {
    name_destination: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    image: DataTypes.STRING,
    city: DataTypes.STRING
  }, {});
  Destination.associate = function(models) {
    // associations can be defined here
  };
  return Destination;
};