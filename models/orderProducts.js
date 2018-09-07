module.exports = (sequelize, DataTypes) => {
  var OrderProducts  = sequelize.define('OrderProducts', {
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
  });
  OrderProducts.associate = function(models) {
    OrderProducts.belongsTo(models.Order);
  };
  return OrderProducts;
};