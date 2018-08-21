module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
    }
  }, { timestamps: false });
  Category.associate = function(models) {
    Category.hasMany(models.Product);
    Category.hasMany(models.Props);
  };
  return Category;
};