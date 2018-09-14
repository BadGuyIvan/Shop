module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    total: {
      type: DataTypes.FLOAT
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    contact: {
      type: DataTypes.STRING
    },
    trackCode: {
     type: DataTypes.STRING,
     defaultValue: 'No trackcode'
   },
   isDelivered: {
     type: DataTypes.BOOLEAN,
     defaultValue: false
   }
  });
  Order.associate = function(models) {
    Order.belongsToMany(models.Product, {through: 'OrderProducts'});
  };
  return Order;
};