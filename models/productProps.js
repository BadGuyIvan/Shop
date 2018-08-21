'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProductProps = sequelize.define('ProductProps', {
    value: {
        type: DataTypes.STRING,
    }
  }, { timestamps: false });
  ProductProps.associate = function(models) {
  };
  return ProductProps;
};