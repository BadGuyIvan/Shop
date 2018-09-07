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
  }, { timestamps: false });
  Props.associate = function(models) {
    Props.belongsToMany(models.Product, {through: 'ProductProps', foreignKey: "PropsId", otherKey: 'ProductId'});
  };
  return Props;
};