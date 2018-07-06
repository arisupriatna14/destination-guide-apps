'use strict';
module.exports = (sequelize, DataTypes) => {
  var Guide = sequelize.define('Guide', {
    name: DataTypes.STRING,
    kuota: DataTypes.INTEGER,
    schedule: DataTypes.STRING,
    DestinationId: DataTypes.INTEGER
  }, {});
  Guide.associate = function(models) {
    Guide.belongsTo(models.Destination)
  };
  return Guide;
};