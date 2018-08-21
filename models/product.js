'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0}
    },
    dscription: DataTypes.TEXT,
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, { timestamps: false });
  Product.associate = function(models) {
    Product.belongsTo(models.Category);
    Product.hasMany(models.Image);
    Product.hasMany(models.Tag);
    Product.belongsToMany(models.Props, { as: 'Products', through: 'ProductProps', foreignKey: 'productId' });
    Product.belongsToMany(models.Order, {through: 'OrderProducts'});
    Product.belongsToMany(models.Discount,{through: 'DiscProduct'} );
  };
  return Product;
};