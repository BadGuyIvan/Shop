module.exports = (sequelize, DataTypes) => {
  var OrderProducts  = sequelize.define('OrderProducts', {
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
  }, { timestamps: false });
  OrderProducts.associate = function(models) {
    OrderProducts.belongsTo(models.Order);
    // Order_Product.hasMany(models.Product, { through: models.Order_Product} )
  };
  return OrderProducts;
};