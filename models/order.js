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
    }
  }, {
    hook: {
      afterCreate: (mainModel, next) => {
        console.log(this.associations.OrderProducts.target.create());
      }
    }
  });
  Order.associate = function(models) {
    Order.belongsToMany(models.Product, {through: 'OrderProducts'});
  };
  return Order;
};