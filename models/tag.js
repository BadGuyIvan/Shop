module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    value: {
      type: DataTypes.STRING
    }
  }, { timestamps: false });
  Tag.associate = function(models) {
    Tag.belongsTo(models.Product);
  };
  return Tag;
};