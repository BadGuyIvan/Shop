'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProductProps = sequelize.define('ProductProps', {
    value: {
        type: DataTypes.STRING,
    }
  }, { timestamps: false });
  ProductProps.associate = function(models) {
    // ProductProps.belongsTo(models.Props);
    // ProductProps.belongsTo(models.Product);
  };
  return ProductProps;
};