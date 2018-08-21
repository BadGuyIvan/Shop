module.exports = (sequelize, DataTypes) => {
  var Props = sequelize.define('Props', {
    name: {
      type: DataTypes.STRING
    }
  }, { timestamps: false });
  Props.associate = function(models) {
    Props.belongsToMany(models.Product, { as: 'Props', through: 'ProductProps', foreignKey: 'PropsId' });
  };
  return Props;
};