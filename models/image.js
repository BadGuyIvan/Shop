module.exports = (sequelize, DataTypes) => {
  var Image = sequelize.define('Image', {
  	url: {
  		type: DataTypes.STRING,
      defaultValue: 'https://www.standardfurniture.com/getmetafile/84493774-e46f-4675-8e74-33a9672e6d2e/product-default.aspx'
  	},
  	is_main: {
  		type: DataTypes.BOOLEAN,
  		defaultValue: true
  	}
  }, { timestamps: false });
  Image.associate = function(models) {
    Image.belongsTo(models.Product);
  };
  return Image;
};