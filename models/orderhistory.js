'use strict';
module.exports = (sequelize, DataTypes) => {
  var OrderHistory = sequelize.define('OrderHistory', {
    UserId: DataTypes.INTEGER,
    DestinationId: DataTypes.INTEGER,
    tanggal: DataTypes.DATE
  }, {});
  OrderHistory.associate = function(models) {
    // associations can be defined here
  };
  return OrderHistory;
};