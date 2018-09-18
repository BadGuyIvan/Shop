module.exports = (sequelize, DataTypes) => {
  var Props = sequelize.define('Props', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
     },
    name: {
      type: DataTypes.STRING
    }
  });
  Props.associate = function(models) {
    Props.belongsToMany(models.Product, {through: models.ProductProps, foreignKey: "PropsId", otherKey: 'ProductId'});
  };
  return Props;
};