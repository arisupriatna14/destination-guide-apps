'use strict';
module.exports = (sequelize, DataTypes) => {
  var Destination = sequelize.define('Destination', {
    name_destination: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    image: DataTypes.STRING,
    city: DataTypes.STRING,
    harga_guide: DataTypes.INTEGER,
    maps: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Destination.associate = function(models) {
    Destination.belongsToMany(models.User, {
      through: models.DestinationViewHistory
    })
    Destination.hasMany(models.DestinationViewHistory)
    Destination.hasMany(models.Guide)
  };

  Destination.getTotal = function(harga_destinasi, harga_guide, cb) {
    return harga_destinasi + harga_guide;
  }

  return Destination;
};