'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: {
  		type: DataTypes.INTEGER,
  		defaultValue: 0,
  		validate: { min: 0 }
  	},
  	discount_price: {
  		type: DataTypes.INTEGER,
  		defaultValue: 0,
  		validate: { min: 0 }
  	},
    description: DataTypes.TEXT,
    available: {
  		type: DataTypes.BOOLEAN,
  		defaultValue: false,
  	}
  });
  Product.associate = function(models) {
    Product.belongsTo(models.Category);
    Product.hasMany(models.Image);
    Product.hasMany(models.Tag);
    Product.belongsToMany(models.Props, {through: 'ProductProps', foreignKey: "ProductId", otherKey: 'PropsId'});
    Product.belongsToMany(models.Order, {through: 'OrderProducts'});
    Product.belongsToMany(models.Discount,{through: 'DiscProduct'} );
  };
  return Product;
};