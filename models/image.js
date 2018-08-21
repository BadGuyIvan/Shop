module.exports = (sequelize, DataTypes) => {
  var Image = sequelize.define('Image', {
    url: {
      type: DataTypes.STRING,
    },
    is_main: {
      type: DataTypes.BOOLEAN,
    }
  }, { timestamps: false });
  Image.associate = function(models) {
    Image.belongsTo(models.Product);
  };
  return Image;
};