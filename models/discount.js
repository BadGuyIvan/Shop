module.exports = (sequelize, DataTypes) => {
  var Discount = sequelize.define('Discount', {
    name: {
      type: DataTypes.STRING,
    },
    dateFrom: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    dateTo: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
  	discPercent: DataTypes.FLOAT,
  	promocode: DataTypes.STRING
  }, { timestamps: false });
  Discount.associate = function(models) {
    Discount.belongsToMany(models.Product,{through: 'DiscProduct'} );
  };
  return Discount;
};